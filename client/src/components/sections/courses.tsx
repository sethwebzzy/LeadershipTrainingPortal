import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, UserCheck, MessageCircle, Users, HandHeart, Baby } from "lucide-react";

const courses = [
  {
    id: "hiv-counselling",
    title: "HIV (VCT) Counselling and Testing",
    type: "Short Course",
    description: "Professional training in HIV counselling and testing procedures, following national guidelines and best practices.",
    certification: "Certificate",
    icon: Heart,
  },
  {
    id: "adherence-counselling",
    title: "Adherence Counselling",
    type: "Certificate Course",
    description: "Specialized training in adherence counselling techniques for chronic disease management.",
    certification: "Certificate",
    icon: UserCheck,
  },
  {
    id: "diploma-counselling",
    title: "Diploma in Counselling",
    type: "Diploma Program",
    description: "Comprehensive counselling program covering theory, practice, and ethics in professional counselling.",
    certification: "Diploma",
    icon: MessageCircle,
  },
  {
    id: "primary-guidance",
    title: "Primary Guidance",
    type: "Certificate Course",
    description: "Training in primary school guidance and counselling techniques for educational settings.",
    certification: "Certificate",
    icon: Users,
  },
  {
    id: "sign-language",
    title: "Kenya Sign Language",
    type: "Certificate Course",
    description: "Professional training in Kenya Sign Language for inclusive communication and accessibility.",
    certification: "Certificate",
    icon: HandHeart,
  },
  {
    id: "ecde",
    title: "ECDE",
    type: "Certificate & Diploma",
    description: "Early Childhood Development and Education program for aspiring early childhood educators.",
    certification: "Certificate/Diploma",
    icon: Baby,
  },
];

export default function Courses() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-college-dark mb-4">Our Courses</h2>
          <p className="text-xl text-college-gray max-w-3xl mx-auto">
            Professional training programs designed to prepare you for success in health and wellness careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Card key={course.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <IconComponent className="text-college-green h-8 w-8 mr-3" />
                    <h3 className="text-xl font-semibold text-college-dark">{course.title}</h3>
                  </div>
                  <p className="text-college-gray">{course.type}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-college-gray mb-6">
                    {course.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-college-green">
                    {course.certification}
                  </Badge>
                  <Button 
                    onClick={() => scrollToSection("admissions")}
                    className="bg-college-green text-white hover:bg-green-600"
                    size="sm"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={() => scrollToSection("admissions")}
            className="bg-college-green text-white px-8 py-3 hover:bg-green-600 font-semibold"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
