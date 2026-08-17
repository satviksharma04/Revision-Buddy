const Button = ({
  children,
  type = "button",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-indigo-600
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-4
        focus:ring-indigo-100
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
};

export default Button;