process.env.NODE_ENV = "test";
process.env.PORT = process.env.PORT || "4000";
process.env.MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/fullstack_challenge_test";
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
process.env.REQRES_BASE_URL =
  process.env.REQRES_BASE_URL || "https://reqres.in";
