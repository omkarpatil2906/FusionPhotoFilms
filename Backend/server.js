// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
// const connectToMongo = require('./config/db');
const { connectToDatabase } = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");
// connectToMongo()
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const app = express();
const port = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://fusionphotofilms.com"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(
  cors(
    {
    origin: [
      "http://localhost:3000",
      "http://192.168.79.93:3000",
      "https://www.google.com",
      "https://www.google.co.in",
      "https://www.google.co.uk",
      "https://fusionphotofilms.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
)
);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the Backend API",
    serverTime: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/images", imageRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "controllers", "uploads"))
);

// Connect to the database before starting the server
connectToDatabase().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
});

