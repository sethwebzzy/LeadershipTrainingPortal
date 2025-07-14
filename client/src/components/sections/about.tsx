import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";

const features = [
  "Professional Training",
  "Monthly Intakes",
  "Qualified Instructors",
  "Industry Recognition",
];

const highlights = [
  {
    title: "Experienced Faculty",
    description: "Learn from qualified professionals with years of industry experience",
  },
  {
    title: "Flexible Schedule",
    description: "Monthly intakes allow you to start your education when convenient",
  },
  {
    title: "Practical Training",
    description: "Hands-on experience and real-world application of skills",
  },
  {
    title: "Career Support",
    description: "Guidance and support for career development and job placement",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-college-dark mb-4">About Us</h2>
          <p className="text-xl text-college-gray max-w-3xl mx-auto">
            Leading health and wellness education institution in Kitengela, Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-college-dark mb-6">Our Mission</h3>
            <p className="text-college-gray mb-6">
              Leadership JOYCEP Training College is dedicated to providing high-quality health and wellness education that empowers individuals to make a positive impact in their communities. We focus on practical training and professional development in counselling, early childhood education, and specialized health services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-college-green h-5 w-5 mr-3" />
                  <span className="text-college-dark">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-college-dark">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <Star className="text-college-green h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-college-dark">{highlight.title}</h4>
                      <p className="text-college-gray text-sm">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
