import mongoose from "mongoose";

// DB connection

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "ToDoBackend",
    })
    .then((c) => {
      console.log(`Database Connected with ${c.connection.host} `);
    })
    .catch((error) => {
      console.log("Not Connected to db", error);
    });
};
