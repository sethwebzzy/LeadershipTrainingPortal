import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Courses from "@/components/sections/courses";
import Services from "@/components/sections/services";
import Admissions from "@/components/sections/admissions";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="bg-yellow-50 border-l-4 border-college-green py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-college-green text-2xl mr-4">📅</div>
                <div>
                  <h3 className="text-lg font-semibold text-college-dark">Monthly Intakes Available</h3>
                  <p className="text-college-gray">Register now for our upcoming courses starting every month</p>
                </div>
              </div>
              <button className="bg-college-green text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors font-medium">
                Apply Now
              </button>
            </div>
          </div>
        </div>
        <Courses />
        <Services />
        <Admissions />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
