import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Check, Home, Search, User, Video } from "lucide-react";

const HowItWorks = () => {
  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            How It Works
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Simple steps to connect with healthcare professionals
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>
            
            {/* Step 1 */}
            <div className="relative mb-20">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Create an Account</h3>
                  <p className="text-gray-600">
                    Sign up on our platform to get started. Creating an account allows you to request appointments and track your healthcare journey.
                  </p>
                </div>
                <div className="hidden md:flex md:w-1/12 justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg z-10">1</div>
                </div>
                <div className="mt-4 md:mt-0 md:w-5/12 md:pl-8">
                  <div className="border rounded-lg overflow-hidden shadow-sm p-6 bg-white">
                    <User className="h-10 w-10 text-primary mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Quick Registration</h4>
                    <p className="text-gray-500 text-sm">
                      Simple registration process that takes less than 5 minutes to complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative mb-20">
              <div className="md:flex items-center">
                <div className="md:w-5/12 md:pr-8">
                  <div className="border rounded-lg overflow-hidden shadow-sm p-6 bg-white">
                    <Calendar className="h-10 w-10 text-primary mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Request Appointment</h4>
                    <p className="text-gray-500 text-sm">
                      Fill out our comprehensive appointment request form with your details and medical needs.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/12 justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg z-10">2</div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Request an Appointment</h3>
                  <p className="text-gray-600">
                    Fill out the appointment request form with your medical needs, preferences, and personal details. Choose between home visit or telehealth options.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative mb-20">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Doctor Confirmation</h3>
                  <p className="text-gray-600">
                    A qualified healthcare professional will review your request and confirm the appointment. You'll receive a notification once confirmed.
                  </p>
                </div>
                <div className="hidden md:flex md:w-1/12 justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg z-10">3</div>
                </div>
                <div className="mt-4 md:mt-0 md:w-5/12 md:pl-8">
                  <div className="border rounded-lg overflow-hidden shadow-sm p-6 bg-white">
                    <Check className="h-10 w-10 text-primary mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Professional Matching</h4>
                    <p className="text-gray-500 text-sm">
                      We match you with the most appropriate healthcare provider based on your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <div className="md:flex items-center">
                <div className="md:w-5/12 md:pr-8">
                  <div className="border rounded-lg overflow-hidden shadow-sm p-6 bg-white">
                    <div className="flex space-x-4">
                      <Home className="h-10 w-10 text-primary" />
                      <Video className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2 mt-4">Receive Care</h4>
                    <p className="text-gray-500 text-sm">
                      Healthcare professional visits your home or connects via video call at the scheduled time.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/12 justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg z-10">4</div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Receive Care</h3>
                  <p className="text-gray-600">
                    Depending on your choice, a healthcare professional will either visit your home or connect with you via a secure video call at the scheduled time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-500">Common questions about our service</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How quickly can I get an appointment?</h3>
              <p className="text-gray-600">
                Appointment availability varies based on provider schedules and your location. Typically, we can arrange appointments within 24–48 hours of request approval.
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What areas do you serve?</h3>
              <p className="text-gray-600">
                We currently provide home visit services in major cities and surrounding areas. Telehealth services are available nationwide.
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I prepare for a telehealth appointment?</h3>
              <p className="text-gray-600">
                Ensure you have a stable internet connection, a device with a camera and microphone, and find a quiet, private space for your consultation.
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What if I need to cancel or reschedule?</h3>
              <p className="text-gray-600">
                You can cancel or reschedule through your account up to 4 hours before your appointment without any penalty.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
            Request an appointment now and experience our seamless healthcare service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/request-appointment">
              <Button size="lg">Request Appointment</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
