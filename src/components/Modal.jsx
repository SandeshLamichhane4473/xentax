const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative my-4 
                  max-h-[90vh] overflow-y-auto">
    {/* Modal Header */}
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={onClose}
    >
      ✕
    </button>

    {/* Modal Body */}
    {children}
  </div>
</div>
  );
};

export default Modal;
