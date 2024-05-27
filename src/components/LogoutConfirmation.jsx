import React from 'react';

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Confirm Logout</h2>
        <p className="mb-4 text-black">Are you sure you want to log out?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
