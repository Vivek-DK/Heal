
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  const navigate = useNavigate();
  
  const handleSignup = (values) => {
    console.log("Signup values:", values);
    navigate("/");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join HealthConnect to access personalized healthcare services
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SignupForm userType="patient" onSignup={handleSignup} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
