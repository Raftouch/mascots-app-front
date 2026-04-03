interface ModalProps {
  onDelete: () => void;
  onClose: () => void;
  onRedirect: () => void;
}

export default function Modal({ onDelete, onClose, onRedirect }: ModalProps) {
  return (
    <>
      <div
        className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
        onClick={onClose}
      />
      <div className="fixed min-w-[400px] min-h-[200px] p-10 rounded bg-white text-black top-40 left-1/2 -translate-x-1/2">
        <h1 className="text-center mb-10">Are you sure?</h1>
        <div className="flex justify-center gap-20">
          <button
            className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 font-medium"
            onClick={() => {
              onDelete();
              onClose();
              onRedirect();
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 font-medium"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
}
