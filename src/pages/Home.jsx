import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ServiceCards from "@/components/home/ServiceCards";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <ServiceCards />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose HealthConnect
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We're committed to making healthcare accessible for everyone
            </p>
          </div>
          
          <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Qualified Professionals</h3>
              <p className="mt-2 text-gray-500">
                Our network consists of licensed and experienced healthcare professionals.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Convenient Access</h3>
              <p className="mt-2 text-gray-500">
                Access healthcare services from anywhere - your home, office, or while traveling.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Patient-Centered Care</h3>
              <p className="mt-2 text-gray-500">
                We focus on your needs and preferences to provide personalized care.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Secure Platform</h3>
              <p className="mt-2 text-gray-500">
                Your health information is protected with industry-standard security measures.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Affordable Options</h3>
              <p className="mt-2 text-gray-500">
                We offer competitive pricing and work with various insurance providers.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-gray-500">
                Our customer support team is available round-the-clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-white/90 mx-auto">
            Request an appointment today and experience healthcare on your terms.
          </p>
          <div className="mt-8">
            <a
              href="/request-appointment"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
            >
              Request Appointment
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Home;
