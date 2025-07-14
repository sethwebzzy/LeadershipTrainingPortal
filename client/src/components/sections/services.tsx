import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, TestTube, Gamepad2, HeartHandshake, GraduationCap } from "lucide-react";

const services = [
  {
    title: "Psychological Counselling",
    description: "Professional psychological support and counselling services for individuals and families.",
    icon: Brain,
  },
  {
    title: "Family & Marriage Therapy",
    description: "Specialized therapy services for couples and families to strengthen relationships.",
    icon: Heart,
  },
  {
    title: "HIV Counselling & Testing",
    description: "Professional HIV counselling and testing services with confidential support.",
    icon: TestTube,
  },
  {
    title: "Adolescent Play Therapy",
    description: "Specialized play therapy services designed for adolescents and young people.",
    icon: Gamepad2,
  },
  {
    title: "Grief & Trauma Counselling",
    description: "Professional support for individuals dealing with grief, trauma, and loss.",
    icon: HeartHandshake,
  },
  {
    title: "Student Counselling",
    description: "Academic and personal counselling services for students at all levels.",
    icon: GraduationCap,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-college-dark mb-4">Our Services</h2>
          <p className="text-xl text-college-gray max-w-3xl mx-auto">
            Professional health and wellness services provided by our qualified practitioners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <IconComponent className="text-college-green h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-college-dark mb-3">{service.title}</h3>
                    <p className="text-college-gray">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
