import { BsKey } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const signUpButtonClickHandler = () => {
    navigate("/signup");
  };


  return (
    <div className="absolute h-full w-full flex flex-col items-center justify-center bg-ms-background">
      <div
        className="w-full h-full min-[600px]:w-[440px] min-[600px]:h-[338px] bg-white text-ms-text-dark"
        style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
      >
        <div className="p-11 w-full h-full flex flex-col">
          <h2 className="text-xl font-medium pb-4 text-ms-light-text">
            Welcome!
          </h2>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              className="pt-2 pb-1.5 border-b border-ms-scrollbar text-base pr-2.5 mb-4 focus:border-ms-blue"
            />
            <div className="flex text-sm text-ms-light-text mb-4">
              <span>No account?</span>
              <span
                className="text-ms-blue-hover hover:underline hover:text-ms-light-text hover:cursor-pointer pl-1"
                onClick={signUpButtonClickHandler}
              >
                Create one!
              </span>
            </div>
            <span className="text-sm text-ms-blue-hover hover:underline hover:text-ms-light-text hover:cursor-pointer">
              Can't access your account?
            </span>
          </div>
          <div className="flex justify-end pt-6">
            <button
              className="py-1 px-3 bg-ms-bg-border min-w-[108px] min-h-[32px] mr-2 hover:bg-ms-gray-button-hover"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button className="py-1 px-3 bg-ms-blue min-w-[108px] min-h-[32px] text-white hover:bg-ms-blue-hover">
              Next
            </button>
          </div>
        </div>
      </div>

      <div
        className="max-[599px]:hidden min-[600px]:w-[440px] min-[600px]:h-[48px] min-[600px]:relative bg-white text-ms-text-dark mt-5 flex items-center hover:bg-ms-white-button-hover hover:bg-opacity-20 hover:cursor-pointer text-base"
        style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
      >
        <div className="flex items-center ml-12">
          <BsKey
            size="30px"
            style={{ transform: "rotate(45deg)", paddingTop: "5px" }}
          />
          <span className="ml-2">Sign-in options</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
