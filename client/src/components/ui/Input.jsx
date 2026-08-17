const Input = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2">

      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className="
          w-full
          rounded-lg
          border
          border-gray-200
          bg-gray-50
          px-4
          py-3
          text-sm
          text-gray-900
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-indigo-400
          focus:bg-white
          focus:ring-4
          focus:ring-indigo-50
        "
      />

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Input;