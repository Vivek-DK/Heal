import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-10 px-4 sm:px-6 lg:px-8">
            <div className="text-left">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Healthcare at your</span>{" "}
                <span className="block text-primary">doorstep</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Connect with doctors for home visits or telehealth consultations.
                We bring quality healthcare to you when you can&apos;t make it to the hospital.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/request-appointment">
                    <Button size="lg" className="w-full" aria-label="Request an appointment">
                      Request Appointment
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/how-it-works">
                    <Button variant="outline" size="lg" className="w-full" aria-label="Learn how it works">
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-8 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.indianexpress.com/2023/06/Dil-LEAD.jpg"
          alt="Healthcare professional with patient"
        />
      </div>
    </div>
  );
};

export default Hero;
