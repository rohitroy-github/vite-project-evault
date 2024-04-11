import React, {useEffect, useState} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// this data can be from api or other js files
const data = [
  {
    name: "Jan-23",
    client: 26,
    lawyer: 6,
    judge: 1,
    cases: 15,
  },
  {
    name: "Apr-23",
    client: 41,
    lawyer: 15,
    judge: 13,
    cases: 16,
  },
  {
    name: "Jul-23",
    client: 42,
    lawyer: 32,
    judge: 13,
    cases: 36,
  },
  {
    name: "Dec-23",
    client: 60,
    lawyer: 32,
    judge: 13,
    cases: 94,
  },
  {
    name: "Apr-24",
    client: 84,
    lawyer: 60,
    judge: 32,
    cases: 106,
  },
];

const ProjectStatistics = () => {
  const [counters, setCounters] = useState({
    totalClients: 84,
    totalRegisteredLawyers: 60,
    totalRegisteredJudges: 32,
    totalRecordedCases: 106,
  });

  const counterSpeeds = {
    totalClients: 6000, // Counter 1 updates every 2 seconds
    totalRegisteredLawyers: 9000, // Counter 2 updates every 3 seconds
    totalRegisteredJudges: 30000, // Counter 3 updates every 10 seconds
    totalRecordedCases: 4500, // Counter 4 updates every 1.5 seconds
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
    <div className="md:h-screen h-[87vh] flex flex-col justify-center items-center">
      <div className="text-center text-black">
        <p className="md:text-4xl text-3xl font-montserrat md:mb-6 mb-5 text-blue-500">
          Project Statistics
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* LeftSection >>> Data*/}
        <div className="left-section md:w-[40%] w-full md:p-5 justify-center items-center h-full pb-10">
          <div className="grid grid-cols-2 md:grid-cols-2 md:gap-6 gap-4 justify-center">
            {Object.entries(counters).map(([counter, value]) => (
              <div
                key={counter}
                className="md:p-12 px-5 py-8 bg-white rounded-lg border border-blue-500 text-center"
              >
                <p className="md:text-xl text-base font-montserrat mb-2">
                  {counterHeadings[counter]}
                </p>
                <p className="md:text-2xl text-lg font-montserrat font-bold text-blue-500">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RightSection >>> StaticticalChart*/}

        <div className="right-section md:w-[60%] w-full flex justify-center items-center font-montserrat md:p-5 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis
                dataKey="name" // the key-value pair should match in data array
                angle={0}
                height={30}
                tick={{strokeWidth: 1.5, fontSize: 10, dy: 5, x: 0, y: 0}}
                padding={{left: 20, right: 20}}
              />
              <YAxis
                type="number"
                includeHidden={false}
                axisLine={false}
                padding={{top: 5, bottom: 25}}
                tick={{strokeWidth: 1.5, fontSize: 10}}
                width={30}
              />
              <Tooltip wrapperStyle={{fontSize: 12}} />
              <Legend height={1} wrapperStyle={{fontSize: 13, paddingTop: 0}} />
              <Line
                type="monotone"
                strokeWidth={2.5}
                name="Clients"
                dataKey="client" // the key-value pair should match in data array
                stroke="#C3DDFD"
                activeDot={{r: 7}}
              />
              <Line
                type="monotone"
                name="Lawyers"
                strokeWidth={2.5}
                dataKey="lawyer" // the key-value pair should match in data array
                stroke="#76A9FA"
                activeDot={{r: 7}}
              />
              <Line
                type="monotone"
                name="Judges"
                strokeWidth={2.5}
                dataKey="judge" // the key-value pair should match in data array
                stroke="#1C64F2"
                activeDot={{r: 7}}
              />
              <Line
                type="monotone"
                name="Cases"
                strokeWidth={2.5}
                dataKey="cases" // the key-value pair should match in data array
                stroke="#1E429F"
                activeDot={{r: 7}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatistics;
