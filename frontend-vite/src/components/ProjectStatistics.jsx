import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

// this data can be from api or other js files
const data = [
  {
    name: "Jan-23",
    client: 14,
    lawyer: 6,
    judge: 1,
    cases: 2,
  },
  {
    name: "Apr-23",
    client: 18,
    lawyer: 7,
    judge: 3,
    cases: 16,
  },
  {
    name: "Jul-23",
    client: 31,
    lawyer: 15,
    judge: 6,
    cases: 18,
  },
  {
    name: "Dec-23",
    client: 57,
    lawyer: 13,
    judge: 17,
    cases: 42,
  },
  {
    name: "Apr-24",
    client: 65,
    lawyer: 26,
    judge: 19,
    cases: 63,
  },
];

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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis
                dataKey="name" // the key-value pair should match in data array
                angle={-35}
                height={30}
                tick={{ strokeWidth: 1.5, fontSize: 10, dy: 10, x: 0, y: 0 }}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                type="number"
                includeHidden={false}
                axisLine={false}
                padding={{ top: 10, bottom: 10 }}
                tick={{ strokeWidth: 1.5, fontSize: 10 }}
                width={30}
              />
              <Legend height={25} wrapperStyle={{ fontSize: 13 }} />
              <Line
                type="monotone"
                strokeWidth={2.5}
                name="Clients"
                dataKey="client" // the key-value pair should match in data array
                stroke="#4472C4"
              />
              <Line
                type="monotone"
                name="Lawyers"
                strokeWidth={2.5}
                dataKey="lawyer" // the key-value pair should match in data array
                stroke="#FFC000"
              />
              <Line
                type="monotone"
                name="Judges"
                strokeWidth={2.5}
                dataKey="judge" // the key-value pair should match in data array
                stroke="#A5A5A5"
              />
              <Line
                type="monotone"
                name="Cases"
                strokeWidth={2.5}
                dataKey="cases" // the key-value pair should match in data array
                stroke="#ED7D31"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatistics;
