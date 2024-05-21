// const migrationRunner = require("node-pg-migrate").default;
import { join } from "node:path";
import { Client } from "pg";
import migrationRunner from "node-pg-migrate";

export default async function migrations(request, response) {
  const databaseUrl = process.env.DATABASE_URL;
  const client = new Client({ connectionString: databaseUrl });

  const defaultMigrationOptions = {
    dbClient: client, // Passar o cliente conectado
    dryRun: true,
    dir: join("infra", "migrations"), // Usar caminho absoluto
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  try {
    await client.connect();

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }

    return response.status(405).end();
  } catch (error) {
    console.error("Erro ao executar migrações:", error);
    response.status(500).json({ error: "Erro ao executar migrações" });
  } finally {
    await client.end(); // Certifique-se de fechar a conexão
  }
}
