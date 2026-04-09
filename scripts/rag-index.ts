import "dotenv/config";
import fs from "fs";
import path from "path";
import { Mistral } from "@mistralai/mistralai";
import { db } from "../lib/db";
import { document_embeddings } from "../lib/schema";

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  console.error("MISTRAL_API_KEY is not set.");
  process.exit(1);
}

const client = new Mistral({ apiKey });

async function indexDocuments() {
  const docsDir = path.join(process.cwd(), "documents");
  if (!fs.existsSync(docsDir)) {
    console.log("Documents directory not found.");
    return;
  }

  const files = fs.readdirSync(docsDir).filter(f => f.endsWith(".md") || f.endsWith(".txt"));

  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    console.log(`Embedding ${file}...`);

    try {
      const resp = await client.embeddings.create({
        model: "mistral-embed",
        inputs: [content],
      });

      const embedding = resp.data[0].embedding;

      await db.insert(document_embeddings).values({
        file_path: file,
        content: content,
        embedding: JSON.stringify(embedding),
      });

      console.log(`Indexed ${file}`);
    } catch (err) {
      console.error(`Error indexing ${file}:`, err);
    }
  }
}

indexDocuments().then(() => console.log("Done."));
