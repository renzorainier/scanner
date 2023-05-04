import { useState } from "react";
import Scan from "./Scan";

function PasswordProtectedContent() {
  const [password, setPassword] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Replace this with your actual password check logic
    if (password === "scansscas") {
      setShowContent(true);
    }
  };

  return (
    <div>
      <div >
        {!showContent && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 mb-2"
            >
              Enter password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Submit
            </button>
          </form>
        )} {showContent && (
          <div>
            <Scan />
          </div>
        )}

      </div>


    </div>
  );
}

export default PasswordProtectedContent;
