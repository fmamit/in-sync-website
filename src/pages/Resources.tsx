import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Lightbulb,
  MapPin,
  Plus,
  Search,
  Tag,
  User,
  Video,
  BookOpen,
  Users,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data - in a real app, this would come from a backend
const initialBlogs = [
  {
    id: 1,
    title: "AI-Powered CRM: The Future of Customer Relationship Management",
    excerpt: "Discover how artificial intelligence is revolutionizing CRM systems and transforming customer interactions across industries.",
    content: "Full blog content here...",
    author: "Rahul Sharma",
    date: "2024-01-15",
    category: "AI & Automation",
    readTime: "8 min read",
    tags: ["AI", "CRM", "Automation", "Technology"],
    imageUrl: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "WhatsApp Business API Integration Best Practices",
    excerpt: "Learn how to effectively integrate WhatsApp Business API into your customer communication strategy for maximum engagement.",
    content: "Full blog content here...",
    author: "Priya Patel",
    date: "2024-01-10",
    category: "Communication",
    readTime: "6 min read",
    tags: ["WhatsApp", "API", "Communication", "Best Practices"],
    imageUrl: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Field Force Management in the Digital Age",
    excerpt: "Explore modern approaches to field force management and how GPS tracking and mobile CRM are changing the game.",
    content: "Full blog content here...",
    author: "Amit Kumar",
    date: "2024-01-05",
    category: "Field Force",
    readTime: "10 min read",
    tags: ["Field Force", "GPS", "Mobile CRM", "Management"],
    imageUrl: "/api/placeholder/400/250"
  }
];

const initialWhitepapers = [
  {
    id: 1,
    title: "The Complete Guide to CRM Implementation in Indian SMEs",
    description: "A comprehensive 45-page guide covering CRM selection, implementation strategies, and ROI optimization for small and medium enterprises in India.",
    category: "Implementation Guide",
    pages: 45,
    downloadCount: 1250,
    publishDate: "2024-01-01",
    tags: ["CRM", "SME", "Implementation", "ROI"],
    fileUrl: "/downloads/crm-implementation-guide.pdf"
  },
  {
    id: 2,
    title: "WhatsApp Business API: Compliance and Best Practices",
    description: "Essential guidelines for WhatsApp Business API usage, compliance requirements, and optimization strategies for Indian businesses.",
    category: "Compliance",
    pages: 28,
    downloadCount: 890,
    publishDate: "2023-12-15",
    tags: ["WhatsApp", "Compliance", "API", "Guidelines"],
    fileUrl: "/downloads/whatsapp-compliance-guide.pdf"
  },
  {
    id: 3,
    title: "AI in Customer Service: Trends and Predictions 2024",
    description: "Industry analysis of AI adoption in customer service, featuring case studies and future predictions for the Indian market.",
    category: "Industry Analysis",
    pages: 52,
    downloadCount: 2100,
    publishDate: "2023-12-01",
    tags: ["AI", "Customer Service", "Trends", "Predictions"],
    fileUrl: "/downloads/ai-customer-service-trends.pdf"
  }
];

const initialEvents = [
  {
    id: 1,
    title: "In-Sync CRM Masterclass: Advanced Features Deep Dive",
    description: "Join our expert team for an in-depth exploration of In-Sync's advanced CRM features, AI capabilities, and integration possibilities.",
    type: "Webinar",
    date: "2024-02-15",
    time: "3:00 PM IST",
    duration: "2 hours",
    location: "Online",
    registrationUrl: "#",
    maxAttendees: 500,
    currentAttendees: 245,
    speakers: ["Sunita Negi", "Rahul Sharma"],
    tags: ["CRM", "Advanced Features", "Training"]
  },
  {
    id: 2,
    title: "Digital Transformation Summit 2024",
    description: "Annual summit bringing together industry leaders to discuss digital transformation trends, challenges, and success stories.",
    type: "Conference",
    date: "2024-03-20",
    time: "9:00 AM IST",
    duration: "Full Day",
    location: "Gurgaon Convention Center",
    registrationUrl: "#",
    maxAttendees: 1000,
    currentAttendees: 680,
    speakers: ["Industry Experts", "CXO Panel"],
    tags: ["Digital Transformation", "Leadership", "Strategy"]
  },
  {
    id: 3,
    title: "WhatsApp Business API Workshop",
    description: "Hands-on workshop covering WhatsApp Business API setup, automation strategies, and compliance requirements.",
    type: "Workshop",
    date: "2024-02-28",
    time: "2:00 PM IST",
    duration: "3 hours",
    location: "Online",
    registrationUrl: "#",
    maxAttendees: 100,
    currentAttendees: 75,
    speakers: ["API Specialists"],
    tags: ["WhatsApp", "API", "Workshop", "Hands-on"]
  }
];

