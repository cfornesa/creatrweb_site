import "dotenv/config";
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Mistral } from "@mistralai/mistralai";
const execFileAsync = promisify(execFile);
const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
    console.error("MISTRAL_API_KEY is not set.");
    process.exit(1);
}
const client = new Mistral({ apiKey });
const supportedExtensions = new Set([".md", ".txt", ".html", ".pdf"]);
function normalizeText(text) {
    return text
        .replace(/\f/g, "\n\n")
        .replace(/\r\n/g, "\n")
        .replace(/\u0000/g, "")
        .replace(/[\t ]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}
function decodeHtmlEntities(text) {
    return text
        .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
        .replace(/&#x([\da-fA-F]+);/g, (_, value) => String.fromCodePoint(parseInt(value, 16)))
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}
function extractHtmlText(html) {
    const withBreaks = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<!--([\s\S]*?)-->/g, " ")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div|section|article|header|footer|aside|main|li|ul|ol|table|tr|td|th|h[1-6])>/gi, "\n")
        .replace(/<(p|div|section|article|header|footer|aside|main|li|ul|ol|table|tr|td|th|h[1-6])\b[^>]*>/gi, "\n");
    const withoutTags = withBreaks.replace(/<[^>]+>/g, " ");
    return normalizeText(decodeHtmlEntities(withoutTags));
}
async function extractPdfText(filePath) {
    try {
        const { stdout } = await execFileAsync("pdftotext", ["-layout", "-nopgbrk", "-enc", "UTF-8", filePath, "-"]);
        return normalizeText(stdout);
    }
    catch (error) {
        const cause = error;
        if (cause.code === "ENOENT") {
            throw new Error("PDF extraction requires `pdftotext` from Poppler. Install it with `brew install poppler` and try again.");
        }
        throw new Error(cause.stderr?.trim() || `Failed to parse PDF: ${filePath}`);
    }
}
async function extractText(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    if (extension === ".pdf") {
        return extractPdfText(filePath);
    }
    const content = await fs.promises.readFile(filePath, "utf-8");
    if (extension === ".html") {
        return extractHtmlText(content);
    }
    return normalizeText(content);
}
/**
 * Splits text into chunks of a given size with some overlap.
 */
function chunkText(text, size = 1000, overlap = 200) {
    const chunks = [];
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
        if (i >= text.length)
            break;
    }
    return chunks.filter(c => c.length > 0);
}
async function indexDocuments() {
    const docsDir = path.join(process.cwd(), "documents");
    if (!fs.existsSync(docsDir)) {
        console.error("Documents directory not found at:", docsDir);
        return;
    }
    const entries = fs.readdirSync(docsDir, { withFileTypes: true });
    const files = entries
        .filter(entry => entry.isFile())
        .map(entry => entry.name)
        .filter(file => supportedExtensions.has(path.extname(file).toLowerCase()));
    const ignoredFiles = entries
        .filter(entry => entry.isFile())
        .map(entry => entry.name)
        .filter(file => !supportedExtensions.has(path.extname(file).toLowerCase()));
    const allChunks = [];
    console.log(`Found ${files.length} files to index.`);
    if (ignoredFiles.length > 0) {
        console.log(`Ignoring ${ignoredFiles.length} unsupported files: ${ignoredFiles.join(", ")}`);
    }
    for (const file of files) {
        const filePath = path.join(docsDir, file);
        const content = await extractText(filePath);
        if (!content) {
            console.warn(`Skipping ${file} because no text content was extracted.`);
            continue;
        }
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
                const embedding = resp.data[0]?.embedding;
                if (!embedding) {
                    throw new Error(`No embedding returned for ${file} chunk ${i}`);
                }
                allChunks.push({
                    file_path: `${file}#chunk${i}`,
                    content: chunk,
                    embedding: embedding,
                });
                console.log(`Indexed chunk ${i + 1}/${chunks.length} for ${file}`);
            }
            catch (err) {
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
