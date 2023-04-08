import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
} from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Adding new task
router.post("/new", isAuthenticated, newTask);

// get me/user task
router.get("/my", isAuthenticated, getMyTask);

// To update(completed or not) & delete
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
