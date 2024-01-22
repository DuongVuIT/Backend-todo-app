import express from "express";

import {
  createTask,
  deleteTask,
  editTask,
  getAllTaskByCategory,
  getAllTaskCompleted,
  getAllTasks,
  getTasksForToday,
  toggleTaskStatus,
} from "../controller/task.controller";
import { authenticationMiddleware } from "../middleware";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route("/").get(getAllTasks);
taskRoutes.route("/task-by-categories/:id").get(getAllTaskByCategory);
taskRoutes.route("/today").get(getTasksForToday);
taskRoutes.route("/completed").get(getAllTaskCompleted);
taskRoutes.route("/create").post(createTask);
taskRoutes.route("/editTask/:id").put(editTask);
taskRoutes.route("/update/:id").put(toggleTaskStatus);
taskRoutes.route("/:id").delete(deleteTask);
export default taskRoutes;
