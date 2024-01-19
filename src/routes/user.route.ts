import express from "express";

import { createUser, loginUser } from "../controller/user.controller";

const useRoutes = express.Router();

useRoutes.route("/create").post(createUser);
useRoutes.route("/login").post(loginUser);
export default useRoutes;
