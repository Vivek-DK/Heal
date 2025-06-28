import { useState } from "react";
import { Navigate } from "react-router-dom";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import AppointmentList from "@/components/doctor/AppointmentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const DoctorAppointments = () => {
  const { user } = useAuth();

  // Redirect if not logged in as doctor
  if (!user || user.role !== "doctor") {
    return <Navigate to="/doctor/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">All Appointments</h1>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Welcome back, {user?.name}! Here are all your scheduled appointments.</p>
              <AppointmentList />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;
