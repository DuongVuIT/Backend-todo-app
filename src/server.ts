import express, { Request, Response } from "express";
import useRoutes from "./routes/user.route";
import { categoryRoutes } from "./routes/category.route";
import { connectDB } from "./db/db";
import taskRoutes from "./routes/task.route";
const app = express();
app.use(express.json());
const PORT = 3000;
connectDB();
app.get("/ping", (request: Request, response: Response) => {
  response.send("pong");
});
app.use("/user", useRoutes);
app.use("/categories", categoryRoutes);
app.use("/tasks", taskRoutes);
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "...");
});
