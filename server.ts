import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { chatHandler } from "./src/routes/chat";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const HOST = process.env.HOST ?? "127.0.0.1";

app.use(express.json());

const pageRoutes: Record<string, string> = {
  "/": "index",
  "/projects": "projects",
  "/readme": "readme",
  "/creatrweb": "creatrweb",
  "/augment-humankind": "augment-humankind",
  "/fornesus-art": "fornesus-art",
  "/open-creatrweb": "open-creatrweb",
  "/chris-fornesa": "chris-fornesa",
  "/indieweb-platform": "indieweb-platform",
  "/creatrweb-rag": "creatrweb-rag",
  "/terminal-ui": "terminal-ui",
};

Object.entries(pageRoutes).forEach(([route, file]) => {
  app.get(route, (_req, res) => {
    res.sendFile(path.join(__dirname, "public", `${file}.html`));
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", chatHandler);

app.listen(PORT, HOST, () => {
  console.log(`[server] Listening on http://${HOST}:${PORT}`);
});