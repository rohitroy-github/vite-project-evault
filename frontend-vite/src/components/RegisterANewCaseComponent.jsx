import React, {useState, useEffect} from "react";
import registerNewCase from "../blockchain-api/registerNewCase";

// Define the initial state
const initialState = {
  UIDOfParty1: "",
  UIDOfParty2: "",
  associatedJudge: "",
  caseSubject: "",
  associatedLawyers: [],
  callerAccount: "",
};

const RegisterANewCaseComponent = () => {
  const [formData, setFormData] = useState({...initialState});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (
      !formData.UIDOfParty1 ||
      !formData.UIDOfParty2 ||
      !formData.associatedJudge ||
      !formData.caseSubject ||
      !formData.associatedLawyers.length ||
      !formData.callerAccount
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    console.log("Submitted data:", formData);

    try {
      const register = await registerNewCase(formData);
      alert(register);

      // Reset the form data to the initial state after a successful submission
      setFormData({...initialState});
    } catch (error) {
      console.error("Error during registration >>>", error);
    }
  };

  useEffect(() => {
    const fetchCallerAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            // Set the first account as the callerAccount
            setFormData((prevData) => ({
              ...prevData,
              callerAccount: accounts[0],
            }));
          }
        } catch (error) {
          console.error("Error fetching caller account:", error);
        }
      }
    };

    fetchCallerAccount();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white p-8 font-montserrat w-[50%]">
        <h1 className="text-3xl font-montserrat mb-5 text-center">
          Register A New Legal Case
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Enter UID for Party 1 ?"
              name="UIDOfParty1"
              value={formData.UIDOfParty1}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Enter UID for Party 2 ?"
              name="UIDOfParty2"
              value={formData.UIDOfParty2}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Case Subject ?"
              name="caseSubject"
              value={formData.caseSubject}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Case Judge ?"
              name="associatedJudge"
              value={formData.associatedJudge}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Associated Lawyers (comma-separated) ?"
              name="associatedLawyers"
              value={formData.associatedLawyers.join(", ")}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  associatedLawyers: e.target.value
                    .split(",")
                    .map((lawyer) => lawyer.trim()),
                }))
              }
            />
          </div>
          <div className="text-center mt-5 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterANewCaseComponent;
