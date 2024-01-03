import { Oval } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Loading = () => {
  // const user = useSelector((state) => state.auth.user);
  // const navigate = useNavigate()
  // const { isLoading: isAuthLoading } = useAuth()


  // useEffect(() => {
  //   if (!isAuthLoading && user) {
  //     navigate("/")
  //   } else if (!isAuthLoading && !user) {
  //     navigate("/user/signin")
  //   }
  // }, [isAuthLoading, user, navigate])


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Oval
        height={50}
        width={50}
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

export default Loading;
