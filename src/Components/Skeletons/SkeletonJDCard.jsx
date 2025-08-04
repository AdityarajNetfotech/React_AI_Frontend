import React from "react";

const SkeletonJDCard = () => {
  return (
    <div className="animate-pulse space-y-4 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto mt-6">
        <div className="p-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="w-10 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
              <div className="w-10 h-4 bg-gray-300 rounded"></div>
              <div className="w-10 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonJDCard;
