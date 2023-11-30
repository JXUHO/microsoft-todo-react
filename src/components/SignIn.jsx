import { BsKey } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [emailAlertContent, setEmailAlertContent] = useState("");

  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [passwordAlertContent, setPasswordAlertContent] = useState("");
  const [isShowPasswordChecked, setIsShowPasswordChecked] = useState(false);

  const checkboxRef = useRef();



  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === "Enter") {
        nextButtonClickHandler();
      }
    };
    document.addEventListener("keydown", handleEnterKeyPress);
    return () => document.removeEventListener("keydown", handleEnterKeyPress);
  }, [email, password]);

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const nextButtonClickHandler = async () => {
    if (!showPasswordTab) {
      //email
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      try {
        const querySnapshot = await getDocs(emailQuery);
        if (querySnapshot.size === 0) {
          setEmailAlertContent(
            "We couldn't find an account with that username. Try another, or get a new Microsoft account."
          );
          setShowEmailAlert(true);
        } else {
          setShowPasswordTab(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // password
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch(login({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          photoUrl: userCredential.user.photoURL
        }))


        navigate("/");
      } catch (error) {
        if (error.code === "auth/invalid-login-credentials") {
          setShowPasswordAlert(true);
          setPasswordAlertContent("Your account or password is incorrect.");
          // If you don't remember your password, reset it now.
        } else if (error.code === "auth/missing-password") {
          setShowPasswordAlert(true);
          setPasswordAlertContent(
            "Please enter the password for your Microsoft account."
          );
        } else {
          console.log(error.code);
          console.log(error.message);
        }
      }
    }
  };

  return (
    <div className="absolute h-full w-full flex flex-col items-center justify-center bg-ms-background">
      <div
        className="w-full h-full min-[600px]:w-[440px] min-[600px]:h-[350px] bg-white text-ms-text-dark"
        style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
      >
        <div className="p-11 w-full h-full flex flex-col">
          <h2 className="text-xl font-medium pb-4 text-ms-light-text">
            Welcome!
          </h2>

          {!showPasswordTab ? (
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
              {showEmailAlert && (
                <p className="text-ms-alert-error">{emailAlertContent}</p>
              )}
              <input
                type="email"
                placeholder="Email"
                className="pt-2 pb-1.5 border-b border-ms-scrollbar text-base pr-2.5 mb-4 focus:border-ms-blue"
                onChange={emailInputHandler}
                value={email}
                autoFocus
              />
              <div className="flex text-sm text-ms-light-text mb-4">
                <span>No account?</span>
                <span
                  className="text-ms-blue-hover hover:underline hover:text-ms-light-text hover:cursor-pointer pl-1"
                  onClick={() => navigate("/signup")}
                >
                  Create one!
                </span>
              </div>
              <span className="text-sm text-ms-blue-hover hover:underline hover:text-ms-light-text hover:cursor-pointer">
                Can't access your account?
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center">
                <div>{email}</div>
              </div>
              <h1 className="text-2xl font-semibold mb-2">Enter password</h1>
              {showPasswordAlert && (
                <p className="text-ms-alert-error">{passwordAlertContent}</p>
              )}
              <input
                className={`pt-2 pb-1.5 border-b  text-base pr-2.5 mb-4  ${
                  showPasswordAlert && passwordAlertContent !== ""
                    ? "border-ms-alert-error focus:border-ms-alert-error"
                    : "border-ms-scrollbar focus:border-ms-blue"
                }`}
                type={`${isShowPasswordChecked ? "text" : "password"}`}
                name="password"
                autoFocus
                value={password}
                onChange={passwordInputHandler}
                placeholder="Create password"
              />
              <div className="flex text-sm text-ms-light-text mb-4">
                <input
                  ref={checkboxRef}
                  className="w-5 h-5 mr-2 hover:cursor-pointer"
                  type="checkbox"
                  onChange={() =>
                    setIsShowPasswordChecked(!isShowPasswordChecked)
                  }
                />
                <span
                  className="hover:cursor-pointer"
                  onClick={() => checkboxRef.current.click()}
                >
                  Show password
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end py-3">
            <button
              className="py-1 px-3 bg-ms-bg-border min-w-[108px] min-h-[32px] mr-2 hover:bg-ms-gray-button-hover"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className="py-1 px-3 bg-ms-blue min-w-[108px] min-h-[32px] text-white hover:bg-ms-blue-hover"
              onClick={nextButtonClickHandler}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {!showPasswordTab && (
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
      )}
    </div>
  );
};

export default SignIn;
