import React, { useEffect, useState } from "react";

function Status() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      const res = await fetch("/api/v1/status");
      const data = await res.json();
      setStatus(data);
      setLoading(false);
    }
    fetchStatus();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (status.error) {
    return <p>Error: {status.error}</p>;
  }

  return (
    <div>
      <h2>Status da Base de Dados</h2>
      <p>Atualizado em: {status.updated_at}</p>
      <h3>Dependências</h3>
      <p>Versão do Banco de Dados: {status.dependencies.database.version}</p>
      <p>Máximo de Conexões: {status.dependencies.database.max_connections}</p>
      <p>Conexões Abertas: {status.dependencies.database.opened_connections}</p>
    </div>
  );
}

export default Status;
