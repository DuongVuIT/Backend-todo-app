import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://duonghutech26:duong2607@cluster0.ecdbad3.mongodb.net/todo-app"
    );
    if (connection) {
      console.log("Connection success");
    }
  } catch (error) {
    console.log("error connect mongodb", error);
  }
};
export default connectDb;
