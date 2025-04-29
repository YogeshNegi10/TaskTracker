import { Project } from "../modals/projectModal.js";
import { Task } from "../modals/taskModal.js";
import User from "../modals/userModal.js";

export const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const project = await Project.create({
      name,
      description,
      user: req.user._id,
    });

    let user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.credits <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits Topup to create a project",
      });
    }

    user.credits -= 1;
    await user.save();


    res.status(201).json({
      success: true,
      project,
      credits:user.credits
    });
  

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      
    });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this project",
      });
    }


    await Task.deleteMany({ project: project._id });

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project and associated tasks deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
