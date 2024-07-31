import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

interface LoginFormInputs {
  email: string;
  password: string;
}

const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/login",
        data
      );

      if (response.data.success) {
        const { user, token } = response.data;
        setLoginError(null);
        dispatch(
          login({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token, // Add token to user state
          })
        );
        localStorage.setItem("authToken", token);
        navigate("/");
        toast.success("Login Successfully");
      } else {
        setLoginError(
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      setLoginError("An error occurred during login");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loginError,
  };
};

export default useLogin;
