import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { server } from "../../utils/api";
import { UserContext } from "../main";
import toast from "react-hot-toast";
import CreateProject from "../components/CreateProject";
import ProjectCard from "../components/ProjectCard";
import EditTaskModal from "../components/EditTaskModal";
import Spinner from "../components/spinner";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const {
    refresh,
    Authenticated,
    setLoading,
    loading,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${server}/api/v1/project/get-my-projects`,
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [refresh, setLoading]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `${server}/api/v1/task/get-all-tasks`,
          { withCredentials: true }
        );
        const tasksByProject = data.tasks.reduce((acc, task) => {
          const projectId = task.project._id;
          if (!acc[projectId]) acc[projectId] = [];
          acc[projectId].push(task);
          return acc;
        }, {});
        setTasks(tasksByProject);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks");
      }
    };

    fetchTasks();
  }, [refresh]);

  const handleAddTask = async (projectId, title, description) => {
    if (!title.trim() || !description.trim()) {
      return toast.error("Please enter both title and description!");
    }
    try {
      const { data } = await axios.post(
        `${server}/api/v1/task/create-task`,
        {
          title,
          description,
          status: "pending",
          project: projectId,
        },
        { withCredentials: true }
      );
      toast.success("Task created!");

      setTasks((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), data.task],
      }));


    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const handleChangeTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `${server}/api/v1/task/update-status/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
  
      toast.success(`Task marked as ${newStatus}`);
  
    
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        for (const projectId in updatedTasks) {
          updatedTasks[projectId] = updatedTasks[projectId].map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          );
        }
        return updatedTasks;
      });
  
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task status");
    }
  };
  

  const handleDeleteTask = async (taskId) => {
    try {

      await axios.delete(
        `${server}/api/v1/task/delete-task/${taskId}`,
        { withCredentials: true }
      );
      toast.success("Task deleted");

    
      setTasks((prev) => {
        const newTasks = { ...prev };
        for (const projectId in newTasks) {
          newTasks[projectId] = newTasks[projectId].filter(
            (task) => task._id !== taskId
          );
        }
        return newTasks;
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.put(
        `${server}/api/v1/project/delete-project/${projectId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Project deleted");


      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      setTasks((prev) => {
        const newTasks = { ...prev };
        delete newTasks[projectId];
        return newTasks;
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const { _id, title, description, project } = currentTask;
  
    if (!title.trim() || !description.trim()) {
      return toast.error("Title and description cannot be empty!");
    }
  
    try {
      const { data } = await axios.put(
        `${server}/api/v1/task/update-task/${_id}`,
        { title, description },
        { withCredentials: true }
      );
  
      toast.success("Task updated!");
      closeModal();
      
      const projectId = typeof project === "string" ? project : project._id;
  
      setTasks((prev) => {
        const updatedTasks = prev[projectId].map((t) =>
          t._id === _id ? { ...t, title, description } : t
        );
        return { ...prev, [projectId]: updatedTasks };
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };
  

  if (!Authenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Create Project Component */}
        <CreateProject setProjects={setProjects} />

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center flex flex-col gap-1 justify-center items-center text-xl font-medium text-gray-600 py-2">
            <Spinner size={60} />
            Fetching Projects...
          </div>
        ) : (
          <div className="space-y-8 mt-10">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  index={index}
                  project={project}
                  tasks={tasks[project._id] || []}
                  onAddTask={handleAddTask}
                  onChangeTaskStatus={handleChangeTaskStatus}
                  onEditTask={openEditModal}
                  onDeleteTask={handleDeleteTask}
                  onDeleteProject={handleDeleteProject}
                />
              ))
            ) : (
              <div className="text-center flex flex-col gap-1 justify-center items-center text-xl font-medium text-gray-600 py-2">
                No projects yet, create one!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Task Modal */}
      {isModalOpen && currentTask && (
        <EditTaskModal
          task={currentTask}
          setTask={setCurrentTask}
          onClose={closeModal}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default Projects;
