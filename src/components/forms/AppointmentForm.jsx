  import { useState, useEffect } from "react";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Button } from "@/components/ui/button";
  import { useAuth } from "@/contexts/AuthContext";
  import { useNavigate } from "react-router-dom";
  import { format } from "date-fns";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Home, Video, Calendar as CalendarIcon } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { getLocations, getHospitalsByLocation } from "@/data/hospitals";

  const appointmentFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
    appointmentType: z.enum(["homeVisit", "telehealth"]),
    preferredLocation: z.string({ required_error: "Please select a location" }),
    preferredHospital: z.string({ required_error: "Please select a hospital" }),
    preferredDate: z.date({ required_error: "Please select a date" }),
    preferredTime: z.string(),
    symptoms: z.string().min(10, { message: "Please describe your symptoms in at least 10 characters." }),
    additionalNotes: z.string().optional(),
  });

  const AppointmentForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    const form = useForm({
      resolver: zodResolver(appointmentFormSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        address: "",
        appointmentType: "homeVisit",
        preferredTime: "",
        symptoms: "",
        additionalNotes: "",
      },
    });

    useEffect(() => {
      const selectedHospitalData = localStorage.getItem("selectedHospital");
      if (selectedHospitalData) {
        try {
          const hospital = JSON.parse(selectedHospitalData);
          const locationName = hospital.location.toLowerCase();
          const formattedLocation = locationName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          form.setValue("preferredLocation", formattedLocation);
          setSelectedLocation(formattedLocation);
          form.setValue("preferredHospital", hospital.name);
          localStorage.removeItem("selectedHospital");
        } catch (error) {
          console.error("Error parsing selected hospital:", error);
        }
      }
    }, [form]);

    const locations = getLocations();
    const hospitals = selectedLocation ? getHospitalsByLocation(selectedLocation) : [];
    const today = new Date();

    function onSubmit(values) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log(values);
        setIsSubmitting(false);
        setIsSuccess(true);
        form.reset();
      }, 1500);
    }

    if (isSuccess) {
      return (
        <div className="rounded-lg bg-green-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-medium text-gray-900">Appointment Request Submitted!</h3>
          <p className="mt-2 text-gray-600">
            Thank you for submitting your appointment request. A healthcare provider will review your
            request and you'll receive a confirmation soon.
          </p>
          <div className="mt-6">
            <Button onClick={() => setIsSuccess(false)} variant="outline">
              Make Another Request
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {!user ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-center space-x-2 text-sm text-blue-800">
            <p>
              Please login before requesting an appointment.
              <span
                onClick={() => navigate("/login")}
                className="ml-2 text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
              >
                Login Page
              </span>
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City, State, 12345" {...field} />
                      </FormControl>
                      <FormDescription>
                        Required for home visits and to match you with nearby providers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="preferredLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Location</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedLocation(value);
                          form.setValue('preferredHospital', '');
                        }} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferredHospital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Hospital</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a hospital" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hospitals.map((hospital) => (
                            <SelectItem key={hospital.name} value={hospital.name}>
                              {hospital.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            // Disable dates in the past (before today)
                            date < new Date(today.setHours(0, 0, 0, 0))
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="appointmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="homeVisit" className="sr-only" />
                            </FormControl>
                            <div className="flex items-center space-x-3 rounded-md border-2 border-muted p-4 cursor-pointer hover:border-gray-300">
                              <Home className="h-5 w-5 text-primary" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Home Visit</p>
                                <p className="text-sm text-muted-foreground">
                                  Doctor visits you at your home
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="telehealth" className="sr-only" />
                            </FormControl>
                            <div className="flex items-center space-x-3 rounded-md border-2 border-muted p-4 cursor-pointer hover:border-gray-300">
                              <Video className="h-5 w-5 text-primary" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Telehealth</p>
                                <p className="text-sm text-muted-foreground">
                                  Video consultation with a doctor
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your symptoms or reason for the appointment"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional information you'd like to share (optional)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Appointment Request"}
            </Button>
            </form>
          </Form>
        )}
      </div>
    );
  };

  export default AppointmentForm;
