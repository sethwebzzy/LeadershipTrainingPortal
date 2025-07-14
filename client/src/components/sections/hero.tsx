import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-r from-college-green to-green-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Leadership JOYCEP Training College
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Empowering Health & Wellness Professionals in Kitengela, Kenya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection("admissions")}
              className="bg-white text-college-green px-8 py-3 font-semibold hover:bg-gray-100"
            >
              Register for Monthly Intake
            </Button>
            <Button 
              onClick={() => scrollToSection("courses")}
              variant="outline"
              className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-college-green"
            >
              View Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
