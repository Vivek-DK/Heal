import { useState } from "react";
import { Navigate } from "react-router-dom";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Home, MapPin, Phone, User } from "lucide-react";

const homeVisits = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    patientPhone: "(555) 234-5678",
    patientAddress: "123 Main Street, Apt 4B, Kodigehalli",
    date: "2023-06-15",
    time: "Morning (8AM - 12PM)",
    symptoms: "Persistent headache and fever for 3 days",
    status: "pending"
  },
  {
    id: 2,
    patientName: "Michael Brown",
    patientPhone: "(555) 876-5432",
    patientAddress: "456 Oak Avenue, House 7, Whitefield",
    date: "2023-06-16",
    time: "Afternoon (12PM - 5PM)",
    symptoms: "Lower back pain and difficulty walking",
    status: "confirmed"
  },
  {
    id: 3,
    patientName: "Emily Wilson",
    patientPhone: "(555) 345-6789",
    patientAddress: "789 Pine Road, Villa 12, HSR Layout",
    date: "2023-06-17",
    time: "Evening (5PM - 9PM)",
    symptoms: "Elderly patient with mobility issues and high blood pressure",
    status: "completed"
  },
  {
    id: 4,
    patientName: "Robert Davis",
    patientPhone: "(555) 432-1098",
    patientAddress: "101 Cedar Lane, Block 3, Sarjapur",
    date: "2023-06-18",
    time: "Morning (8AM - 12PM)",
    symptoms: "Post-surgery follow-up for knee replacement",
    status: "confirmed"
  }
];

const DoctorHomeVisits = () => {
  const { user } = useAuth();
  const [visits, setVisits] = useState(homeVisits);

  if (!user || user.role !== "doctor") {
    return <Navigate to="/doctor/login" replace />  ;
  }

  const handleStatusChange = (id, newStatus) => {
    setVisits(
      visits.map((visit) =>
        visit.id === id ? { ...visit, status: newStatus } : visit
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Home Visits</h1>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Home Visit Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Welcome back, {user?.name}! Here are your scheduled home visits.</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {visits.length > 0 ? (
                  visits.map((visit) => (
                    <div key={visit.id} className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="font-medium flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            {visit.patientName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {visit.patientPhone}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            {visit.patientAddress}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Date:</span> {new Date(visit.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Time:</span> {visit.time}
                          </div>
                          <div className="text-sm mt-2">
                            <span className="font-medium">Symptoms:</span> {visit.symptoms}
                          </div>
                        </div>
                        <Badge
                          className={
                            visit.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : visit.status === "confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : visit.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2 justify-end">
                        {visit.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(visit.id, "confirmed")}
                          >
                            Confirm Visit
                          </Button>
                        )}
                        {visit.status === "confirmed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(visit.id, "completed")}
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" /> Mark as Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 col-span-full">
                    <Home className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No home visits</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You don't have any home visit appointments scheduled.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DoctorHomeVisits;
