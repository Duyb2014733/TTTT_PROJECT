const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

async function startServer() {
  try {
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database!");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Cannot connect to the database!", error);
    process.exit(1);
  }
}

startServer();
