import clsx from "clsx";

export function Button({
  children,
  variant = "default",
  className,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring";

  const variants = {
    default: "bg-black text-white hover:bg-black/90",
    outline:
      "border border-gray-300 bg-white text-black hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}