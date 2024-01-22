import { Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../model/task-model";
import { ITask } from "../types";
export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({ user: userId });
    res.send(tasks);
  } catch (error) {
    console.log("error in getAllTasks", error);
    res.send({ error: "Error in getAllTasks" });
    throw error;
  }
};
export const getAllTaskByCategory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const { id } = req.params;
    const tasks = await Task.find({ user: userId, categoryId: id });
    res.send(tasks);
  } catch (error) {
    console.log("error in getAllTasks", error);
    res.send({ error: "Error in getAllTasksByCategory" });
    throw error;
  }
};
export const getAllTaskCompleted = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({ user: userId, isCompleted: true });
    res.send(tasks);
  } catch (error) {
    console.log("error in getAllTaskCompleted", error);
    res.send({ error: "Error in getAllTaskCompleted" });
    throw error;
  }
};
export const getTasksForToday = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const todaysISODate = new Date();
    todaysISODate.setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      user: userId,
      date: todaysISODate.toISOString(),
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getTasksForToday", error);
    response.send({ error: "Error while fetching tasks" });
    throw error;
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const { name, date, categoryId }: ITask = req.body;
    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    });
    res.send(task);
  } catch (error) {
    console.log("error in createTask", error);
    res.send({ error: "Error in createTask" });
    throw error;
  }
};
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Task.deleteOne({ _id: id });
    res.send({ message: "Task deleted" });
  } catch (error) {
    console.log("error in deletedTask", error);
    res.send({ error: "Error in deletedTask" });
    throw error;
  }
};
export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;
    const task = await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    );
    res.send({ error: "update status successfully" });
  } catch (error) {
    console.log("error in toggleTask", error);
    res.send({ error: "error in update Status" });
    throw error;
  }
};
export const editTask = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, name, date, categoryId }: ITask = req.body;
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          date,
          categoryId,
        },
      }
    );
    res.send({ message: "Task updated successfully" });
  } catch (error) {
    console.log("error in toggleTask", error);
    res.send({ error: "error in update Status" });
    throw error;
  }
};
