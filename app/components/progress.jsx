import React from "react";

const Progress = React.forwardRef(
  (
    {
      value = 0,
      max = 100,
      className = "",
      indicatorClassName = "",
      showValue = false,
      animate = true,
      height = "h-2",
      barColor = "bg-[#D0F601]",
      backgroundColor = "bg-gray-200",
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const containerClasses = `relative w-full overflow-hidden rounded-full ${backgroundColor} ${height} ${className} shadow-inner`;
    const barClasses = `h-full rounded-full ${barColor} ${
      animate ? "transition-all duration-700 ease-out" : ""
    } ${indicatorClassName} relative overflow-hidden shadow-sm`;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={containerClasses}
        {...props}
      >
        <div
          className={barClasses}
          style={{
            width: `${percentage}%`,
            transition: animate
              ? "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D0F601]/80 to-[#D0F601] rounded-full blur-[1px]" />
        </div>

        {showValue && (
          <span
            className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white drop-shadow-lg"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export default Progress;
