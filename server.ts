import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { chatHandler } from "./src/routes/chat";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const HOST = process.env.HOST ?? "0.0.0.0";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pageRoutes: Record<string, string> = {
  "/": "index",
  "/projects": "projects",
  "/readme": "readme",
  "/indieweb-platform": "indieweb-platform",
  "/creatrweb-rag": "creatrweb-rag",
  "/terminal-ui": "terminal-ui",
};

Object.entries(pageRoutes).forEach(([route, file]) => {
  app.get(route, (_req, res) => {
    res.sendFile(path.join(__dirname, "public", `${file}.html`));
  });
});

app.post("/chat", chatHandler);

app.listen(PORT, HOST, () => {
  console.log(`[server] Listening on http://${HOST}:${PORT}`);
});
