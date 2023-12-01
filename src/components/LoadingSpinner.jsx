import { Oval } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Oval
        height={80}
        width={80}
        color="#2564cf"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#78bafd"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoadingSpinner;
