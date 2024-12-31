const app = require("./app");
const dbConnection = require("./db/dbConfig");
const port = 5550;

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test'");
    app.listen(port, () => {
      console.log("Database connection established");
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}
start();
