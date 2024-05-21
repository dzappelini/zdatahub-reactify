const migrationRunner = require("node-pg-migrate").default;
import { join } from "node:path";
import { Client } from "pg"; // Importar o Client corretamente

export default async function migrations(request, response) {
  const databaseUrl = process.env.DATABASE_URL;
  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();

    if (request.method === "GET") {
      const migrations = await migrationRunner({
        dbClient: client, // Passar o cliente conectado
        dryRun: true,
        dir: join("infra", "migrations"), // Usar caminho absoluto
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations",
      });
      return response.status(200).json(migrations);
    }

    if (request.method === "POST") {
      const migrations = await migrationRunner({
        dbClient: client, // Passar o cliente conectado
        dryRun: false,
        dir: join("infra", "migrations"), // Usar caminho absoluto
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations",
      });
      return response.status(200).json(migrations);
    }

    return response.status(405).end();
  } catch (error) {
    console.error("Erro ao executar migrações:", error);
    response.status(500).json({ error: "Erro ao executar migrações" });
  } finally {
    await client.end(); // Certifique-se de fechar a conexão
  }
}
