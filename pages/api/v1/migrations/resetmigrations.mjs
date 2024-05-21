// resetmigrations.mjs
// adicionar type module no package se quiser usar
import pkg from "pg";
import dotenv from "dotenv";

const { Client } = pkg;

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config({ path: ".env.development" });

async function resetMigrations() {
  const databaseUrl = process.env.DATABASE_URL;
  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();

    // Deleta a tabela de migrações, se existir
    await client.query("DROP TABLE IF EXISTS pgmigrations;");

    console.log("Tabela pgmigrations deletada com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar a tabela pgmigrations:", error);
  } finally {
    await client.end();
  }
}

resetMigrations();
