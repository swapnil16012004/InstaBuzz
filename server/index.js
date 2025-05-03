const express = require("express");
const app = express();
const cors = require("cors");

const pageRouter = require("./services/pageRoutes");
// const userRouter = require("./services/userRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/pages", pageRouter);
// app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.redirect("/api/pages");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
