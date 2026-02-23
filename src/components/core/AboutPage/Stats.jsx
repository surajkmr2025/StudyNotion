import React from "react";

const stats = [
  { id: 1, count: "5K", label: "Active Students" },
  { id: 2, count: "10+", label: "Mentors" },
  { id: 3, count: "200+", label: "Courses" },
  { id: 4, count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section className="bg-richblack-800 py-12 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((data) => (
            <div
              key={data.id}
              className="
                rounded-xl border border-white/10 
                bg-richblack-800 p-6 text-center 
                shadow-lg transition-all duration-300 
                hover:-translate-y-1 hover:shadow-xl
              "
            >
              <p className="mb-2 text-3xl font-bold text-blue-400 md:text-4xl lg:text-5xl">
                {data.count}
              </p>
              <p className="text-sm font-medium text-richblack-300 md:text-base">
                {data.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;
