require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/UserModel");
const Post = require("./models/PostModel");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const pageRouter = require("./services/pageRoutes");
const userRouter = require("./services/userRoutes");
const messageRoutes = require("./services/messageRoutes");

const http = require("http");
const { Server } = require("socket.io");

const MONGO_URL =
  process.env.ATLASDB_URL ||
  "mongodb+srv://pawarswapnil3305:KxaibqIkJvmISEFf@cluster0.ej4mfzo.mongodb.net/instabuzz?retryWrites=true&w=majority&appName=Cluster0";
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld",
];

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = origin ? origin.replace(/\/$/, "") : origin;
      if (
        !normalizedOrigin ||
        allowedOrigins.includes(normalizedOrigin) ||
        origin === "null"
      ) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${normalizedOrigin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  store,
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api", pageRouter);
app.use("/api", userRouter);
app.use("/api", messageRoutes);

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({ message });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.locals.io = io;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send-message", ({ to, message }) => {
    io.to(to).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
