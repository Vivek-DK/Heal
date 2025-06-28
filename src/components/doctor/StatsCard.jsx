const StatsCard = ({
  title,
  value,
  description,
  icon,
  className,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className || ""}`}>
      <div className="flex items-center">
        {icon && <div className="mr-4">{icon}</div>}
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-3xl font-semibold text-gray-900">{value}</p>
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