const initialTutorials = [
  {
    id: 1,
    title: "Getting Started with In-Sync CRM",
    description: "Complete beginner's guide to setting up and using In-Sync CRM for your business.",
    type: "Video Series",
    duration: "45 minutes",
    level: "Beginner",
    category: "Setup & Configuration",
    videoCount: 8,
    tags: ["Getting Started", "Setup", "Basic Features"],
    videoUrl: "#"
  },
  {
    id: 2,
    title: "Advanced Sales Pipeline Management",
    description: "Learn to create sophisticated sales pipelines, set up automation, and track performance metrics.",
    type: "Interactive Guide",
    duration: "30 minutes",
    level: "Advanced",
    category: "Sales Management",
    videoCount: 1,
    tags: ["Sales Pipeline", "Automation", "Analytics"],
    videoUrl: "#"
  },
  {
    id: 3,
    title: "WhatsApp Integration Step-by-Step",
    description: "Detailed tutorial on integrating WhatsApp Business API with your In-Sync CRM system.",
    type: "Written Tutorial",
    duration: "20 minutes",
    level: "Intermediate",
    category: "Integrations",
    videoCount: 0,
    tags: ["WhatsApp", "Integration", "API Setup"],
    videoUrl: "#"
  },
  {
    id: 4,
    title: "Field Force Management Best Practices",
    description: "Comprehensive guide to managing field teams using GPS tracking, mobile CRM, and performance analytics.",
    type: "Video Tutorial",
    duration: "35 minutes",
    level: "Intermediate",
    category: "Field Management",
    videoCount: 1,
    tags: ["Field Force", "GPS", "Mobile CRM"],
    videoUrl: "#"
  }
];

