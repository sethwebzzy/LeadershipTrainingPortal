import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RegistrationForm from "@/components/forms/registration-form";

export default function Admissions() {
  return (
    <section id="admissions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-college-dark mb-4">Admissions</h2>
          <p className="text-xl text-college-gray max-w-3xl mx-auto">
            Join our monthly intake program and start your journey in health and wellness education
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Registration Steps */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-college-dark">Registration Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Badge className="bg-college-green text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold text-college-dark">Choose Your Course</h4>
                    <p className="text-college-gray">Select from our range of professional training programs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Badge className="bg-college-green text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold text-college-dark">Submit Application</h4>
                    <p className="text-college-gray">Complete the registration form with required documents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Badge className="bg-college-green text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold text-college-dark">Make Payment</h4>
                    <p className="text-college-gray">Pay via MPESA using our paybill number</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Badge className="bg-college-green text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold text-college-dark">Confirm Registration</h4>
                    <p className="text-college-gray">Receive confirmation and join the monthly intake</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="bg-college-green text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">MPESA Payment Details</h4>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Paybill Number:</span>
                      <span className="font-semibold">544069</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Account Number:</span>
                      <span className="font-semibold">831298 (Joyce)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Monthly Intake Schedule</h4>
                  <p className="text-white text-opacity-90">
                    New intakes start every month. Register early to secure your spot in the next available intake.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <div className="mt-16">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
