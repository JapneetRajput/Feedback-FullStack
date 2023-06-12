import React, { useState } from "react";
import logo from "../assets/logoMusicart.png";
import TextBox from "../components/TextBox";
import "../styles/login.css";
import Loader from "../components/Loader";
import { registerUser } from "../api/service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Init states
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    // Activate the loader
    setLoader(true);
    // Create a new user
    if (name !== "" && mobileNumber !== "" && email !== "" && password !== "") {
      if (password !== confirmPassword) {
        setLoader(false);
        alert("Passwords do not match");
      } else {
        setLoader(false);
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
      setLoader(false);
      alert("All fields are mandatory!");
    }
  };

  return (
    <div className="h-screen bg-bluePrimary">
      {loader && (
        <div className="z-10 absolute flex flex-row items-center justify-center h-full w-full">
          <Loader />
        </div>
      )}
      <div className="flex flex-col items-center">
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
          onSubmit={register}
          className="p-6 px-10 bg-white flex flex-col items-start border mt-12 md:mt-8 border-[#D9D9D9] border-3px w-5/6 sm:w-1/2 lg:w-1/3 rounded-xl"
        >
          <TextBox
            textInput="text-md text-bluePrimary"
            textLabel="text-md text-bluePrimary"
            width="w-full"
            height="h-12"
            hint="Name"
            backgroundColor="bg-white"
            position="left-2 sm:left-3 top-2.5"
            border="border-gray border-2"
            span="px-1"
            input="px-3 sm:px-4"
            div="mt-8"
            type="text"
            setState={setName}
            value={name}
          />
          <TextBox
            textInput="text-md text-bluePrimary"
            textLabel="text-md text-bluePrimary"
            width="w-full"
            height="h-12"
            hint="Mobile Number"
            backgroundColor="bg-white"
            position="left-2 sm:left-3 top-2.5"
            border="border-gray border-2"
            span="px-1"
            input="px-3 sm:px-4"
            div="mt-6"
            type="text"
            setState={setMobileNumber}
            value={mobileNumber}
          />
          <TextBox
            textInput="text-md text-bluePrimary"
            textLabel="text-md text-bluePrimary"
            width="w-full"
            height="h-12"
            hint="Email ID"
            backgroundColor="bg-white"
            position="left-2 sm:left-3 top-2.5"
            border="border-gray border-2"
            span="px-1"
            input="px-3 sm:px-4"
            div="mt-6"
            type="email"
            setState={setEmail}
            value={email}
          />
          <TextBox
            textInput="text-md text-bluePrimary"
            textLabel="text-md text-bluePrimary"
            width="w-full"
            height="h-12"
            hint="Password"
            backgroundColor="bg-white"
            position="left-2 sm:left-3 top-2.5"
            border="border-gray border-2"
            span="px-1"
            input="px-3 sm:px-4"
            div="mt-6"
            type="password"
            setState={setPassword}
            value={password}
          />
          <TextBox
            textInput="text-md text-bluePrimary"
            textLabel="text-md text-bluePrimary"
            width="w-full"
            height="h-12"
            hint="Confirm Password"
            backgroundColor="bg-white"
            position="left-2 sm:left-3 top-2.5"
            border="border-gray border-2"
            span="px-1"
            input="px-3 sm:px-4"
            div="mt-6"
            type="password"
            setState={setConfirmPassword}
            value={confirmPassword}
          />
          <h1 className="text-sm text-greyPrimary text-left mx-1 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="underline cursor-pointer text-bluePrimary font-semibold"
            >
              Login
            </span>
          </h1>
          <div className="flex flex-row items-start w-full">
            <div className="inline w-2/3 h-1"></div>
            <button
              type="submit"
              className="w-1/3 relative right-0 mb-4 text-white hover:text-bluePrimary hover:border-bluePrimary hover:border bg-bluePrimary hover:bg-white rounded-2xl h-10 mt-4"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
