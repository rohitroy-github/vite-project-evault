import React, {useEffect, useState} from "react";

const ProjectStatistics = () => {
  const [counters, setCounters] = useState({
    totalClients: 41,
    totalRegisteredLawyers: 25,
    totalRegisteredJudges: 12,
    totalRecordedCases: 112,
  });

  const counterSpeeds = {
    totalClients: 2000, // Counter 1 updates every 2 seconds
    totalRegisteredLawyers: 3000, // Counter 2 updates every 3 seconds
    totalRegisteredJudges: 10000, // Counter 3 updates every 10 seconds
    totalRecordedCases: 1500, // Counter 4 updates every 1.5 seconds
  };

  const counterHeadings = {
    totalClients: "Total Clients",
    totalRegisteredLawyers: "Total Lawyers",
    totalRegisteredJudges: "Total Judges",
    totalRecordedCases: "Total Cases",
  };

  useEffect(() => {
    const timers = {};
    for (const counter in counterSpeeds) {
      timers[counter] = setInterval(() => {
        setCounters((prevCounters) => ({
          ...prevCounters,
          [counter]: prevCounters[counter] + 1,
        }));
      }, counterSpeeds[counter]);
    }

    return () => {
      // Clear all timers on component unmount
      for (const counter in timers) {
        clearInterval(timers[counter]);
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="text-center text-black mb-8">
        <h2 className="text-4xl font-montserrat text-blue-500">
          Project Statistics
        </h2>
      </div>

      <div className="flex w-full">
        {/* LeftSection >>> Data*/}
        <div className="left-section w-[40%]">
          <div className="flex flex-wrap gap-5 justify-center">
            {Object.entries(counters).map(([counter, value]) => (
              <div
                key={counter}
                className="w-full md:w-[45%] bg-white py-3 rounded-lg border border-blue-500 text-center"
              >
                <p className="text-xl font-montserrat mb-2">
                  {counterHeadings[counter]}
                </p>
                <p className="text-2xl font-montserrat font-bold text-blue-500">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RightSection >>> StaticticalChart*/}
        <div className="right-section w-[60%] border border-blue-500 rounded-lg flex justify-center items-center font-montserrat">
          <div>
            <h3>Chart Code</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatistics;
