import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("healthconnect_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUserProfile = (data) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("healthconnect_user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully");
  };

  const signup = async (name, email, password, role) => {
    setIsLoading(true);

    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      const existingUsers = JSON.parse(localStorage.getItem("healthconnect_users") || "[]");

      if (existingUsers.some((u) => u.email === email)) {
        throw new Error("Email already registered");
      }

      const newUser = {
        id: role === "doctor" ? `d-${Date.now()}` : `p-${Date.now()}`,
        email,
        name,
        role,
        password
      };

      existingUsers.push(newUser);
      localStorage.setItem("healthconnect_users", JSON.stringify(existingUsers));

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message || "Signup failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password, role) => {
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const existingUsers = JSON.parse(localStorage.getItem("healthconnect_users") || "[]");
      const foundUser = existingUsers.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("healthconnect_user", JSON.stringify(userWithoutPassword));
        toast.success("Login successful");
        return;
      }

      if (role === "doctor" && email === "doctor@example.com" && password === "password") {
        const doctorUser = {
          id: "d-1",
          email,
          name: "Dr. Vivek DK",
          role: "doctor"
        };
        setUser(doctorUser);
        localStorage.setItem("healthconnect_user", JSON.stringify(doctorUser));
        toast.success("Login successful");
        navigate("/doctor/dashboard");
        return;
      }

      if (role === "patient" && email.includes("@") && password.length >= 6) {
        const patientUser = {
          id: "p-" + Math.floor(Math.random() * 1000),
          email,
          name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
          role: "patient"
        };
        setUser(patientUser);
        localStorage.setItem("healthconnect_user", JSON.stringify(patientUser));
        toast.success("Login successful");
        navigate("/");
        return;
      }

      throw new Error("Invalid email or password");
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("healthconnect_user");
    toast.info("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
