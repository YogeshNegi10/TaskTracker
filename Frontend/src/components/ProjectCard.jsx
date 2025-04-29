import React, { useContext, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import dayjs from "dayjs";
import { UserContext } from "../main";
import Spinner from "./spinner";

const ProjectCard = ({
  project,
  tasks,
  onAddTask,
  onChangeTaskStatus,
  onEditTask,
  onDeleteTask,
  onDeleteProject,
  index,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { loading } = useContext(UserContext);

  const handleAddTaskClick = () => {
    onAddTask(project._id, taskTitle, taskDescription);
    setTaskTitle("");
    setTaskDescription("");
  };

  const formatDate = (dateStr) =>
    dayjs(dateStr).format("MMMM D, YYYY · h:mm A");

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative">
      <button
        onClick={() => onDeleteProject(project._id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl font-bold cursor-pointer"
      >
        ×
      </button>

      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        Project {index + 1}: {project.name}
      </h3>
      <p className="text-gray-500 mb-4">{project.description}</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleAddTaskClick}
          disabled={loading}
          className={`${
            loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          } transition-all text-white px-4 py-2 rounded-lg cursor-pointer`}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-sm py-4">
         <Spinner/>
        </div>
      ) : tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-col sm:flex-row justify-between items-start bg-gray-100 p-4 rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-gray-500">{task.description}</p>
                <p className="text-xs text-gray-400">Status: {task.status}</p>
                {task.status === "completed" && (
                  <>
                    <p className="text-xs text-gray-400">
                      Created At: {formatDate(task.createdAt)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Completed At: {formatDate(task.completedAt)}
                    </p>
                  </>
                )}
              </div>

              <div className="flex gap-2 mt-4 sm:mt-0 flex-wrap">
                {task.status === "pending" && (
                  <button
                    onClick={() => onChangeTaskStatus(task._id, "in-progress")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm"
                  >
                    Start
                  </button>
                )}
                {task.status !== "completed" && (
                  <button
                    onClick={() => onChangeTaskStatus(task._id, "completed")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm"
                  >
                    Complete
                  </button>
                )}
                {task.status !== "completed" && (
                  <button
                    onClick={() => onEditTask(task)}
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm"
                  >
                    <FiEdit />
                  </button>
                )}
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm"
                >
                  <FiTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 italic text-center">No tasks yet.</p>
      )}
    </div>
  );
};

export default ProjectCard;
