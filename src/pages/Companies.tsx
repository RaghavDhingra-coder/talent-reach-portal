
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { Building, Search, Users } from "lucide-react";

// Mock companies data
const mockCompanies = [
  {
    id: "1",
    name: "TechCorp Inc.",
    logo: "/placeholder.svg",
    location: "San Francisco, CA",
    industry: "Technology",
    description: "Leading technology solutions provider.",
    employeesCount: "500-1,000",
    jobCount: 3,
    website: "https://techcorp.com",
  },
  {
    id: "2",
    name: "DesignHub",
    logo: "/placeholder.svg",
    location: "Remote",
    industry: "Design",
    description: "Creative design agency for digital products.",
    employeesCount: "50-200",
    jobCount: 1,
    website: "https://designhub.com",
  },
  {
    id: "3",
    name: "Growth Solutions",
    logo: "/placeholder.svg",
    location: "New York, NY",
    industry: "Marketing",
    description: "Marketing and growth strategies for businesses.",
    employeesCount: "100-500",
    jobCount: 1,
    website: "https://growthsolutions.com",
  },
  {
    id: "4",
    name: "ServerTech",
    logo: "/placeholder.svg",
    location: "Berlin, Germany",
    industry: "Technology",
    description: "Backend infrastructure solutions.",
    employeesCount: "200-500",
    jobCount: 1,
    website: "https://servertech.com",
  },
  {
    id: "5",
    name: "ContentKing",
    logo: "/placeholder.svg",
    location: "Remote",
    industry: "Marketing",
    description: "Content creation and management.",
    employeesCount: "20-50",
    jobCount: 1,
    website: "https://contentking.com",
  },
  {
    id: "6",
    name: "CloudSystems",
    logo: "/placeholder.svg",
    location: "Austin, TX",
    industry: "Technology",
    description: "Cloud infrastructure and DevOps solutions.",
    employeesCount: "100-500",
    jobCount: 1,
    website: "https://cloudsystems.com",
  },
];

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = mockCompanies.filter((company) => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };
  
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-muted">
        <div className="container py-8">
          <h1 className="text-2xl font-bold md:text-3xl">Browse Companies</h1>
          <p className="mt-2 text-muted-foreground">
            Discover companies that are hiring on TalentReach
          </p>
        </div>
      </section>
      
      <div className="container py-8">
        {/* Search Form */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        {/* Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-md bg-muted">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>{company.location}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{company.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-blue-700">
                      {company.industry}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-gray-700">
                      <Users className="mr-1 h-3 w-3" />
                      {company.employeesCount}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-green-700">
                      {company.jobCount} Active Jobs
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/companies/${company.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/jobs?company=${company.id}`}>
                      View Jobs
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-lg font-medium">No companies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Companies;
