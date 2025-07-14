import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/forms/contact-form";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-college-dark mb-4">Contact Us</h2>
          <p className="text-xl text-college-gray max-w-3xl mx-auto">
            Get in touch with us for more information about our courses and services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-college-dark mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-college-green h-6 w-6 mr-4" />
                  <div>
                    <h4 className="font-semibold text-college-dark">Phone Numbers</h4>
                    <p className="text-college-gray">0727 708 240 / 0732 522 089 / 0117 403 514</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-college-green h-6 w-6 mr-4" />
                  <div>
                    <h4 className="font-semibold text-college-dark">Email</h4>
                    <p className="text-college-gray">leadershipjoycepcentre@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-college-green h-6 w-6 mr-4" />
                  <div>
                    <h4 className="font-semibold text-college-dark">Location</h4>
                    <p className="text-college-gray">Kitengela, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-college-dark">WhatsApp Support</h4>
                    <p className="text-college-gray">Chat with us instantly</p>
                  </div>
                  <Button 
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => window.open("https://wa.me/254727708240", "_blank")}
                  >
                    <span className="mr-2">📱</span>
                    Chat Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-gray-200">
              <CardContent className="p-0">
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="text-college-green h-12 w-12 mx-auto mb-4" />
                    <p className="text-college-gray">Interactive Map - Kitengela Location</p>
                    <p className="text-sm text-college-gray mt-2">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8944144719!2d36.9469!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA1Nic0OC44IkU!5e0!3m2!1sen!2ske!4v1640995200000!5m2!1sen!2ske"
                        width="100%"
                        height="256"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Leadership JOYCEP Training College Location"
                      ></iframe>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
