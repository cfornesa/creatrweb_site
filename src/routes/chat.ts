import type { RequestHandler } from "express";
import { Mistral } from "@mistralai/mistralai";
import { createDb } from "@/lib/db";
import { document_embeddings } from "@/lib/schema";

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i += 1) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function getChatConfig() {
  const apiKey = process.env.MISTRAL_API_KEY;
  const agentId = process.env.AGENT_ID;
  const databaseUrl = process.env.SQLITE_DATABASE_URL;

  if (!apiKey || !agentId || !databaseUrl) {
    return null;
  }

  return {
    agentId,
    client: new Mistral({ apiKey }),
    databaseUrl,
  };
}

function extractReplyContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((chunk) => {
      if (
        chunk &&
        typeof chunk === "object" &&
        "type" in chunk &&
        chunk.type === "text" &&
        "text" in chunk &&
        typeof chunk.text === "string"
      ) {
        return chunk.text;
      }

      return "";
    })
    .join("")
    .trim();
}

function extractErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    if ("body" in error && typeof error.body === "string") {
      try {
        const parsed = JSON.parse(error.body) as { message?: unknown };

        if (typeof parsed.message === "string" && parsed.message.trim()) {
          return parsed.message;
        }
      } catch {
        // Ignore malformed JSON and fall through to other error shapes.
      }
    }

    if (
      "message" in error &&
      typeof error.message === "string" &&
      error.message.trim()
    ) {
      return error.message;
    }
  }

  return "Failed to connect to Mistral AI";
}

export const chatHandler: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body as { message?: string };
    const chatConfig = getChatConfig();

    if (!chatConfig) {
      res
        .status(500)
        .json({ error: "Configuration error" });
      return;
    }

    const { db, sqlite } = createDb(chatConfig.databaseUrl);

    try {
      const embeddingResponse = await chatConfig.client.embeddings.create({
        model: "mistral-embed",
        inputs: [message ?? ""],
      });

      const queryVector = embeddingResponse.data[0]?.embedding;

      if (!queryVector) {
        res
          .status(500)
          .json({ error: "Failed to generate embedding" });
        return;
      }

      const allDocs = await db.select().from(document_embeddings);
      const scoredDocs = allDocs
        .map((doc) => {
          const docVector = JSON.parse(doc.embedding) as number[];
          return {
            ...doc,
            score: cosineSimilarity(queryVector, docVector),
          };
        })
        .sort((a, b) => b.score - a.score);

      const context = scoredDocs
        .slice(0, 3)
        .map((doc) => doc.content)
        .join("\n\n");

      const chatResponse = await chatConfig.client.agents.complete({
        agentId: chatConfig.agentId,
        messages: [
          {
            role: "system",
            content: `You are a terminal-based AI for Creatrweb. Use the following context if relevant: ${context}`,
          },
          { role: "user", content: message ?? "" },
        ],
      });

      const reply =
        extractReplyContent(chatResponse.choices?.[0]?.message?.content) ||
        "I'm sorry, I couldn't process that.";

      res.status(200).json({ reply });
    } finally {
      sqlite.close();
    }
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: extractErrorMessage(error) });
  }
};
