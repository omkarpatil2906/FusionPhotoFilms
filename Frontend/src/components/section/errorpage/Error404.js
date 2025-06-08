import { useError } from "../../../context/ErrorContext";
import Couple from "./Couple.png";
import Photographer from "./Photographer.png";

const Error404 = () => {
  const { clearError } = useError();

  const handleRetry = () => {
    clearError();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="lg:flex flex-row-reverse w-full items-center justify-around">
        <div className="">
          <img
            src={Photographer}
            className="lg:h-96 lg:w-96"
            loading="lazy"
            alt=""
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl text-center font-semibold text-gray-900 mb-2">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-600 text-center mb-8">
            We couldn't process your request.
          </p>
          <button
            onClick={handleRetry}
            className="bg-purple-500 w-[30%] text-white  px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
