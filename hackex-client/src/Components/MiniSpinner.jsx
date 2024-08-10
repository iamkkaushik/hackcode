const MiniSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
      <div className="miniLoader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
  );
};

export default MiniSpinner;
