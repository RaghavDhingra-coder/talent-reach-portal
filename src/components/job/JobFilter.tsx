
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter as FilterIcon, X } from "lucide-react";
import { JobFilter as JobFilterType } from "@/types";

const jobTypes = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "relevance", label: "Relevance" },
];

const categories = [
  { id: "tech", name: "Technology" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "sales", name: "Sales" },
  { id: "finance", name: "Finance" },
  { id: "healthcare", name: "Healthcare" },
  { id: "education", name: "Education" },
];

const locations = [
  "Remote",
  "New York",
  "San Francisco",
  "London",
  "Berlin",
  "Tokyo",
  "Sydney",
];

interface JobFilterProps {
  onFilterChange: (filter: JobFilterType) => void;
  initialFilter?: JobFilterType;
  showMobileFilter?: boolean;
  toggleMobileFilter?: () => void;
}

const JobFilter = ({
  onFilterChange,
  initialFilter,
  showMobileFilter = false,
  toggleMobileFilter,
}: JobFilterProps) => {
  const [filter, setFilter] = useState<JobFilterType>(initialFilter || {});
  
  const handleFilterChange = (key: string, value: any) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
    onFilterChange(newFilter);
  };
  
  const handleReset = () => {
    const emptyFilter = {};
    setFilter(emptyFilter);
    onFilterChange(emptyFilter);
  };
  
  return (
    <div className={`bg-white ${showMobileFilter ? "fixed inset-0 z-50 overflow-y-auto p-4" : "hidden lg:block"}`}>
      {showMobileFilter && (
        <div className="flex items-center justify-between pb-4 border-b mb-4">
          <h2 className="text-lg font-semibold">Filter Jobs</h2>
          <Button variant="ghost" size="icon" onClick={toggleMobileFilter}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium">Search Keywords</label>
          <div className="mt-2 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Job title, keywords..."
              value={filter.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium">Category</label>
          <Select
            value={filter.category}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Location</label>
          <Select
            value={filter.location}
            onValueChange={(value) => handleFilterChange("location", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Job Type</label>
          <Select
            value={filter.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {jobTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Options</label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filter.featured}
              onCheckedChange={(checked) => handleFilterChange("featured", checked)}
            />
            <label htmlFor="featured" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Featured Jobs Only
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={filter.urgent}
              onCheckedChange={(checked) => handleFilterChange("urgent", checked)}
            />
            <label htmlFor="urgent" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Urgent Jobs Only
            </label>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium">Sort By</label>
          <Select
            value={filter.sort}
            onValueChange={(value) => handleFilterChange("sort", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleReset}
          >
            Reset
          </Button>
          
          <Button 
            className="flex-1"
            onClick={() => onFilterChange(filter)}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
