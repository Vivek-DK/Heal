import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Home, Calendar, Video, Check } from "lucide-react";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import StatsCard from "@/components/doctor/StatsCard";
import AppointmentList from "@/components/doctor/AppointmentList";
import { useAuth } from "@/contexts/AuthContext";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    homeVisits: 0,
    telehealth: 0,
    completed: 0,
  });

  if (!user || user.role !== "doctor") {
    return <Navigate to="/doctor/login" replace />;
  }

  useEffect(() => {
    const fetchStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const appointments = [
        { type: "homeVisit", status: "completed" },
        { type: "homeVisit", status: "pending" },
        { type: "telehealth", status: "completed" },
        { type: "telehealth", status: "pending" },
        { type: "homeVisit", status: "completed" },
        { type: "telehealth", status: "completed" },
      ];

      const totalAppointments = appointments.length;
      const homeVisits = appointments.filter((a) => a.type === "homeVisit").length;
      const telehealth = appointments.filter((a) => a.type === "telehealth").length;
      const completed = appointments.filter((a) => a.status === "completed").length;

      setStats({
        totalAppointments,
        homeVisits,
        telehealth,
        completed,
      });
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      description: "This month",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      link: "/doctor/appointments",
    },
    {
      title: "Home Visits",
      value: stats.homeVisits,
      description: "This month",
      icon: <Home className="h-8 w-8 text-green-500" />,
      link: "/doctor/home-visits",
    },
    {
      title: "Telehealth",
      value: stats.telehealth,
      description: "This month",
      icon: <Video className="h-8 w-8 text-purple-500" />,
      link: "/doctor/telehealth",
    },
    {
      title: "Completed",
      value: stats.completed,
      description: "This month",
      icon: <Check className="h-8 w-8 text-green-500" />,
      link: "/doctor/appointments",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            {user && (
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, {user.name}
              </p>
            )}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => (
              <Link
                to={stat.link}
                key={index}
                className="block hover:opacity-90 transition-opacity"
              >
                <StatsCard
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  icon={stat.icon}
                />
              </Link>
            ))}
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <AppointmentList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
