
const SignUp = () => {

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
            <h1 className="text-2xl font-semibold">Create account</h1>
            <input
              type="email"
              placeholder="someone@example.com"
              className="pt-4 pb-1.5 border-b border-ms-scrollbar text-base pr-2.5 mb-4 focus:border-ms-blue"
            />
          </div>
          <div className="flex justify-end pt-12">
            <button className="py-1 px-3 bg-ms-blue min-w-[108px] min-h-[32px] text-white hover:bg-ms-blue-hover hover:underline">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignUp;
