
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Layout from "@/components/layout/Layout";
import { mockJobs } from "@/data/mockData";
import { BookmarkIcon, Clock, MapPin, Calendar, Building, Share2 } from "lucide-react";
import { Job } from "@/types";
import { formatDistanceToNow } from "date-fns";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isApplying, setIsApplying] = useState(false);
  
  const job: Job | undefined = mockJobs.find((job) => job.id === id);
  
  if (!job) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold md:text-3xl">Job Not Found</h1>
            <p className="mb-8 text-muted-foreground">
              The job you're looking for doesn't exist or might have been removed.
            </p>
            <Button asChild>
              <Link to="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const timeAgo = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });
  
  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-4">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/jobs">Jobs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/jobs/${job.id}`} className="font-medium">
              {job.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Job Header */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:gap-6">
            <div className="mb-4 h-16 w-16 flex-shrink-0 rounded bg-muted flex items-center justify-center font-bold text-2xl text-primary md:mb-0">
              {job.company.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col flex-wrap gap-2 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{job.type}</Badge>
                  {job.featured && <span className="job-tag job-tag-featured">Featured</span>}
                  {job.urgent && <span className="job-tag job-tag-urgent">Urgent</span>}
                </div>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-1">
                  <Building className="h-4 w-4" /> {job.company}
                </div>
                <div className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {job.location}
                </div>
                <div className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {timeAgo}
                </div>
                {job.salary && (
                  <div className="inline-flex items-center gap-1">
                    <span className="font-medium text-foreground">
                      {job.salary.currency} {job.salary.min.toLocaleString()}-{job.salary.max.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => setIsApplying(true)}>
                  Apply Now
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share this job</DialogTitle>
                      <DialogDescription>
                        Share this job opportunity with your network
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center gap-4 py-4">
                      <Button variant="outline" className="flex-1">
                        LinkedIn
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Twitter
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Email
                      </Button>
                    </div>
                    <Input
                      readOnly
                      value={window.location.href}
                      className="mt-2"
                    />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="icon">
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Tabs defaultValue="description">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                  <TabsTrigger value="requirements" className="flex-1">Requirements</TabsTrigger>
                  <TabsTrigger value="company" className="flex-1">Company</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <h2 className="text-xl font-medium">Job Description</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{job.description}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                      nunc ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl 
                      sit amet nisl. Sed euismod, nunc ut aliquam tincidunt, nisl nisl aliquam 
                      nisl, eget aliquam nisl nisl sit amet nisl.
                    </p>
                    <p>
                      Sed euismod, nunc ut aliquam tincidunt, nisl nisl aliquam nisl, eget 
                      aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam tincidunt, 
                      nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-4">
                  <h2 className="text-xl font-medium">Requirements & Qualifications</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      To be successful in this role, you should have the following skills and qualifications:
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="company" className="space-y-4">
                  <h2 className="text-xl font-medium">Company Information</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">{job.company}</span> is 
                      a leading company in the {job.category} sector. Lorem ipsum dolor sit amet, 
                      consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt.
                    </p>
                    <p>
                      Nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, 
                      nunc ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl 
                      sit amet nisl.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-medium">Job Overview</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date Posted</span>
                  </div>
                  <div className="text-right font-medium">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Expiring Date</span>
                  </div>
                  <div className="text-right font-medium">
                    {new Date(job.expireAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location</span>
                  </div>
                  <div className="text-right font-medium">{job.location}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Job Type</span>
                  </div>
                  <div className="text-right font-medium">{job.type}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Category</span>
                  </div>
                  <div className="text-right font-medium capitalize">{job.category}</div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-medium">About Company</h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 rounded bg-muted flex items-center justify-center font-bold text-xl text-primary">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">View Company Profile</Button>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-medium">Similar Jobs</h2>
              <div className="mt-4 space-y-4">
                {mockJobs
                  .filter((j) => j.id !== job.id && j.category === job.category)
                  .slice(0, 3)
                  .map((j) => (
                    <div key={j.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                      <h3 className="font-medium line-clamp-1">
                        <Link to={`/jobs/${j.id}`} className="hover:text-primary">
                          {j.title}
                        </Link>
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-y-1 text-xs text-muted-foreground">
                        <span>{j.company}</span>
                        <span className="mx-1">•</span>
                        <span>{j.location}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Job Application Dialog */}
      <Dialog open={isApplying} onOpenChange={setIsApplying}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to apply for this position at {job.company}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="resume" className="text-sm font-medium">
                Resume/CV
              </label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
              />
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cover-letter" className="text-sm font-medium">
                Cover Letter (Optional)
              </label>
              <Textarea
                id="cover-letter"
                placeholder="Tell us why you're a good fit for this position..."
                rows={5}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default JobDetail;
