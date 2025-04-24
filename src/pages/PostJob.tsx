
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";

const jobTypes = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
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

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY"];

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "Your Company", // Would come from the logged in user's company
    location: "",
    type: "",
    category: "",
    description: "",
    requirements: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    featured: false,
    urgent: false,
    expireAt: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would create a new job listing
    console.log("Job submitted:", formData);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold md:text-3xl">Post a Job</h1>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below to post a new job listing
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>
                  Provide basic information about the job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      This is from your company profile
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., New York, NY or Remote"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleSelectChange("type", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Provide details about the job and requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the job responsibilities, benefits, etc."
                    required
                    rows={8}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List each requirement on a new line (e.g., 3+ years of React experience)"
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    List one requirement per line for best formatting
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Salary & Options</CardTitle>
                <CardDescription>
                  Set salary range and additional options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-medium">Salary Range (Optional)</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="minSalary" className="sr-only">
                        Minimum Salary
                      </Label>
                      <Input
                        id="minSalary"
                        name="minSalary"
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.minSalary}
                        onChange={handleChange}
                        placeholder="Min Salary"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="maxSalary" className="sr-only">
                        Maximum Salary
                      </Label>
                      <Input
                        id="maxSalary"
                        name="maxSalary"
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.maxSalary}
                        onChange={handleChange}
                        placeholder="Max Salary"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="currency" className="sr-only">
                        Currency
                      </Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => handleSelectChange("currency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Leave blank if you prefer not to disclose the salary
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-sm font-medium">Expiration Date</h3>
                  <Input
                    id="expireAt"
                    name="expireAt"
                    type="date"
                    value={formData.expireAt}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    The job listing will be automatically removed after this date
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-sm font-medium">Listing Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("featured", checked as boolean)
                        }
                      />
                      <label htmlFor="featured" className="text-sm">
                        Featured Job (Highlighted at the top of the listings)
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={formData.urgent}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("urgent", checked as boolean)
                        }
                      />
                      <label htmlFor="urgent" className="text-sm">
                        Urgent Hiring (Mark as an urgent position)
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 space-x-2 text-right">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit">Post Job</Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;
