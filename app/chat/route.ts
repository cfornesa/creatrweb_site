import { NextRequest, NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";
import { db } from "@/lib/db";
import { document_embeddings } from "@/lib/schema";

const apiKey = process.env.MISTRAL_API_KEY;
const agentId = process.env.AGENT_ID;

if (!apiKey || !agentId) {
  throw new Error("MISTRAL_API_KEY and AGENT_ID must be set.");
}

const client = new Mistral({ apiKey });

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!apiKey || !agentId) {
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    // 1. Embed the query message
    const embeddingResponse = await client.embeddings.create({
      model: "mistral-embed",
      inputs: [message],
    });
    const queryVector = embeddingResponse.data[0].embedding;

    if (!queryVector) {
      return NextResponse.json({ error: "Failed to generate embedding" }, { status: 500 });
    }

    // 2. Fetch all document embeddings
    const allDocs = await db.select().from(document_embeddings);

    // 3. Compute cosine similarity and sort by top scores
    const scoredDocs = allDocs.map((doc) => {
      const docVector = JSON.parse(doc.embedding) as number[];
      return {
        ...doc,
        score: cosineSimilarity(queryVector, docVector),
      };
    }).sort((a, b) => b.score - a.score);

    // 4. Get top 3 rows as context
    const contextDocs = scoredDocs.slice(0, 3);
    const context = contextDocs.map(d => d.content).join("\n\n");

    const chatResponse = await client.agents.complete({
      agentId: agentId as string,
      messages: [
        { role: "system", content: `You are a terminal-based AI for Creatrweb. Use the following context if relevant: ${context}` },
        { role: "user", content: message }
      ],
    });

    const reply = chatResponse.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to connect to Mistral AI" }, { status: 500 });
  }
}
