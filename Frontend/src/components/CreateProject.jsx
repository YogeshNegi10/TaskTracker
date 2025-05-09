import React, { useContext, useState } from "react";
import { server } from "../../utils/api";
import toast from "react-hot-toast";

import axios from "axios";
import { UserContext } from "../main";


const CreateProject = ({ setProjects }) => {
  const [creating, setCreating] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

const {setUser} = useContext(UserContext)

  const handleCreateProject = async () => {
    if (!projectName.trim() || !projectDescription.trim()) {
      return toast.error("Please enter both project name and description!");
    }
    try {
      setCreating(true);
      const { data } = await axios.post(
        `${server}/api/v1/project/create`,
        {
          name: projectName,
          description: projectDescription,
        },
        { withCredentials: true }
      );

   
      toast.success(data.message || "Project created successfully!");
    
      if (data.credits !== undefined) {
        setUser((prevUser) => ({ ...prevUser, credits: data.credits }));
      }
      setProjects((prevProjects) => [...prevProjects, data.project,]);
      setProjectName("");
      setProjectDescription("");
     
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Create a New Project
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          className="border-2 border-indigo-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your project name..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          type="text"
          className="border-2 border-indigo-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter project description..."
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <button
          disabled={creating}
          onClick={handleCreateProject}
          className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 transition-all text-white font-semibold py-3 px-6 rounded-lg"
        >
          {creating ? "Creating..." : "Create Project"}
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
