import { GraduationCap } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-college-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="text-college-green h-8 w-8 mr-3" />
              <span className="text-xl font-bold">Leadership JOYCEP</span>
            </div>
            <p className="text-gray-300">
              Empowering health and wellness professionals in Kitengela, Kenya through quality education and training.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection("home")} className="text-gray-300 hover:text-college-green transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection("courses")} className="text-gray-300 hover:text-college-green transition-colors">Courses</button></li>
              <li><button onClick={() => scrollToSection("services")} className="text-gray-300 hover:text-college-green transition-colors">Services</button></li>
              <li><button onClick={() => scrollToSection("admissions")} className="text-gray-300 hover:text-college-green transition-colors">Admissions</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">0727 708 240</li>
              <li className="text-gray-300">0732 522 089</li>
              <li className="text-gray-300">leadershipjoycepcentre@gmail.com</li>
              <li className="text-gray-300">Kitengela, Kenya</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-college-green transition-colors">
                <span className="text-2xl">📘</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-college-green transition-colors">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-college-green transition-colors">
                <span className="text-2xl">📸</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-college-green transition-colors">
                <span className="text-2xl">📱</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 Leadership JOYCEP Training College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
