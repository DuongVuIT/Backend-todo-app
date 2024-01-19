import express, { Request, Response } from "express";
import connectDB from "./db/db";
import useRoutes from "./routes/user.route";
const app = express();
app.use(express.json());
const PORT = 3000;
connectDB();
app.get("/ping", (request: Request, response: Response) => {
  response.send("pong");
});
app.use("/user", useRoutes);
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "...");
});
