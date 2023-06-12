import React, { useEffect, useState } from "react";
// import logo from "../assets/logoMusicart.png";
import TextBox from "../components/TextBox";
import "../styles/login.css";
import Loader from "../components/Loader";
import { loginUser } from "../api/service";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/UserContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { setUserAuth } = React.useContext(AuthContext);
  const auth = localStorage.getItem("token");
  const login = async (event) => {
    event.preventDefault();
    // Activate the loader
    setLoader(true);
    // Create a new user
    if (email !== "" && password !== "") {
      setLoader(false);
      const user = {
        email: email,
        password: password,
      };
      setEmail("");
      setPassword("");
      await loginUser(user)
        .then((req, res) => {
          const { status, message } = req.data;
          if (status === "failed") {
            alert(message);
          } else {
            localStorage.setItem("token", req.data.token);
            setUserAuth(true);
            navigate("/home");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoader(false);
      alert("All fields are mandatory!");
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/home");
    } else {
      setUserAuth(false);
    }
  }, []);

  return (
    <div className="h-screen bg-bluePrimary">
      {loader && (
        <div className="z-10 absolute flex flex-row items-center justify-center h-full w-full">
          <Loader />
        </div>
      )}
      <div className="flex flex-col items-center pt-16">
        <div className="flex flex-col mt-16 md:mt-12 px-4 w-5/6 sm:w-1/2 lg:w-1/3">
          {/* <img src={logo} alt="logo" className="inline w-10 h-10" /> */}
          <h1 className=" text-white text-3xl flex flex-row items-center font-semibold">
            Feedback
          </h1>
          <p className="text-start text-white mt-2">
            Add your products and give us your valuable feedback
          </p>
        </div>
        <form
          onSubmit={login}
          className="p-6 px-10 bg-white flex flex-col items-start border mt-12 md:mt-8 border-[#D9D9D9] border-3px w-5/6 sm:w-1/2 lg:w-1/3 rounded-xl"
        >
          <TextBox
            textInput="text-md text-bluePrimary"
            textLabel="text-md text-bluePrimary"
            width="w-full"
            height="h-12"
            hint="Email ID"
            backgroundColor="bg-white"
            position="left-2 md:left-3 top-2.5"
            border="border-gray border-2"
            span="px-1"
            input="px-3 md:px-4"
            div="mt-8"
            setState={setEmail}
            value={email}
            type="email"
          />
          <TextBox
            textInput="text-md text-bluePrimary"
            textLabel="text-md text-bluePrimary"
            width="w-full"
            height="h-12"
            hint="Password"
            backgroundColor="bg-white"
            position="left-2 md:left-3 top-2.5"
            border="border-gray border-2"
            span="px-1"
            input="px-3 md:px-4"
            div="mt-8"
            type="password"
            setState={setPassword}
            value={password}
          />
          <h1 className="text-sm text-greyPrimary text-left mx-1 mt-4">
            Don’t have an account? &nbsp;
            <span
              onClick={() => navigate("/register")}
              className="underline cursor-pointer font-normal text-bluePrimary font-semibold"
            >
              Sign up
            </span>
          </h1>
          <div className="flex flex-row items-start w-full">
            <div className="inline w-2/3 h-1"></div>
            <button
              type="submit"
              className="w-1/3 relative right-0 mb-4 text-white hover:text-bluePrimary hover:border-bluePrimary hover:border bg-bluePrimary hover:bg-white rounded-2xl h-10 mt-4"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
