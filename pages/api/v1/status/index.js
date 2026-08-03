import database from "/infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbInfo = await database.query(
    "SELECT setting FROM pg_settings WHERE name = 'server_version' UNION ALL SELECT setting AS max_connections FROM pg_settings WHERE name = 'max_connections' UNION ALL SELECT count(*)::text as opened_connections FROM pg_stat_activity WHERE datname = 'local_db';",
  );
  const dbVersion = dbInfo.rows[0]["setting"];
  const dbMaxConnections = parseInt(dbInfo.rows[1]["setting"]);
  const dbOpenedConnections = parseInt(dbInfo.rows[2]["setting"]);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: dbMaxConnections,
        opened_connections: dbOpenedConnections,
        version: dbVersion,
      },
    },
  });
}

export default status;
