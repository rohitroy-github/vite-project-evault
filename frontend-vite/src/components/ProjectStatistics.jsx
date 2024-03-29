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
    totalClients: "Total Registered Clients",
    totalRegisteredLawyers: "Total Registered Lawyers",
    totalRegisteredJudges: "Total Registered Judges",
    totalRecordedCases: "Total Recorded Cases",
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
      <div className="text-center text-black">
        <h2 className="text-4xl font-montserrat mb-8 text-blue-500">
          Project Statistics
        </h2>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {Object.entries(counters).map(([counter, value]) => (
          <div
            key={counter}
            className="bg-white px-5 py-3 rounded-lg border border-blue-500 text-center"
          >
            <p className="text-xl font-montserrat mb-2">
              {counterHeadings[counter]}
            </p>
            <p className="text-2xl font-montserrat">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatistics;
