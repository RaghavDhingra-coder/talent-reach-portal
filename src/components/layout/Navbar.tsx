
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This would later be replaced with actual auth state
  const isLoggedIn = false;
  const userRole = null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Find Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-blue">
              Talent<span className="text-brand-indigo">Reach</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex"
            asChild
          >
            <Link to="/jobs">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search jobs</span>
            </Link>
          </Button>

          {isLoggedIn ? (
            <>
              {userRole === "employer" && (
                <Button asChild>
                  <Link to="/employer/post-job">Post a job</Link>
                </Button>
              )}
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild className="hidden md:inline-flex">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[385px]">
              <nav className="grid gap-6 pt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2" />
                {isLoggedIn ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                    {userRole === "employer" && (
                      <Link 
                        to="/employer/post-job" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Post a job
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
