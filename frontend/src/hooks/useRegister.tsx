import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { login } from "../redux/slices/userSlice";
import registerSchema from "../utils/ValidatioSchema/ValidationSchema";
import { RegisterFormInputs } from "../utils/interface/types";
import { ErrorCallback } from "typescript";
import { toast } from "react-toastify";

interface UseRegisterReturn extends UseFormReturn<RegisterFormInputs> {
  onSubmit: (data: RegisterFormInputs) => void;
  registrationError: string | null;
}

const useRegister = (): UseRegisterReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, formState } = methods;
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/register",
        data
      );
     if (res.data.success) {
       const { user, token } = res.data; 
      //  dispatch(
      //    login({
      //      id: user._id,
      //      name: user.name,
      //      email: user.email,
      //      phone: user.phone,
      //      token, // Include token here
      //    })
      //  );

       setRegistrationError(null);
       navigate("/login");
       toast.success("Successfully Registerd");
     } else {
       setRegistrationError(res.data.message);
     }
    } catch (error) {
      console.error(error);
      setRegistrationError("Failed to register. Please try again.");
    }
  };

  return {
    ...methods,
    handleSubmit,
    onSubmit,
    formState,
    registrationError,
  };
};

export default useRegister;
