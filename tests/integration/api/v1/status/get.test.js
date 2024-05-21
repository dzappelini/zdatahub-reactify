test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  console.log(typeof responseBody.dependencies.database.opened_connections);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
