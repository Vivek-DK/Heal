import { useState } from "react";
import { Navigate } from "react-router-dom";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Check, Clock, Phone, Video, User } from "lucide-react";

// Telehealth specific data
const telehealthAppointments = [
  {
    id: 1,
    patientName: "Jennifer Adams",
    patientEmail: "jennifer.a@example.com",
    patientPhone: "(555) 123-7890",
    date: "2023-06-14",
    time: "10:00 AM",
    duration: "30 minutes",
    reason: "Follow-up on medication adjustment",
    status: "pending"
  },
  {
    id: 2,
    patientName: "David Martinez",
    patientEmail: "d.martinez@example.com",
    patientPhone: "(555) 987-6543",
    date: "2023-06-15",
    time: "2:30 PM",
    duration: "45 minutes",
    reason: "Chronic headache consultation",
    status: "confirmed"
  },
  {
    id: 3,
    patientName: "Lisa Wang",
    patientEmail: "lisa.wang@example.com",
    patientPhone: "(555) 456-7890",
    date: "2023-06-15",
    time: "4:15 PM",
    duration: "30 minutes",
    reason: "Skin condition assessment",
    status: "confirmed"
  },
  {
    id: 4,
    patientName: "James Wilson",
    patientEmail: "j.wilson@example.com",
    patientPhone: "(555) 234-5678",
    date: "2023-06-16",
    time: "11:00 AM",
    duration: "30 minutes",
    reason: "Anxiety symptoms discussion",
    status: "pending"
  },
  {
    id: 5,
    patientName: "Maria Rodriguez",
    patientEmail: "m.rodriguez@example.com",
    patientPhone: "(555) 765-4321",
    date: "2023-06-13",
    time: "9:45 AM",
    duration: "30 minutes",
    reason: "Prescription renewal",
    status: "completed"
  }
];

const DoctorTelehealth = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(telehealthAppointments);

  // Redirect if not logged in as doctor
  if (!user || user.role !== "doctor") {
    return <Navigate to="/doctor/login" replace />;
  }

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  const handleStartMeeting = (id) => {
    console.log(`Starting telehealth meeting for appointment ${id}`);
    setTimeout(() => {
      handleStatusChange(id, "completed");
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Telehealth</h1>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Telehealth Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Welcome back, {user?.name}! Here are your scheduled telehealth appointments.</p>
              <div className="grid gap-4">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white p-4 rounded-lg border shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            {appointment.patientName}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {appointment.patientEmail}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {appointment.patientPhone}
                          </div>
                          <div className="flex items-center mt-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            <Clock className="h-4 w-4 text-gray-400 ml-4 mr-2" />
                            <span>{appointment.time} ({appointment.duration})</span>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </div>
                        </div>
                        <Badge
                          className={
                            appointment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : appointment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2 justify-end">
                        {appointment.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(appointment.id, "confirmed")}
                          >
                            Confirm Appointment
                          </Button>
                        )}
                        {appointment.status === "confirmed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                            onClick={() => handleStartMeeting(appointment.id)}
                          >
                            <Video className="h-4 w-4 mr-1" /> Start Meeting
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Video className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No telehealth appointments</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You don't have any telehealth appointments scheduled.
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

export default DoctorTelehealth;
