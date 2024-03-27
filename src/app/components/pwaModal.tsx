import React from "react";

const PwaModal = ({ show, onClose, onInstall }: any) => {
  const blurBackground = show ? "backdrop-blur" : "";
  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-94 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold m-2 text-black">
            Install the app
          </h2>
          <p className="text-sm mb-4 text-black"> click for install app</p>
          <div className="flex">
            <button
              onClick={onInstall}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
            >
              Install
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full m-2"
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          className={` fixed inset-0 bg-gray-900 opacity-80 -z-10 ${blurBackground}`}
          onClick={onClose}
        />
      </div>
    )
  );
};
export default PwaModal;
