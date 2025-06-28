import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Phone, Clock, Hospital, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { getLocations, getHospitalsByLocation } from "@/data/hospitals";

const FindHospitals = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  const locations = getLocations();
  const hospitals = selectedLocation ? getHospitalsByLocation(selectedLocation) : [];
  
  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestAppointment = (hospital) => {
    localStorage.setItem("selectedHospital", JSON.stringify(hospital));
    navigate("/request-appointment");
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Find Hospitals
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Locate hospitals and medical centers in your area that offer home visit and telehealth services
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Hospitals</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <Select onValueChange={setSelectedLocation} value={selectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search hospitals by name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {selectedLocation ? (
              filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital, idx) => (
                  <Card key={`${hospital.name}-${idx}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            <Hospital className="h-5 w-5 text-primary mr-2" />
                            {hospital.name}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                            {hospital.location} · <span className="text-green-600 font-medium ml-1">{hospital.distance}</span>
                          </CardDescription>
                          <div className="flex items-center mt-2">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(hospital.rating) 
                                    ? "text-yellow-400 fill-yellow-400" 
                                    : "text-gray-300"
                                }`} 
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">{hospital.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center justify-between w-full">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedHospital(hospital)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Hospital className="h-5 w-5 text-primary mr-2" />
                                {selectedHospital?.name}
                              </DialogTitle>
                              <DialogDescription>
                                Hospital details and information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-medium">Location</h3>
                                <p className="text-sm flex items-center mt-1">
                                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                  {selectedHospital?.address}
                                </p>
                                <p className="text-sm text-green-600 mt-1">
                                  {selectedHospital?.distance} from your location
                                </p>
                              </div>
                              
                              <div>
                                <h3 className="font-medium">Rating</h3>
                                <div className="flex items-center mt-1">
                                  {Array(5).fill(0).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < Math.floor(selectedHospital?.rating || 0) 
                                          ? "text-yellow-400 fill-yellow-400" 
                                          : "text-gray-300"
                                      }`} 
                                    />
                                  ))}
                                  <span className="ml-2 text-sm">{selectedHospital?.rating}/5</span>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-medium">About</h3>
                                <p className="text-sm mt-1">
                                  <q className="italic text-gray-600">{selectedHospital?.quote}</q>
                                </p>
                              </div>
                              
                              <div className="flex justify-end gap-2 pt-4">
                                <DialogClose asChild>
                                  <Button variant="outline">Close</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button onClick={() => handleRequestAppointment(selectedHospital)}>
                                    Request Appointment
                                  </Button>
                                </DialogClose>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" onClick={() => handleRequestAppointment(hospital)}>
                          Request Appointment
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No hospitals found matching your search criteria.</p>
                  <Button className="mt-4" onClick={() => setSearchQuery("")}>Clear Search</Button>
                </div>
              )
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Please select a location to see available hospitals.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FindHospitals;
