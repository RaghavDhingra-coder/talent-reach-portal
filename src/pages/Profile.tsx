
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, PlusCircle, Upload } from "lucide-react";
import { mockUsers } from "@/data/mockData";

const Profile = () => {
  // For demo purposes, we'll use the jobseeker user
  const initialUser = mockUsers[0];
  
  const [user, setUser] = useState({
    ...initialUser,
    skills: initialUser.skills || [],
  });
  
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    position: user.position || "",
    location: user.location || "",
    bio: user.bio || "",
    website: user.website || "",
  });
  
  const [newSkill, setNewSkill] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !user.skills?.includes(newSkill)) {
      setUser((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill],
      }));
      setNewSkill("");
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills?.filter((s) => s !== skill) || [],
    }));
  };
  
  const handleSaveBasicInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, ...formData }));
    // In a real application, this would update the user in the database
    console.log("Saved basic info:", formData);
  };
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real application, this would upload the resume to a storage service
    if (e.target.files && e.target.files[0]) {
      console.log("Resume uploaded:", e.target.files[0]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and resume
        </p>
      </div>
      
      <Tabs defaultValue="basic-info">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveBasicInfo} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Current Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website/Portfolio</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle>Resume/CV</CardTitle>
              <CardDescription>
                Upload or update your resume for job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-dashed p-10 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="mb-4 text-lg font-medium">
                    Drag and drop your resume
                  </div>
                  <div className="mb-4 text-sm text-muted-foreground">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("resume-upload")?.click()}
                  >
                    Select File
                  </Button>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleResumeUpload}
                  />
                </div>
                
                {user.resume && (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded bg-muted p-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">My Resume.pdf</div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded on {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Add your skills to help employers find you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 rounded-full hover:bg-muted-foreground/20"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g., JavaScript)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <Button type="submit">
                    <PlusCircle className="mr-1 h-4 w-4" /> Add
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Job Preferences</CardTitle>
              <CardDescription>
                Set your job preferences to get better recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job-types">Job Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="full-time" />
                      <label htmlFor="full-time">Full-time</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="part-time" />
                      <label htmlFor="part-time">Part-time</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="contract" />
                      <label htmlFor="contract">Contract</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remote" />
                      <label htmlFor="remote">Remote</label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferred-locations">Preferred Locations</Label>
                  <Input
                    id="preferred-locations"
                    placeholder="e.g., New York, Remote"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary-range">Salary Range</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="salary-min" placeholder="Min" type="number" />
                    <Input id="salary-max" placeholder="Max" type="number" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-preferences">
                    Notification Preferences
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-alerts" />
                      <label htmlFor="email-alerts">
                        Email job alerts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="application-updates" />
                      <label htmlFor="application-updates">
                        Application status updates
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="employer-messages" />
                      <label htmlFor="employer-messages">
                        Messages from employers
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
