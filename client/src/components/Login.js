import React, { useEffect, useState } from "react";
// import logo from "../assets/logoMusicart.png";
import TextBox from "../components/TextBox";
import "../styles/login.css";
import { loginUser, registerUser } from "../api/service";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/UserContext";

const Login = ({setIsUserLoggedIn}) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [loginBool, setLoginBool] = useState(true);
  const navigate = useNavigate();
  const { setUserAuth } = React.useContext(AuthContext);
  const login = async (event) => {
    event.preventDefault();
    // Activate the loader
    // Create a new user
    if (emailLogin !== "" && passwordLogin !== "") {
      const user = {
        email: emailLogin,
        password: passwordLogin,
      };
      setEmailLogin("");
      setPasswordLogin("");
      await loginUser(user)
        .then((req, res) => {
          const { status, message } = req.data;
          if (status === "failed") {
            alert(message);
          } else {
            localStorage.setItem("token", req.data.token);
            setUserAuth(true);
            setIsUserLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("All fields are mandatory!");
    }
  };
  const register = (event) => {
    event.preventDefault();
    // Activate the loader
    // Create a new user
    if (name !== "" && mobileNumber !== "" && email !== "" && password !== "") {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
      } else {
        const user = {
          name: name,
          mobile: Number(mobileNumber),
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
        setName("");
        setEmail("");
        setMobileNumber("");
        setPassword("");
        setConfirmPassword("");
        registerUser(user)
          .then((req, res) => {
            // navigate("/");
            console.log(req.data);
            const { status, message } = req.data;
            console.log(status, message);
            if (status === "failed") {
              alert(message);
            } else {
              // alert(message);
              navigate("/");
            }
          })
          .catch((error) => {
            alert("Error in creating user " + error.message);
          });
      }
    } else {
      alert("All fields are mandatory!");
    }
  };

  return (
    <div className="flex flex-col items-start mx-16">
      {loginBool ? (
        <>
          <p className="sm:mt-8 mt-6 sm:text-2xl text-lg font-bold text-bluePrimary">
            Signup to continue
          </p>
          <form
            onSubmit={register}
            className=" bg-white flex flex-col items-start sm:mt-6 mt-2 md:mt-4 w-full"
          >
            <TextBox
              textInput="text-md text-bluePrimary"
              textLabel="text-md text-bluePrimary"
              width="w-full"
              height="sm:h-12 h-10"
              hint="Name"
              backgroundColor="bg-white"
              position="left-2 sm:left-3 sm:top-2.5 top-1.5"
              border="border-gray border-2"
              span="px-1"
              input="px-3 sm:px-4"
              div="mt-4"
              type="text"
              setState={setName}
              value={name}
            />
            <TextBox
              textInput="text-md text-bluePrimary"
              textLabel="text-md text-bluePrimary"
              width="w-full"
              height="sm:h-12 h-10"
              hint="Mobile Number"
              backgroundColor="bg-white"
              position="left-2 sm:left-3 sm:top-2.5 top-1.5"
              border="border-gray border-2"
              span="px-1"
              input="px-3 sm:px-4"
              div="mt-4"
              type="text"
              setState={setMobileNumber}
              value={mobileNumber}
            />
            <TextBox
              textInput="text-md text-bluePrimary"
              textLabel="text-md text-bluePrimary"
              width="w-full"
              height="sm:h-12 h-10"
              hint="Email ID"
              backgroundColor="bg-white"
              position="left-2 sm:left-3 sm:top-2.5 top-1.5"
              border="border-gray border-2"
              span="px-1"
              input="px-3 sm:px-4"
              div="mt-4"
              type="email"
              setState={setEmail}
              value={email}
            />
            <TextBox
              textInput="text-md text-bluePrimary"
              textLabel="text-md text-bluePrimary"
              width="w-full"
              height="sm:h-12 h-10"
              hint="Password"
              backgroundColor="bg-white"
              position="left-2 sm:left-3 sm:top-2.5 top-1.5"
              border="border-gray border-2"
              span="px-1"
              input="px-3 sm:px-4"
              div="mt-4"
              type="password"
              setState={setPassword}
              value={password}
            />
            <TextBox
              textInput="text-md text-bluePrimary"
              textLabel="text-md text-bluePrimary"
              width="w-full"
              height="sm:h-12 h-10"
              hint="Confirm Password"
              backgroundColor="bg-white"
              position="left-2 sm:left-3 sm:top-2.5 top-1.5"
              border="border-gray border-2"
              span="px-1"
              input="px-3 sm:px-4"
              div="mt-4"
              type="password"
              setState={setConfirmPassword}
              value={confirmPassword}
            />
            <h1 className="text-sm text-greyPrimary text-left mx-1 mt-4">
              Already have an account? &nbsp;
              <span
                onClick={() => setLoginBool(!loginBool)}
                className="underline cursor-pointer text-bluePrimary font-semibold"
              >
                Login
              </span>
            </h1>
            <div className="flex flex-row items-start w-full">
              <button
                type="submit"
                className="w-1/3 relative right-0 mb-4 text-white hover:text-bluePrimary hover:border-bluePrimary hover:border bg-bluePrimary hover:bg-white rounded-2xl h-10 mt-4"
              >
                Signup
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <p className="mt-16 text-2xl font-bold text-bluePrimary">
            Login to continue
          </p>
          <form
            onSubmit={login}
            className=" bg-white flex flex-col items-start mt-12 md:mt-4 w-full"
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
              setState={setEmailLogin}
              value={emailLogin}
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
              setState={setPasswordLogin}
              value={passwordLogin}
            />
            <h1 className="text-sm text-greyPrimary text-left mx-1 mt-4">
              Don’t have an account? &nbsp;
              <span
                onClick={() => setLoginBool(!loginBool)}
                className="underline cursor-pointer text-bluePrimary font-semibold"
              >
                Sign up
              </span>
            </h1>
            <div className="flex flex-row items-start w-full">
              <button
                type="submit"
                className="w-1/3 relative right-0 mb-4 text-white hover:text-bluePrimary hover:border-bluePrimary hover:border bg-bluePrimary hover:bg-white rounded-2xl h-10 mt-4"
              >
                Login
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
