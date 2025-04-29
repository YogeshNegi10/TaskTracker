import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const TopUpModal = ({ topUpAmount, setTopUpAmount, onClose, handleTopUp }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="absolute inset-0 bg-black opacity-85"></div>
        <motion.div
          className="bg-white relative p-6 rounded-lg w-96 shadow-lg"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Top-Up Credits</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleTopUp();
          }} className="space-y-4">
            <div>
              <label
                htmlFor="top-up-amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Amount
              </label>
              <input
                id="top-up-amount"
                type="number"
                min={1}
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-full border p-2 rounded"
            
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTopUpAmount("");
                }}
                className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TopUpModal;
