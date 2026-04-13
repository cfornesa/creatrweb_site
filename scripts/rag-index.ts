import "dotenv/config";
import fs from "fs";
import path from "path";
import { Mistral } from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  console.error("MISTRAL_API_KEY is not set.");
  process.exit(1);
}

const client = new Mistral({ apiKey });

interface DocumentChunk {
  file_path: string;
  content: string;
  embedding: number[];
}

/**
 * Splits text into chunks of a given size with some overlap.
 */
function chunkText(text: string, size = 1000, overlap = 200): string[] {
  const chunks: string[] = [];
  if (text.length <= size) {
    return [text];
  }
  
  let i = 0;
  while (i < text.length) {
    // Try to break at a newline or space if possible
    let end = i + size;
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(" ", end);
      const lastNewline = text.lastIndexOf("\n", end);
      const breakPoint = Math.max(lastSpace, lastNewline);
      if (breakPoint > i + size / 2) {
        end = breakPoint;
      }
    }
    
    chunks.push(text.slice(i, end).trim());
    i = end - overlap;
    
    // Safety break
    if (i >= text.length - overlap && i < text.length) {
        chunks.push(text.slice(i).trim());
        break;
    }
    if (i >= text.length) break;
  }
  
  return chunks.filter(c => c.length > 0);
}

async function indexDocuments() {
  const docsDir = path.join(process.cwd(), "documents");
  if (!fs.existsSync(docsDir)) {
    console.error("Documents directory not found at:", docsDir);
    return;
  }

  const files = fs.readdirSync(docsDir).filter(f => f.endsWith(".md") || f.endsWith(".txt"));
  const allChunks: DocumentChunk[] = [];

  console.log(`Found ${files.length} files to index.`);

  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkText(content);

    console.log(`Processing ${file} (${chunks.length} chunks)...`);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      try {
        // Simple rate limiting/batching could be added if needed, but for small sets this is fine
        const resp = await client.embeddings.create({
          model: "mistral-embed",
          inputs: [chunk],
        });

        const embedding = resp.data[0].embedding;

        allChunks.push({
          file_path: `${file}#chunk${i}`,
          content: chunk,
          embedding: embedding,
        });

        console.log(`Indexed chunk ${i + 1}/${chunks.length} for ${file}`);
      } catch (err) {
        console.error(`Error indexing chunk ${i} of ${file}:`, err);
      }
    }
  }

  const outputPath = path.join(process.cwd(), "embeddings.json");
  fs.writeFileSync(outputPath, JSON.stringify(allChunks, null, 2));
  console.log(`\nSuccessfully saved ${allChunks.length} chunks to ${outputPath}`);
}

indexDocuments().catch(error => {
  console.error("Indexing failed:", error);
  process.exit(1);
});
