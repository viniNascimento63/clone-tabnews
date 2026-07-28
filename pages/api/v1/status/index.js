import database from "/infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbInfo = await database.query(
    "SELECT setting FROM pg_settings WHERE name = 'server_version';",
  );
  const dbVersion = dbInfo.rows[0]["setting"];

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      databse: {
        max_connections: null,
        opened_connections: null,
        version: dbVersion,
      },
    },
  });
}

export default status;
