import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controller/category.controller";
import { authenticationMiddleware } from "../middleware";

export const categoryRoutes = express.Router();
categoryRoutes.use(authenticationMiddleware);
categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/create").post(createCategory);
