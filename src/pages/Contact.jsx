import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Sending email to: dkvivek8@gmail.com and rakshithas.22is@saividya.ac.in");
    console.log("From:", email);
    console.log("Name:", name);
    console.log("Message:", message);
    
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Get in touch with our team for any questions, feedback or support
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a href="tel:+917348862962" className="text-sm text-gray-500 block">
                        +91 7348862962
                      </a>
                      <a href="tel:+916360354928" className="text-sm text-gray-500 block">
                        +91 6360354928
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a href="mailto:dkvivek8@gmail.com" className="text-sm text-gray-500 block">
                        dkvivek8@gmail.com
                      </a>
                      <a href="mailto:rakshithas.22is@saividya.ac.in" className="text-sm text-gray-500 block">
                        rakshithas.22is@saividya.ac.in
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <address className="not-italic text-sm text-gray-500">
                        6th cross, Vidya Nagar,<br />
                        Doddaballapur, Bengaluru Rural - 561203
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Working Hours</p>
                      <p className="text-sm text-gray-500">Monday - Friday: 9AM - 5PM</p>
                      <p className="text-sm text-gray-500">Saturday: 9AM - 1PM</p>
                      <p className="text-sm text-gray-500">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Your email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="How can we help you?" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        required 
                        className="min-h-[120px]" 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
              Find answers to commonly asked questions
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">How do I book a home visit?</h3>
              <p className="mt-2 text-gray-600">
                You can book a home visit by using our "Request Appointment" form and selecting the "Home Visit" option. Our team will review your request and get back to you to confirm the appointment.
              </p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">What areas do you service?</h3>
              <p className="mt-2 text-gray-600">
                We currently service multiple locations across Bangalore including Sarjapur, HSR Layout, Kormangala, Whitefield, and many more. You can check the full list in our "Find Hospitals" section.
              </p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">How does telehealth work?</h3>
              <p className="mt-2 text-gray-600">
                Telehealth allows you to consult with a doctor through video call. Once your appointment is confirmed, you'll receive a link to join the video call at the scheduled time from your computer or mobile device.
              </p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">What insurance do you accept?</h3>
              <p className="mt-2 text-gray-600">
                We accept a wide range of insurance providers. Please contact our support team with your insurance details to verify coverage for our services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
