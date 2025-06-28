import Layout from "@/components/layout/Layout";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { useAuth } from "@/contexts/AuthContext";

const RequestAppointment = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Request an Appointment
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Fill out the form below and we'll connect you with a healthcare professional
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {user && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">What Happens Next?</h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                After you submit your appointment request
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-lg">
                    1
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Review</h3>
                <p className="mt-2 text-gray-500">
                  A healthcare professional reviews your request and medical details.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-lg">
                    2
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Confirmation</h3>
                <p className="mt-2 text-gray-500">
                  You receive a confirmation message with appointment details.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-lg">
                    3
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Care</h3>
                <p className="mt-2 text-gray-500">
                  A healthcare professional visits you or connects via telehealth at the scheduled time.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default RequestAppointment;