const Resources = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [whitepapers, setWhitepapers] = useState(initialWhitepapers);
  const [events, setEvents] = useState(initialEvents);
  const [tutorials, setTutorials] = useState(initialTutorials);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("blogs");
  const { toast } = useToast();

  // Add new resource form state
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    author: "",
    type: "",
    content: ""
  });

  const handleAddResource = () => {
    if (!newResource.title || !newResource.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const resourceData = {
      id: Date.now(),
      title: newResource.title,
      description: newResource.description,
      category: newResource.category,
      tags: newResource.tags.split(",").map(tag => tag.trim()),
      date: new Date().toISOString().split("T")[0],
      author: newResource.author || "In-Sync Team"
    };

    switch (activeTab) {
      case "blogs":
        setBlogs([...blogs, {
          ...resourceData,
          excerpt: newResource.description,
          content: newResource.content,
          readTime: "5 min read",
          imageUrl: "/api/placeholder/400/250"
        }]);
        break;
      case "whitepapers":
        setWhitepapers([...whitepapers, {
          ...resourceData,
          pages: 20,
          downloadCount: 0,
          publishDate: resourceData.date,
          fileUrl: "#"
        }]);
        break;
      case "events":
        setEvents([...events, {
          ...resourceData,
          type: newResource.type || "Webinar",
          time: "3:00 PM IST",
          duration: "1 hour",
          location: "Online",
          registrationUrl: "#",
          maxAttendees: 500,
          currentAttendees: 0,
          speakers: [newResource.author || "In-Sync Team"]
        }]);
        break;
      case "tutorials":
        setTutorials([...tutorials, {
          ...resourceData,
          type: newResource.type || "Video Tutorial",
          duration: "30 minutes",
          level: "Beginner",
          videoCount: 1,
          videoUrl: "#"
        }]);
        break;
    }

    toast({
      title: "Success",
      description: `New ${activeTab.slice(0, -1)} added successfully!`
    });

    setNewResource({
      title: "",
      description: "",
      category: "",
      tags: "",
      author: "",
      type: "",
      content: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleAuth = () => {
    if (credentials.username === "asg" && credentials.password === "asg@987") {
      setIsAuthenticated(true);
      setIsAuthDialogOpen(false);
      setIsAddDialogOpen(true);
      setCredentials({ username: "", password: "" });
      toast({
        title: "Authentication Successful",
        description: "You can now add new resources"
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  const handleAddClick = () => {
    if (isAuthenticated) {
      setIsAddDialogOpen(true);
    } else {
      setIsAuthDialogOpen(true);
    }
  };

  const BlogCard = ({ blog }: { blog: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <Badge className="absolute top-4 left-4">{blog.category}</Badge>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <User className="h-4 w-4" />
          <span>{blog.author}</span>
          <Calendar className="h-4 w-4 ml-2" />
          <span>{blog.date}</span>
          <Clock className="h-4 w-4 ml-2" />
          <span>{blog.readTime}</span>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{blog.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
          Read More
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const WhitepaperCard = ({ whitepaper }: { whitepaper: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge>{whitepaper.category}</Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{whitepaper.pages} pages</span>
          </div>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">
          {whitepaper.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{whitepaper.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {whitepaper.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>Published: {whitepaper.publishDate}</span>
          <span>{whitepaper.downloadCount} downloads</span>
        </div>
        <Button className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );

  const EventCard = ({ event }: { event: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant={event.type === 'Conference' ? 'default' : 'secondary'}>
            {event.type}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.currentAttendees}/{event.maxAttendees}</span>
          </div>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 2).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full">
          Register Now
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const TutorialCard = ({ tutorial }: { tutorial: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant={tutorial.level === 'Beginner' ? 'secondary' : tutorial.level === 'Advanced' ? 'default' : 'outline'}>
            {tutorial.level}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {tutorial.type === 'Video Series' || tutorial.type === 'Video Tutorial' ? (
              <Video className="h-4 w-4" />
            ) : (
              <BookOpen className="h-4 w-4" />
            )}
            <span>{tutorial.duration}</span>
          </div>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">
          {tutorial.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{tutorial.category}</p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 mb-4">{tutorial.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
          {tutorial.type.includes('Video') ? 'Watch Tutorial' : 'View Guide'}
          {tutorial.type.includes('Video') ? (
            <Video className="h-4 w-4 ml-2" />
          ) : (
            <ExternalLink className="h-4 w-4 ml-2" />
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                Resources & Learning Hub
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover expert insights, comprehensive guides, and practical tutorials to maximize your In-Sync experience
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="ai">AI & Automation</SelectItem>
                    <SelectItem value="crm">CRM</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="integration">Integration</SelectItem>
                    <SelectItem value="field-force">Field Force</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <TabsList className="grid w-full lg:w-auto grid-cols-4 mb-4 lg:mb-0">
                  <TabsTrigger value="blogs" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Blogs
                  </TabsTrigger>
                  <TabsTrigger value="whitepapers" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Whitepapers
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="tutorials" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Tutorials
                  </TabsTrigger>
                </TabsList>

                {/* Add Resource Button */}
                <Button onClick={handleAddClick} className="w-full lg:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                </Button>

                {/* Authentication Dialog */}
                <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Authentication Required</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          value={credentials.username}
                          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                          placeholder="Enter username..."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={credentials.password}
                          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                          placeholder="Enter password..."
                        />
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleAuth} className="flex-1">
                          Login
                        </Button>
                        <Button variant="outline" onClick={() => setIsAuthDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Add Resource Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={newResource.title}
                          onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                          placeholder="Enter title..."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={newResource.description}
                          onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                          placeholder="Enter description..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={newResource.category}
                            onChange={(e) => setNewResource({...newResource, category: e.target.value})}
                            placeholder="Enter category..."
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="author">Author</Label>
                          <Input
                            id="author"
                            value={newResource.author}
                            onChange={(e) => setNewResource({...newResource, author: e.target.value})}
                            placeholder="Author name..."
                          />
                        </div>
                      </div>
                      
                      {(activeTab === "events" || activeTab === "tutorials") && (
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Input
                            id="type"
                            value={newResource.type}
                            onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                            placeholder={activeTab === "events" ? "Webinar, Conference, Workshop..." : "Video Tutorial, Written Guide, Interactive..."}
                          />
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={newResource.tags}
                          onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                          placeholder="tag1, tag2, tag3..."
                        />
                      </div>
                      
                      {activeTab === "blogs" && (
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={newResource.content}
                            onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                            placeholder="Full blog content..."
                            rows={5}
                          />
                        </div>
                      )}
                      
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleAddResource} className="flex-1">
                          Add {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Blogs Tab */}
              <TabsContent value="blogs" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs
                    .filter(blog => 
                      (selectedCategory === "all" || blog.category.toLowerCase().includes(selectedCategory)) &&
                      (searchTerm === "" || blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((blog) => (
                      <BlogCard key={blog.id} blog={blog} />
                    ))
                  }
                </div>
              </TabsContent>

              {/* Whitepapers Tab */}
              <TabsContent value="whitepapers" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {whitepapers
                    .filter(whitepaper => 
                      (selectedCategory === "all" || whitepaper.category.toLowerCase().includes(selectedCategory)) &&
                      (searchTerm === "" || whitepaper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       whitepaper.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((whitepaper) => (
                      <WhitepaperCard key={whitepaper.id} whitepaper={whitepaper} />
                    ))
                  }
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events
                    .filter(event => 
                      (selectedCategory === "all" || event.tags.some((tag: string) => tag.toLowerCase().includes(selectedCategory))) &&
                      (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       event.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))
                  }
                </div>
              </TabsContent>

              {/* Tutorials Tab */}
              <TabsContent value="tutorials" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials
                    .filter(tutorial => 
                      (selectedCategory === "all" || tutorial.category.toLowerCase().includes(selectedCategory)) &&
                      (searchTerm === "" || tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((tutorial) => (
                      <TutorialCard key={tutorial.id} tutorial={tutorial} />
                    ))
                  }
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter to get the latest resources, insights, and updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button>
                  Subscribe
                  <Globe className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;