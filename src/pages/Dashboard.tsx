
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { BookmarkIcon, Briefcase, CheckCircle, Clock, Search } from "lucide-react";
import { mockJobs } from "@/data/mockData";
import JobCard from "@/components/job/JobCard";

const Dashboard = () => {
  const activeApplications = 5;
  const savedJobs = 8;
  const jobAlerts = 3;
  
  // We'll show some recommended jobs based on the user's skills
  const recommendedJobs = mockJobs.slice(0, 2);
  // And some recent applications
  const recentApplications = [
    {
      id: "1",
      job: mockJobs[0],
      status: "reviewed",
      date: "2023-04-15",
    },
    {
      id: "2",
      job: mockJobs[1],
      status: "pending",
      date: "2023-04-10",
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your job search activities
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{activeApplications}</div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              3 applications pending review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{savedJobs}</div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <BookmarkIcon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              2 jobs expiring soon
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Job Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{jobAlerts}</div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Bell className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              12 new matches this week
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>
              Complete your profile to attract more employers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-medium">75% Complete</div>
              <div className="text-sm font-medium">3 items left</div>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-3/4 rounded-full bg-primary"></div>
            </div>
            <div className="mt-4 grid gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Basic information</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Contact details</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Upload resume</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Add work experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Add education</span>
              </div>
            </div>
            <Button className="mt-4">Complete Your Profile</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Track the status of your job applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-muted flex items-center justify-center font-medium">
                      {application.job.company.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">
                        {application.job.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {application.job.company}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div>
                        <Badge
                          variant={application.status === "reviewed" ? "default" : "outline"}
                          className="capitalize"
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {new Date(application.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No applications yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start applying to jobs and track your progress here
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            )}
            
            {recentApplications.length > 0 && (
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link to="/dashboard/applications">View All Applications</Link>
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
            <CardDescription>
              Based on your profile and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recommendedJobs.length > 0 ? (
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="mb-1 font-medium line-clamp-1">
                      <Link to={`/jobs/${job.id}`} className="hover:text-primary">
                        {job.title}
                      </Link>
                    </div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <Link to={`/jobs/${job.id}`}>
                          <Search className="mr-1 h-4 w-4" /> View
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookmarkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No recommendations yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete your profile to get job recommendations
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/dashboard/profile">Update Profile</Link>
                </Button>
              </div>
            )}
            
            {recommendedJobs.length > 0 && (
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link to="/jobs">Explore More Jobs</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
