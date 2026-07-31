test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const dbInfo = responseBody.dependencies.database;
  expect(dbInfo.max_connections).toBeDefined();
  expect(dbInfo.opened_connections).toBeDefined();
  expect(dbInfo.version).toBeDefined();
});
