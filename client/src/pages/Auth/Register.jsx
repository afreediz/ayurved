import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../context/user";
import API from "../../services/api";
import { Mail, Lock, User, ArrowRight, Home } from "lucide-react";

const Register = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return navigate("/");
  }

  const onchange = (e) => {
    const { name, value } = e.target;
    setData((old_data) => {
      return {
        ...old_data,
        [name]: value,
      };
    });
  };

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("auth/register", { ...data });
      toast.success(
        "Verification link has been sent to your email, Please verify your email",
        {
          autoClose: 10000,
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Registration Form */}
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="w-full max-w-md">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center mb-4">
              <img src="/images/logo.jpeg" alt="Logo" className="h-14" />
              <img src="/images/name.jpeg" alt="Brand Name" className="h-14" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join us for premium A2A2 dairy products
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={register} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  minLength={3}
                  value={data.name}
                  onChange={onchange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={data.email}
                  onChange={onchange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  value={data.password}
                  onChange={onchange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="Password (min 8 characters)"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Product Showcase */}
      <div
        style={{
          backgroundImage: `url('/images/all-products.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden"
      >
        {/* <div className='absolute inset-0 bg-black opacity-20'></div> */}
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-500 rounded-full opacity-20 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
