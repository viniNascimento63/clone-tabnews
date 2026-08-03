test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const dbVersion = responseBody.dependencies.database.version;
  expect(dbVersion).toBeDefined();
  expect(dbVersion).toBe("18.4");

  const dbMaxConnections = responseBody.dependencies.database.max_connections;
  expect(dbMaxConnections).toBeDefined();
  expect(dbMaxConnections).toBe(100);

  const dbOpenedConnections =
    responseBody.dependencies.database.opened_connections;
  expect(dbOpenedConnections).toBeDefined();
  expect(dbOpenedConnections).toBe(1);
});
