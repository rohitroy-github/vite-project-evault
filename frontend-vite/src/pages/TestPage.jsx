import React from "react";

const TestPage = () => {
  // You can set up a state variable to hold the fetched data
  const [fetchedData, setFetchedData] = React.useState(null);

  // Replace this function with your actual data fetching logic
  const fetchData = async () => {
    // Example fetching logic
    const response = await fetch("your-api-endpoint");
    const data = await response.json();
    setFetchedData(data);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      {/* Main container */}
      <div className="border-2 border-blue-500 p-4 rounded-lg w-1/2 h-1/2">
        {/* Text */}
        <p className="text-black font-montserrat mb-2">Data :</p>

        {/* Empty field */}
        <div className="border-2 border-gray-300 p-2 rounded-lg">
          {fetchedData ? (
            // Display fetched data
            <p className="text-black font-montserrat">{fetchedData}</p>
          ) : (
            // Display loading or empty state
            <p className="text-gray-400 font-montserrat">Loading...</p>
          )}
        </div>

        {/* Button to trigger data fetching */}
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 font-montserrat w-full"
          onClick={fetchData}
        >
          Fetch Data
        </button>
      </div>
    </div>
  );
};

export default TestPage;
