
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import JobCard from "@/components/job/JobCard";
import { ArrowRight, Briefcase, Building, Search, Users } from "lucide-react";
import { mockCategories, mockJobs, mockStats } from "@/data/mockData";

const Home = () => {
  const [jobKeyword, setJobKeyword] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  
  const featuredJobs = mockJobs.filter((job) => job.featured).slice(0, 3);
  const urgentJobs = mockJobs.filter((job) => job.urgent).slice(0, 3);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would navigate to the jobs page with the search parameters
    console.log("Search for:", jobKeyword, "in", jobLocation);
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="banner-gradient text-white">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold md:text-5xl">
              Find Your Dream Job Today
            </h1>
            <p className="mb-8 text-lg opacity-90 md:text-xl">
              Thousands of jobs from top companies. Find the perfect role for your skills and experience.
            </p>
            
            <form onSubmit={handleSearch} className="rounded-lg bg-white p-2 shadow-lg md:flex">
              <div className="relative flex-1 md:mr-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title or keyword"
                  className="pl-9"
                  value={jobKeyword}
                  onChange={(e) => setJobKeyword(e.target.value)}
                />
              </div>
              <Select value={jobLocation} onValueChange={setJobLocation}>
                <SelectTrigger className="my-2 md:my-0 md:w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="berlin">Berlin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full md:ml-2 md:w-auto">
                Search Jobs
              </Button>
            </form>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm opacity-90">
              <span>Popular Searches:</span>
              <Link to="/jobs?category=tech" className="hover:text-white/80">Web Developer</Link>
              <Link to="/jobs?category=design" className="hover:text-white/80">UI/UX Designer</Link>
              <Link to="/jobs?category=marketing" className="hover:text-white/80">Marketing</Link>
              <Link to="/jobs?category=sales" className="hover:text-white/80">Sales</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">{mockStats.jobs.toLocaleString()}+</div>
              <p className="text-sm text-muted-foreground">Jobs Available</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">{mockStats.companies.toLocaleString()}+</div>
              <p className="text-sm text-muted-foreground">Companies Hiring</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">{mockStats.jobseekers.toLocaleString()}+</div>
              <p className="text-sm text-muted-foreground">Active Job Seekers</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">{mockStats.applications.toLocaleString()}+</div>
              <p className="text-sm text-muted-foreground">Applications</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Featured Jobs</h2>
            <p className="mt-2 text-muted-foreground">
              Discover opportunities from top employers
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link to="/jobs">
                View All Jobs <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Explore jobs in various industries
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                to={`/jobs?category=${category.id}`}
                className="feature-card flex items-center"
              >
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} jobs</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Urgent Jobs Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Urgent Job Openings</h2>
            <p className="mt-2 text-muted-foreground">
              Jobs that need to be filled immediately
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {urgentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link to="/jobs?urgent=true">
                View All Urgent Jobs <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">How TalentReach Works</h2>
            <p className="mt-2 text-muted-foreground">
              Simple steps to find your next job or hire great talent
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="feature-card text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up as a job seeker or employer to get started with TalentReach.
              </p>
            </div>
            
            <div className="feature-card text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Find Opportunities</h3>
              <p className="text-muted-foreground">
                Search and filter jobs based on your preferences or post open positions.
              </p>
            </div>
            
            <div className="feature-card text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Apply or Hire</h3>
              <p className="text-muted-foreground">
                Apply to jobs with your resume or review applications to find the perfect candidate.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="border-t py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of job seekers and employers who use TalentReach to find their perfect match.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Create an Account
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/jobs">
                  Browse All Jobs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
