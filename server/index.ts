import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createCommercialQuoteHandler } from "./commercialQuote";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "25kb" }));

  app.post("/api/commercial-quote", createCommercialQuoteHandler());

  app.use("/api", (_req, res) => {
    res.status(404).json({ message: "API route not found." });
  });

  // Serve static files from dist/public in production.
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing for Wouter. Unknown non-API routes fall back to index.html.
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.info(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(error => {
  console.error("Failed to start server", error);
  process.exit(1);
});
