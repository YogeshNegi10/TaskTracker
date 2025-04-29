import { Task } from "../modals/taskModal.js";
import ErrorHandler from "../utils/error.js";

// Fuction To Get Add  task

export const addTask = async (req, res, next) => {
  try {
    const { title, description, status, project } = req.body;

    if (!title || !project) {
      return res
        .status(400)
        .json({ message: "Title and Project ID are required." });
    }

    const task = await Task.create({
      title,
      description,
      status,
      project,
    });

    res.status(201).json({
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    next(error);
  }
};

// Fuction for To Get my All task  

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("project");

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    next(error);
  }
};

// Function To Update status of My Task 

export const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
 
  try {
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id!", 404));

    task.status = status || task.status;

    if (status === "completed") {
      task.completedAt = new Date();
    }

    await task.save();

    res.status(200).json({
      sucess: true,
      message: "Task Updated successfully!.",
      task,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Function To update My Task 
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id!", 404));

    task.title = title || task.title;
    task.description = description || task.description;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Edited successfully.",
      task,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Function To Delete My Task 

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id!", 404));

    await task.deleteOne();

    res.status(200).json({
      sucess: true,
      message: "Task Deleted successfully!.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
