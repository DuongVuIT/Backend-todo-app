import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user-model";
import { IUser } from "../types";
import { Types } from "mongoose";
const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};
export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ messenge: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return response.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );
    if (isPasswordCorrect) {
      const token = getUserToken((await existUser)._id);
      return response.send({
        token,
        user: {
          email: existUser.email,
          name: existUser.name,
        },
      });
    } else {
      return response.status(400).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.log("error in loginUser", error);
    throw error;
  }
};
