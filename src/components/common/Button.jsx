function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;