
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import JobCard from "@/components/job/JobCard";
import JobFilter from "@/components/job/JobFilter";
import { Filter, Grid3X3, List } from "lucide-react";
import { mockJobs } from "@/data/mockData";
import { Job, JobFilter as JobFilterType } from "@/types";

const Jobs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Initialize filter from URL parameters
  const initialFilter: JobFilterType = {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    location: searchParams.get("location") || undefined,
    type: searchParams.get("type") || undefined,
    featured: searchParams.get("featured") === "true",
    urgent: searchParams.get("urgent") === "true",
    sort: (searchParams.get("sort") as JobFilterType["sort"]) || "newest",
  };
  
  const [filter, setFilter] = useState<JobFilterType>(initialFilter);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(() => filterJobs(mockJobs, initialFilter));
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  function filterJobs(jobs: Job[], filter: JobFilterType): Job[] {
    return jobs.filter((job) => {
      // Search filter
      if (filter.search && !job.title.toLowerCase().includes(filter.search.toLowerCase()) && !job.company.toLowerCase().includes(filter.search.toLowerCase()) && !job.description.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filter.category && job.category !== filter.category) {
        return false;
      }
      
      // Location filter
      if (filter.location && job.location !== filter.location) {
        return false;
      }
      
      // Type filter
      if (filter.type && job.type !== filter.type) {
        return false;
      }
      
      // Featured filter
      if (filter.featured && !job.featured) {
        return false;
      }
      
      // Urgent filter
      if (filter.urgent && !job.urgent) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort
      if (filter.sort === "newest") {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      } else if (filter.sort === "oldest") {
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
      } else {
        return 0; // Relevance would be more complex in a real app
      }
    });
  }
  
  const handleFilterChange = (newFilter: JobFilterType) => {
    setFilter(newFilter);
    setFilteredJobs(filterJobs(mockJobs, newFilter));
    
    // Update URL to reflect filter (in a real app)
    // This would be done using router navigation
  };
  
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };
  
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-muted">
        <div className="container py-8">
          <h1 className="text-2xl font-bold md:text-3xl">Browse Jobs</h1>
          <p className="mt-2 text-muted-foreground">
            Find your next opportunity from our list of open positions
          </p>
        </div>
      </section>
      
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:w-1/4">
            <div className="lg:sticky lg:top-20">
              <JobFilter
                onFilterChange={handleFilterChange}
                initialFilter={filter}
                showMobileFilter={showMobileFilter}
                toggleMobileFilter={toggleMobileFilter}
              />
              
              {/* Mobile Filter Button */}
              <div className="mb-4 flex lg:hidden">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={toggleMobileFilter}
                >
                  <Filter className="mr-2 h-4 w-4" /> Filter Jobs
                </Button>
              </div>
            </div>
          </aside>
          
          {/* Jobs List */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredJobs.length}</span> jobs
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Results List */}
            {filteredJobs.length > 0 ? (
              <div className={`grid gap-4 ${viewMode === "grid" ? "md:grid-cols-2" : ""}`}>
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} compact={viewMode === "list"} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
