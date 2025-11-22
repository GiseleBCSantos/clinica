export interface StatCardProps {
  title: string;
  value: number;
  variant?: "primary" | "info" | "warning" | "success" | "danger";
}

export const StatCard = ({
  title,
  value,
  variant = "primary",
}: StatCardProps) => {
  const variantKey: NonNullable<StatCardProps["variant"]> = variant;

  const variantClasses: Record<
    NonNullable<StatCardProps["variant"]>,
    string
  > = {
    primary: "bg-blue-500 text-white",
    info: "bg-cyan-500 text-white",
    warning: "bg-yellow-400 text-black",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return (
    <div className={`p-6 rounded-lg shadow ${variantClasses[variantKey]}`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
