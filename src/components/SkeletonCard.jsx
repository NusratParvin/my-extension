const SkeletonCard = () => {
  return (
    <div className="card card-compact bg-base-100 dark:bg-black/10 shadow-md mb-2 border border-base-300 animate-pulse">
      <div className="card-body p-3.5">
        <div className="flex items-center justify-between">
          {/* Left Side - Avatar and House Info */}
          <div className="flex items-center">
            <div className="skeleton w-7 h-7 rounded-full"></div>
            <div className="ml-3">
              <div className="skeleton h-4 w-24 mb-1"></div>
              <div className="skeleton h-3 w-36"></div>
            </div>
          </div>

          {/* Right Side - Badge + Amount + Difference */}
          <div className="text-right">
            <div className="skeleton h-5 w-16 mb-1 rounded"></div>
            <div className="skeleton h-5 w-24 mb-1"></div>
            <div className="skeleton h-3 w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
