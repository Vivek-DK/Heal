import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";

const DoctorLogin = () => {
  const { login, signup } = useAuth();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await login(values.email, values.password, "doctor");
      navigate("/doctor/dashboard");
    } catch (error) {
      setError(error.message || "Login failed");
    }
  };

  const handleSignup = async (values) => {
    try {
      await signup(values.name, values.email, values.password, "doctor");
      setError("Account created successfully. Please log in.");
      setIsLogin(true);
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary/70 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-white text-3xl font-bold text-center">HealthConnect</h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">Doctor Portal</h2>
          <p className="mt-2 text-center text-sm text-white/90">
            {isLogin ? "Sign in to access your dashboard" : "Create your doctor account"}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div
                className={`mb-4 ${
                  error.includes("successfully")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                } p-3 rounded-md text-sm`}
              >
                {error}
              </div>
            )}

            {isLogin ? (
              <>
                <LoginForm userType="doctor" onLogin={handleLogin} />
                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-500">Don't have an account?</span>{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            ) : (
              <>
                <SignupForm userType="doctor" onSignup={handleSignup} />
                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-500">Already have an account?</span>{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    Log in
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
