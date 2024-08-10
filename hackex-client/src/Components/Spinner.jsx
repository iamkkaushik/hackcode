/* eslint-disable react/prop-types */
const Spinner = ({ size = 10, color = "blue", width = 4 }) => {
  const borderColor =
    color === "blue"
      ? "border-blue-primary"
      : color === "white"
      ? "border-white"
      : `border-${color}`;

  const borderWidth = width === 4 ? "border-4" : width === 2 ? "border-2" : "";
  return (
    <div className={`w-full h-${size} flex justify-center`}>
      <span className={`loader ${borderColor} ${borderWidth}`}></span>
    </div>
  );
};

export default Spinner;
