import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginProps } from "./interface";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useDataSelector } from "reduxStore/store";
import { toast } from "react-toastify";
import { useAuth } from "hooks/api-hooks/useAuth";
import { setToken } from "reduxStore/features/AuthSlice";

const Login: React.FC<loginProps> = () => {
  const { token } = useDataSelector("auth");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (data: {}) => login(data),
    onSuccess: (data) => {
      dispatch(setToken({ token: data.data.result.access_token }));
      navigate("/");
    },

    onError: (error) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    },
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (data) => {
      loginMutation.mutate(data);
    },
  });

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="overflow-hidden border w-full min-h-screen bg-slate-50">
      <div className="h-screen w-full flex justify-center items-center">
        <Card color="white" className="px-8 py-8 w-[500px]" shadow={false}>
          <Typography
            className="flex gap-2 justify-center items-center pb-8 font-dosis"
            variant="h4"
            color="blue-gray"
          >
            <img src="vite.svg" alt="logo" className="h-6 w-6" /> Lokseva Gyaan
          </Typography>

          <div className="flex justify-between items-center my-10 gap-5">
            <Button
              variant="outlined"
              className="rounded-full w-full border-[#e5eaef] flex justify-center items-center gap-2 font-normal "
            >
              <FcGoogle className="text-xl" />
              <Typography variant="paragraph" className="!text-[12px]">
                Sign in with Google
              </Typography>
            </Button>

            <Button
              variant="outlined"
              className="rounded-full w-full border-[#e5eaef] flex justify-center items-center gap-2 font-normal "
            >
              <FaFacebook className="text-xl text-blue-500" />
              <Typography variant="small" className="!text-[12px]">
                Sign in with FB
              </Typography>
            </Button>
          </div>

          <div>
            <hr />
            <div className="flex justify-center items-center">
              <p className="bg-white -mt-3 px-2">or sign in with</p>
            </div>
          </div>
          <form className="mt-8 mb-2 w-full" onSubmit={formik.handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3 ">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                type="email"
                label="Email"
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email || ""}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />

              <Typography variant="h6" color="blue-gray" className="-mb-3 ">
                Your Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                variant="outlined"
                label="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="password"
                value={formik.values.password || ""}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center ">
                <Checkbox color="blue" defaultChecked />
                <Typography variant="paragraph">Remember me</Typography>
              </div>

              <div>
                <Typography
                  variant="paragraph"
                  color="blue"
                  className="font-semibold"
                >
                  Forget Password?
                </Typography>
              </div>
            </div>

            <Button
              className="mt-6  !rounded-full font-normal"
              color="blue"
              fullWidth
              type="submit"
            >
              Sing in
            </Button>

            <div className="flex justify-center items-center mt-8">
              <Typography variant="paragraph" color="gray">
                New to Lokseva?{" "}
                <span className="text-blue-600">
                  <Link to="/signup">Sign up</Link>
                </span>
              </Typography>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
