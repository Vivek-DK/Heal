import { Calendar, Home, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceCards = () => {
  const services = [
    {
      title: "Home Visits",
      description: "Get medical care in the comfort of your home with our qualified healthcare professionals.",
      icon: <Home className="h-6 w-6 text-primary" />,
    },
    {
      title: "Telehealth Consultations",
      description: "Connect with doctors remotely via video calls for consultations and follow-ups.",
      icon: <Video className="h-6 w-6 text-primary" />,
    },
    {
      title: "Flexible Scheduling",
      description: "Book appointments at your convenience, including evenings and weekends.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            We bring healthcare to you through multiple service options
          </p>
        </div>

        <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
