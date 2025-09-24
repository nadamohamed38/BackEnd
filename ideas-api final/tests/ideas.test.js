// tests/ideas.test.js
const request = require("supertest");
const app = require("../server");
const db = require("../init-db");

describe("Ideas API", () => {
  let token;

  beforeAll(async () => {
    // Try registering test user (ignore duplicate error)
    await request(app).post("/register").send({
      username: "testuser",
      password: "testpassword",
    });

    // Login to get token
    const loginRes = await request(app).post("/login").send({
      username: "testuser",
      password: "testpassword",
    });

    token = loginRes.body.token;
  });

  afterAll((done) => {
    //close DB connection so Jest exits cleanly
    db.close(done);
  });

  test("GET /ideas should return all ideas", async () => {
    const res = await request(app).get("/ideas");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("POST /ideas should create a new idea (requires auth)", async () => {
    const newIdea = {
      title: "Test Idea",
      description: "Test Desc",
      status: "Draft",
    };

    const res = await request(app)
      .post("/ideas")
      .set("Authorization", `Bearer ${token}`)
      .send(newIdea);

    expect(res.statusCode).toBe(200); // our API currently returns 200, not 201
    expect(res.body.idea).toHaveProperty("title", newIdea.title);
  });

  test("POST /ideas should fail without token", async () => {
    const res = await request(app).post("/ideas").send({
      title: "Should Fail",
      description: "No token provided",
      status: "Draft",
    });

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body).toHaveProperty("error");
  });
});
