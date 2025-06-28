import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Video, Search, RefreshCw, Check, Trash2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AppointmentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Jane Smith",
      patientEmail: "jane.smith@example.com",
      patientPhone: "(555) 123-4567",
      patientAddress: "123 Main St, City, State, 12345",
      appointmentType: "homeVisit",
      preferredDate: "2023-06-15",
      preferredTime: "morning",
      symptoms: "Fever and persistent cough for the last 3 days.",
      status: "pending",
      createdAt: "2023-06-10T15:34:20Z",
      medicalHistory: "Asthma, Hypertension",
      allergies: "Penicillin",
      currentMedications: "Albuterol, Lisinopril"
    },
    {
      id: 2,
      patientName: "John Doe",
      patientEmail: "john.doe@example.com",
      patientPhone: "(555) 987-6543",
      patientAddress: "456 Oak Ave, City, State, 12345",
      appointmentType: "telehealth",
      preferredDate: "2023-06-16",
      preferredTime: "afternoon",
      symptoms: "Mild headache and dizziness. Blood pressure concerns.",
      status: "pending",
      createdAt: "2023-06-11T09:15:43Z",
      medicalHistory: "Migraines, Anxiety",
      allergies: "None",
      currentMedications: "Sumatriptan, Lorazepam"
    },
    {
      id: 3,
      patientName: "Emily Johnson",
      patientEmail: "emily.j@example.com",
      patientPhone: "(555) 234-5678",
      patientAddress: "789 Pine St, City, State, 12345",
      appointmentType: "homeVisit",
      preferredDate: "2023-06-17",
      preferredTime: "evening",
      symptoms: "Difficulty breathing and chest pain.",
      status: "confirmed",
      createdAt: "2023-06-11T14:22:10Z",
      medicalHistory: "COPD, Heart Disease",
      allergies: "Sulfa drugs",
      currentMedications: "Albuterol, Atorvastatin"
    },
  ]);

  const handleConfirmAppointment = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "confirmed" }
          : appointment
      )
    );
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleRefresh = () => {
    // This would typically fetch the latest appointments from the server
    console.log("Refreshing appointment list...");
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setDetailsOpen(true);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Requests</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by patient name..."
              className="pl-9 w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No appointment requests found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                          <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                          <div className="text-sm text-gray-500">{appointment.patientPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {appointment.appointmentType === "homeVisit" ? (
                            <Badge variant="outline" className="flex gap-1 items-center">
                              <Home className="h-3 w-3" />
                              Home Visit
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex gap-1 items-center">
                              <Video className="h-3 w-3" />
                              Telehealth
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(appointment.preferredDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.preferredTime === "morning"
                            ? "Morning (8AM - 12PM)"
                            : appointment.preferredTime === "afternoon"
                            ? "Afternoon (12PM - 5PM)"
                            : "Evening (5PM - 9PM)"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3">
                          {appointment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={() => handleConfirmAppointment(appointment.id)}
                              >
                                <Check className="h-4 w-4" />
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                onClick={() => handleDeleteAppointment(appointment.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center"
                            onClick={() => handleViewDetails(appointment)}
                          >
                            View Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogDescription>
              Complete information about the patient and their appointment.
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Patient Information</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Name:</span> {selectedAppointment.patientName}</div>
                    <div><span className="font-medium">Email:</span> {selectedAppointment.patientEmail}</div>
                    <div><span className="font-medium">Phone:</span> {selectedAppointment.patientPhone}</div>
                    <div><span className="font-medium">Address:</span> {selectedAppointment.patientAddress}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Appointment Details</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Type:</span> {selectedAppointment.appointmentType === "homeVisit" ? "Home Visit" : "Telehealth"}</div>
                    <div><span className="font-medium">Date:</span> {new Date(selectedAppointment.preferredDate).toLocaleDateString()}</div>
                    <div><span className="font-medium">Time:</span> {
                      selectedAppointment.preferredTime === "morning"
                        ? "Morning (8AM - 12PM)"
                        : selectedAppointment.preferredTime === "afternoon"
                        ? "Afternoon (12PM - 5PM)"
                        : "Evening (5PM - 9PM)"
                    }</div>
                    <div><span className="font-medium">Status:</span> {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Medical Information</h3>
                <div className="space-y-2">
                  <div><span className="font-medium">Symptoms:</span> {selectedAppointment.symptoms}</div>
                  <div><span className="font-medium">Medical History:</span> {selectedAppointment.medicalHistory || "None provided"}</div>
                  <div><span className="font-medium">Allergies:</span> {selectedAppointment.allergies || "None provided"}</div>
                  <div><span className="font-medium">Current Medications:</span> {selectedAppointment.currentMedications || "None provided"}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
            {selectedAppointment?.status === "pending" && (
              <Button
                onClick={() => {
                  handleConfirmAppointment(selectedAppointment.id);
                  setDetailsOpen(false);
                }}
              >
                Confirm Appointment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentList;
