
function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
  icon: Icon,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-1.5 pl-1">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl bg-slate-900/60 border ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
          } py-3 ${
            Icon ? "pl-11" : "px-4.5"
          } pr-4 text-white placeholder-slate-500 outline-none transition-all focus:ring-4`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-rose-500 pl-1 font-medium animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;
