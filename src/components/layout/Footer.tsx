
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-brand-blue">
                Talent<span className="text-brand-indigo">Reach</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting top talent with great opportunities. Find your dream job or the perfect candidate with TalentReach.
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                to="#"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="#"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                to="#"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                to="#"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">For Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-sm text-muted-foreground hover:text-foreground">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                  Job Categories
                </Link>
              </li>
              <li>
                <Link to="/resume-tips" className="text-sm text-muted-foreground hover:text-foreground">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="text-sm text-muted-foreground hover:text-foreground">
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">For Employers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/employer/post-job" className="text-sm text-muted-foreground hover:text-foreground">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/employer/resources" className="text-sm text-muted-foreground hover:text-foreground">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/employer/testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/employer/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-foreground">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} TalentReach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
