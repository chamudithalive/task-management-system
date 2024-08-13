import { CloseCircle } from "iconsax-react";
import React from "react";

interface ConfirmDeletePopupProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-generic-white p-6 rounded-xl w-1/3 grid gap-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            Are you sure you want to delete selected task?
          </span>
          <CloseCircle onClick={onClose} className="cursor-pointer" />
        </div>
        <p>
          This will permanently delete the selected task. These items will no
          longer be accessible to you. This action is irreversible.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
