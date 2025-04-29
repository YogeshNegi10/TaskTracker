import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300 } },
};

const EditTaskModal = ({ task, setTask, onClose, onUpdate }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-sm" onClick={onClose}></div>

        <motion.div
          className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md relative z-10"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Task</h2>
          <form onSubmit={onUpdate} className="space-y-4">
            <div>
              <label htmlFor="edit-task-title" className="block text-sm font-semibold text-gray-700 mb-1">
                Task Title
              </label>
              <input
                id="edit-task-title"
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="edit-task-description" className="block text-sm font-semibold text-gray-700 mb-1">
                Task Description
              </label>
              <textarea
                id="edit-task-description"
                className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Update
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditTaskModal;
