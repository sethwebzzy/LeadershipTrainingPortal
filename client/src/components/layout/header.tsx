import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="text-college-green h-8 w-8 mr-3" />
              <span className="text-xl font-bold text-college-dark">Leadership JOYCEP</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-college-dark hover:text-college-green px-3 py-2 text-sm font-medium transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("courses")} className="text-college-dark hover:text-college-green px-3 py-2 text-sm font-medium transition-colors">
              Courses
            </button>
            <button onClick={() => scrollToSection("services")} className="text-college-dark hover:text-college-green px-3 py-2 text-sm font-medium transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("admissions")} className="text-college-dark hover:text-college-green px-3 py-2 text-sm font-medium transition-colors">
              Admissions
            </button>
            <button onClick={() => scrollToSection("about")} className="text-college-dark hover:text-college-green px-3 py-2 text-sm font-medium transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-college-dark hover:text-college-green px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={() => scrollToSection("admissions")} className="bg-college-green text-white hover:bg-green-600">
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-college-dark hover:text-college-green"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => scrollToSection("home")} className="block px-3 py-2 text-base font-medium text-college-dark hover:text-college-green w-full text-left">
              Home
            </button>
            <button onClick={() => scrollToSection("courses")} className="block px-3 py-2 text-base font-medium text-college-dark hover:text-college-green w-full text-left">
              Courses
            </button>
            <button onClick={() => scrollToSection("services")} className="block px-3 py-2 text-base font-medium text-college-dark hover:text-college-green w-full text-left">
              Services
            </button>
            <button onClick={() => scrollToSection("admissions")} className="block px-3 py-2 text-base font-medium text-college-dark hover:text-college-green w-full text-left">
              Admissions
            </button>
            <button onClick={() => scrollToSection("about")} className="block px-3 py-2 text-base font-medium text-college-dark hover:text-college-green w-full text-left">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="block px-3 py-2 text-base font-medium text-college-dark hover:text-college-green w-full text-left">
              Contact
            </button>
            <Button onClick={() => scrollToSection("admissions")} className="w-full mt-4 bg-college-green text-white hover:bg-green-600">
              Register Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
