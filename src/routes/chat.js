import { Mistral } from "@mistralai/mistralai";
import fs from "fs";
import path from "path";
let cachedEmbeddings = null;
function loadEmbeddings() {
    if (cachedEmbeddings)
        return cachedEmbeddings;
    const filePath = path.join(process.cwd(), "embeddings.json");
    if (!fs.existsSync(filePath)) {
        console.warn("[Chat] embeddings.json not found. RAG context will be empty. Run 'npm run rag:index' to generate it.");
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        cachedEmbeddings = JSON.parse(data);
        return cachedEmbeddings || [];
    }
    catch (err) {
        console.error("[Chat] Error reading embeddings.json:", err);
        return [];
    }
}
function cosineSimilarity(a, b) {
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
    if (!apiKey || !agentId) {
        return null;
    }
    return {
        agentId,
        client: new Mistral({ apiKey }),
    };
}
function extractReplyContent(content) {
    if (typeof content === "string") {
        return content.trim();
    }
    if (!Array.isArray(content)) {
        return "";
    }
    return content
        .map((chunk) => {
        if (chunk &&
            typeof chunk === "object" &&
            "type" in chunk &&
            chunk.type === "text" &&
            "text" in chunk &&
            typeof chunk.text === "string") {
            return chunk.text;
        }
        return "";
    })
        .join("")
        .trim();
}
function extractErrorMessage(error) {
    if (error && typeof error === "object") {
        if ("body" in error && typeof error.body === "string") {
            try {
                const parsed = JSON.parse(error.body);
                const msg = (parsed.message ?? parsed.detail);
                if (typeof msg === "string" && msg.trim()) {
                    return msg;
                }
            }
            catch {
                if (error.body.trim())
                    return error.body.trim();
            }
        }
        if ("message" in error &&
            typeof error.message === "string" &&
            error.message.trim()) {
            return error.message;
        }
    }
    return "An unexpected error occurred while connecting to the AI service.";
}
export const chatHandler = async (req, res) => {
    try {
        const { message } = req.body;
        const chatConfig = getChatConfig();
        if (!chatConfig) {
            console.error("[Chat] Configuration missing: MISTRAL_API_KEY or AGENT_ID");
            res
                .status(500)
                .json({ error: "Server configuration error. Please check environment variables." });
            return;
        }
        try {
            const embeddingResponse = await chatConfig.client.embeddings.create({
                model: "mistral-embed",
                inputs: [message ?? ""],
            });
            const queryVector = embeddingResponse.data[0]?.embedding;
            if (!queryVector) {
                throw new Error("Failed to generate embedding: No data returned from Mistral.");
            }
            const allDocs = loadEmbeddings();
            const scoredDocs = allDocs
                .map((doc) => {
                return {
                    ...doc,
                    score: cosineSimilarity(queryVector, doc.embedding),
                };
            })
                .sort((a, b) => b.score - a.score);
            const context = scoredDocs
                .slice(0, 5) // Increased to 5 chunks for better context since we have smaller chunks now
                .map((doc) => `[Source: ${doc.file_path}]\n${doc.content}`)
                .join("\n\n---\n\n");
            const chatResponse = await chatConfig.client.agents.complete({
                agentId: chatConfig.agentId,
                messages: [
                    {
                        role: "system",
                        content: `You are a terminal-based AI for Creatrweb. Use the following context if relevant to answer the user's question. If the context is not relevant, rely on your general knowledge but maintain the persona.\n\nCONTEXT:\n${context}`,
                    },
                    { role: "user", content: message ?? "" },
                ],
            });
            const reply = extractReplyContent(chatResponse.choices?.[0]?.message?.content) ||
                "I'm sorry, I couldn't process that.";
            res.status(200).json({ reply });
        }
        catch (innerError) {
            throw innerError;
        }
    }
    catch (error) {
        console.error("Chat API error details:", error);
        const message = extractErrorMessage(error);
        res.status(500).json({ error: message });
    }
};
