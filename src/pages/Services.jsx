import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Hospital,
  User,
  Calendar,
  Video,
  Home,
  Check,
} from "lucide-react";

const Services = () => {
  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Comprehensive healthcare services that come to you
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Home Visits */}
            <div>
              <div className="flex items-center mb-6">
                <Home className="h-10 w-10 text-primary" />
                <h2 className="ml-4 text-3xl font-bold text-gray-900">
                  Home Visits
                </h2>
              </div>
              <p className="text-lg text-gray-500 mb-8">
                When you're not feeling well enough to travel, our healthcare
                professionals come to you. We provide comprehensive medical
                care in the comfort of your home.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                What's included:
              </h3>
              <ul className="space-y-3">
                {[
                  "Physical examinations",
                  "Vital sign monitoring",
                  "Wound care and dressing changes",
                  "Medication administration",
                  "Lab sample collection",
                  "Medical equipment setup and training",
                  "Health education and support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Telehealth */}
            <div>
              <div className="flex items-center mb-6">
                <Video className="h-10 w-10 text-primary" />
                <h2 className="ml-4 text-3xl font-bold text-gray-900">
                  Telehealth Consultations
                </h2>
              </div>
              <p className="text-lg text-gray-500 mb-8">
                Connect with healthcare providers remotely via secure video
                calls. Perfect for consultations, follow-ups, and
                non-emergency medical advice.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                What's included:
              </h3>
              <ul className="space-y-3">
                {[
                  "Secure video consultations",
                  "Medical assessments and diagnoses",
                  "Prescription management",
                  "Specialist referrals",
                  "Follow-up appointments",
                  "Mental health support",
                  "Digital health records access",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  Chronic Disease Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ongoing support and care for patients managing long-term
                  health conditions like diabetes, hypertension, or COPD.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hospital className="h-5 w-5 text-primary mr-2" />
                  Post-Hospital Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Transitional care services for patients recently discharged
                  from hospital to ensure proper recovery.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 text-primary mr-2" />
                  Elderly Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Specialized healthcare services tailored to the unique needs
                  of elderly patients.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
            Request an appointment today and let us bring quality healthcare to
            you.
          </p>
          <a
            href="/request-appointment"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Request Appointment
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
