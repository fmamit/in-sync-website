import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import { getResponseForQuery } from "@/data/faqKnowledgeBase";
import { useLazyLoading } from "@/hooks/useLazyLoading";
import { useBlogOperations, type BlogPost } from "@/hooks/useBlogOperations";
import {
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MapPin,
  Plus,
  Search,
  Tag,
  User,
  Video,
  BookOpen,
  Users,
  MessageCircleQuestion,
  ChevronDown,
  Loader2,
  Edit3,
  LogIn,
  LogOut,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Custom styles for ReactQuill to match the design system

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
  },
  {
    id: 4,
    title: "Sales Automation Strategies for Small Businesses",
    excerpt: "Discover effective sales automation techniques that can help small businesses increase revenue and improve efficiency.",
    content: "Full blog content here...",
    author: "Sunita Negi",
    date: "2024-01-01",
    category: "Sales",
    readTime: "7 min read",
    tags: ["Sales", "Automation", "Small Business", "Efficiency"],
    imageUrl: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "Customer Data Analytics: Unlocking Business Insights",
    excerpt: "Learn how to leverage customer data analytics to gain valuable insights and make data-driven business decisions.",
    content: "Full blog content here...",
    author: "Rajesh Gupta",
    date: "2023-12-28",
    category: "Analytics",
    readTime: "9 min read",
    tags: ["Analytics", "Data", "Insights", "Business Intelligence"],
    imageUrl: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Mobile CRM: Empowering Field Sales Teams",
    excerpt: "Explore how mobile CRM solutions are empowering field sales teams to work more efficiently and close deals faster.",
    content: "Full blog content here...",
    author: "Kavya Singh",
    date: "2023-12-25",
    category: "Mobile CRM",
    readTime: "8 min read",
    tags: ["Mobile", "CRM", "Sales", "Field Teams"],
    imageUrl: "/api/placeholder/400/250"
  },
  {
    id: 7,
    title: "Integration Strategies for Modern Business Systems",
    excerpt: "A comprehensive guide to integrating various business systems for seamless operations and improved productivity.",
    content: "Full blog content here...",
    author: "Arjun Mehta",
    date: "2023-12-20",
    category: "Integration",
    readTime: "11 min read",
    tags: ["Integration", "Systems", "Productivity", "API"],
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
  },
  {
    id: 4,
    title: "Digital Transformation Roadmap for Enterprises",
    description: "Strategic framework for enterprise digital transformation including technology adoption, change management, and success metrics.",
    category: "Strategy",
    pages: 38,
    downloadCount: 1540,
    publishDate: "2023-11-20",
    tags: ["Digital Transformation", "Strategy", "Enterprise", "Roadmap"],
    fileUrl: "/downloads/digital-transformation-roadmap.pdf"
  },
  {
    id: 5,
    title: "Sales Process Optimization Through Technology",
    description: "Comprehensive analysis of sales process optimization using modern technology stack and automation tools.",
    category: "Sales Optimization",
    pages: 33,
    downloadCount: 980,
    publishDate: "2023-11-10",
    tags: ["Sales", "Process", "Optimization", "Technology"],
    fileUrl: "/downloads/sales-process-optimization.pdf"
  },
  {
    id: 6,
    title: "Customer Retention Strategies in the Digital Era",
    description: "Evidence-based strategies for customer retention using digital tools, personalization, and data analytics.",
    category: "Customer Success",
    pages: 41,
    downloadCount: 1320,
    publishDate: "2023-10-25",
    tags: ["Customer Retention", "Digital", "Analytics", "Personalization"],
    fileUrl: "/downloads/customer-retention-strategies.pdf"
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
  },
  {
    id: 4,
    title: "Sales Automation Bootcamp",
    description: "Intensive training session on implementing sales automation workflows and maximizing team productivity.",
    type: "Training",
    date: "2024-03-05",
    time: "10:00 AM IST",
    duration: "4 hours",
    location: "Mumbai Training Center",
    registrationUrl: "#",
    maxAttendees: 50,
    currentAttendees: 32,
    speakers: ["Sales Experts"],
    tags: ["Sales", "Automation", "Training", "Productivity"]
  },
  {
    id: 5,
    title: "Customer Success Strategies Seminar",
    description: "Learn proven strategies for customer success, retention, and growth in the modern business environment.",
    type: "Seminar",
    date: "2024-03-12",
    time: "2:30 PM IST",
    duration: "2.5 hours",
    location: "Online",
    registrationUrl: "#",
    maxAttendees: 300,
    currentAttendees: 185,
    speakers: ["Customer Success Team"],
    tags: ["Customer Success", "Retention", "Growth", "Strategies"]
  },
  {
    id: 6,
    title: "AI Integration Workshop",
    description: "Hands-on workshop on integrating AI capabilities into your existing business processes and systems.",
    type: "Workshop",
    date: "2024-03-18",
    time: "11:00 AM IST",
    duration: "3.5 hours",
    location: "Delhi Tech Hub",
    registrationUrl: "#",
    maxAttendees: 75,
    currentAttendees: 45,
    speakers: ["AI Specialists", "Tech Team"],
    tags: ["AI", "Integration", "Workshop", "Technology"]
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
  },
  {
    id: 5,
    title: "Customer Data Analytics Deep Dive",
    description: "Master customer data analytics to uncover insights and drive business growth through data-driven decisions.",
    type: "Video Series",
    duration: "60 minutes",
    level: "Advanced",
    category: "Analytics",
    videoCount: 12,
    tags: ["Analytics", "Data", "Business Intelligence", "Reporting"],
    videoUrl: "#"
  },
  {
    id: 6,
    title: "Automation Workflows for Beginners",
    description: "Learn to create simple yet powerful automation workflows to streamline your business processes.",
    type: "Interactive Tutorial",
    duration: "25 minutes",
    level: "Beginner",
    category: "Automation",
    videoCount: 1,
    tags: ["Automation", "Workflows", "Process", "Efficiency"],
    videoUrl: "#"
  },
  {
    id: 7,
    title: "Mobile CRM Usage Guide",
    description: "Complete guide to using In-Sync mobile CRM app for field sales, customer visits, and remote work.",
    type: "Video Tutorial",
    duration: "40 minutes",
    level: "Beginner",
    category: "Mobile App",
    videoCount: 1,
    tags: ["Mobile", "App", "Field Sales", "Remote Work"],
    videoUrl: "#"
  }
];

const Resources = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [whitepapers, setWhitepapers] = useState(initialWhitepapers);
  const [events, setEvents] = useState(initialEvents);
  const [tutorials, setTutorials] = useState(initialTutorials);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Authentication state
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  
  // Edit blog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editBlogData, setEditBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    imageUrl: "",
    author: "",
    readTime: ""
  });
  
  // Delete blog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState<BlogPost | null>(null);
  
  const [faqQuery, setFaqQuery] = useState("");
  const [faqResponse, setFaqResponse] = useState("");
  const [newResourceType, setNewResourceType] = useState("blog");
  const { toast } = useToast();

  // Blog operations hook
  const { loading: blogLoading, fetchBlogs, createBlog, updateBlog, deleteBlog } = useBlogOperations();

  // Add new resource form state
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    author: "",
    type: "",
    content: "",
    image: null as File | null
  });

  // Load blogs from Supabase on component mount
  useEffect(() => {
    const loadBlogs = async () => {
      const blogData = await fetchBlogs();
      setBlogs(blogData);
    };
    loadBlogs();
  }, []);

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('blog-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Authentication functions
  const handleAuth = () => {
    if (credentials.username === "asg" && credentials.password === "asg@987") {
      setIsAuthenticated(true);
      setIsAuthDialogOpen(false);
      localStorage.setItem('blog-auth', 'true');
      toast({
        title: "Success",
        description: "Successfully authenticated! You can now edit blogs.",
      });
      setCredentials({ username: "", password: "" });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('blog-auth');
    toast({
      title: "Success",
      description: "Logged out successfully.",
    });
  };

  // Edit blog functions
  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setEditBlogData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags.join(", "),
      imageUrl: blog.imageUrl || "",
      author: blog.author,
      readTime: blog.readTime
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editBlogData.title.trim() || !editBlogData.excerpt.trim() || !editingBlog) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedBlogData = {
      title: editBlogData.title,
      excerpt: editBlogData.excerpt,
      content: editBlogData.content,
      category: editBlogData.category,
      tags: editBlogData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      imageUrl: editBlogData.imageUrl,
      author: editBlogData.author,
      readTime: editBlogData.readTime
    };

    const result = await updateBlog(editingBlog.id, updatedBlogData);
    if (result) {
      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? result : blog));
      setIsEditDialogOpen(false);
      setEditingBlog(null);
    }
  };

  // Delete blog functions
  const handleDeleteBlog = (blog: BlogPost) => {
    setDeletingBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteBlog = async () => {
    if (deletingBlog) {
      const success = await deleteBlog(deletingBlog.id);
      if (success) {
        setBlogs(blogs.filter(blog => blog.id !== deletingBlog.id));
        setIsDeleteDialogOpen(false);
        setDeletingBlog(null);
      }
    }
  };

  // Filter functions
  const filterItems = (items: any[], searchTerm: string, selectedCategory: string) => {
    return items.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (item.description || item.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        item.category?.toLowerCase().includes(selectedCategory) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(selectedCategory));
      
      return matchesSearch && matchesCategory;
    });
  };

  // Filtered data
  const filteredBlogs = filterItems(blogs, searchTerm, selectedCategory);
  const filteredWhitepapers = filterItems(whitepapers, searchTerm, selectedCategory);
  const filteredEvents = filterItems(events, searchTerm, selectedCategory);
  const filteredTutorials = filterItems(tutorials, searchTerm, selectedCategory);

  // Lazy loading hooks for each section
  const blogsLazy = useLazyLoading({ items: filteredBlogs, initialCount: 4 });
  const whitepapersLazy = useLazyLoading({ items: filteredWhitepapers, initialCount: 4 });
  const eventsLazy = useLazyLoading({ items: filteredEvents, initialCount: 4 });
  const tutorialsLazy = useLazyLoading({ items: filteredTutorials, initialCount: 4 });

  const handleAddResource = async (resourceType: string) => {
    if (!newResource.title || !newResource.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (resourceType === "blog") {
      // Handle image upload
      let imageUrl = "/api/placeholder/400/250";
      if (newResource.image) {
        // Create a local URL for the uploaded image
        imageUrl = URL.createObjectURL(newResource.image);
      }

      const blogData = {
        title: newResource.title,
        excerpt: newResource.description,
        content: newResource.content,
        author: newResource.author || "In-Sync Team",
        category: newResource.category,
        readTime: "5 min read",
        tags: newResource.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        imageUrl: imageUrl
      };

      const result = await createBlog(blogData);
      if (result) {
        setBlogs([result, ...blogs]);
      }
    } else {
      // Handle other resource types with existing logic
      const resourceData = {
        id: Date.now(),
        title: newResource.title,
        description: newResource.description,
        category: newResource.category,
        tags: newResource.tags.split(",").map(tag => tag.trim()),
        date: new Date().toISOString().split("T")[0],
        author: newResource.author || "In-Sync Team"
      };

      switch (resourceType) {
        case "whitepaper":
          setWhitepapers([...whitepapers, {
            ...resourceData,
            pages: 20,
            downloadCount: 0,
            publishDate: resourceData.date,
            fileUrl: "#"
          }]);
          break;
        case "event":
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
        case "tutorial":
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
        description: `${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} added successfully!`,
      });
    }

    // Reset form and close dialog
    setNewResource({
      title: "",
      description: "",
      category: "",
      tags: "",
      author: "",
      type: "",
      content: "",
      image: null
    });
    setIsAddDialogOpen(false);
  };

  const handleAddClick = (resourceType: string) => {
    if (!isAuthenticated) {
      setIsAuthDialogOpen(true);
      return;
    }
    setNewResourceType(resourceType);
    setIsAddDialogOpen(true);
  };

  const handleFaqQuery = () => {
    if (!faqQuery.trim()) return;
    
    const response = getResponseForQuery(faqQuery);
    setFaqResponse(response);
  };

  // Component for Load More button
  const LoadMoreButton = ({ hasMore, onLoadMore }: any) => (
    hasMore && (
      <div className="text-center mt-8">
        <Button 
          onClick={onLoadMore}
          variant="outline"
          className="min-w-[200px]"
        >
          Load More
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    )
  );

  const BlogCard = ({ blog }: { blog: BlogPost }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        {blog.imageUrl && blog.imageUrl !== "/api/placeholder/400/250" ? (
          <img 
            src={blog.imageUrl} 
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10" />
        )}
        <Badge className="absolute top-4 left-4">{blog.category}</Badge>
        {isAuthenticated && (
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleEditBlog(blog)}
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        )}
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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            Read More
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
          {isAuthenticated && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditBlog(blog)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteBlog(blog)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
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
          <Badge variant="outline">{event.type}</Badge>
          <div className="text-sm text-muted-foreground">
            {event.date}
          </div>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.currentAttendees}/{event.maxAttendees} registered</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map((tag: string, index: number) => (
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
          <Badge variant="outline">{tutorial.level}</Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {tutorial.type.includes("Video") ? (
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
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{tutorial.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{tutorial.category}</span>
          </div>
          {tutorial.videoCount > 0 && (
            <div className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>{tutorial.videoCount} video{tutorial.videoCount > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full">
          Start Learning
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const SectionHeader = ({ title, description, count, onAddClick }: any) => (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">
          {description} ({count} available)
        </p>
      </div>
      {isAuthenticated && (
        <Button onClick={onAddClick} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add {title.slice(0, -1)}
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary/5 to-accent/10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Learn & Grow with Our <span className="text-primary">Resources</span>
                </h1>
              </div>
              <div className="flex gap-2">
                {isAuthenticated ? (
                  <Button onClick={handleLogout} variant="outline">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button onClick={() => setIsAuthDialogOpen(true)} variant="outline">
                    <LogIn className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                )}
              </div>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover blogs, whitepapers, events, and tutorials to master customer engagement and boost your business success.
            </p>
            
            {/* Search and Filter - existing code */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
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
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="field">Field Force</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="mobile">Mobile CRM</SelectItem>
                  <SelectItem value="integration">Integration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Blogs Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Blogs" 
            description="Latest insights and trends in customer engagement"
            count={filteredBlogs.length}
            onAddClick={() => handleAddClick("blog")}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogsLazy.displayedItems.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          
          <LoadMoreButton 
            hasMore={blogsLazy.hasMore} 
            onLoadMore={blogsLazy.loadMore}
          />
          <div ref={blogsLazy.loadMoreRef} className="h-4" />
        </section>

        {/* Whitepapers Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Whitepapers" 
            description="In-depth guides and industry analysis"
            count={filteredWhitepapers.length}
            onAddClick={() => handleAddClick("whitepaper")}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whitepapersLazy.displayedItems.map((whitepaper) => (
              <WhitepaperCard key={whitepaper.id} whitepaper={whitepaper} />
            ))}
          </div>
          
          <LoadMoreButton 
            hasMore={whitepapersLazy.hasMore} 
            onLoadMore={whitepapersLazy.loadMore}
          />
          <div ref={whitepapersLazy.loadMoreRef} className="h-4" />
        </section>

        {/* Events Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Events" 
            description="Upcoming webinars, workshops, and conferences"
            count={filteredEvents.length}
            onAddClick={() => handleAddClick("event")}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsLazy.displayedItems.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <LoadMoreButton 
            hasMore={eventsLazy.hasMore} 
            onLoadMore={eventsLazy.loadMore}
          />
          <div ref={eventsLazy.loadMoreRef} className="h-4" />
        </section>

        {/* Tutorials Section */}
        <section className="mb-16">
          <SectionHeader 
            title="Tutorials" 
            description="Step-by-step learning materials"
            count={filteredTutorials.length}
            onAddClick={() => handleAddClick("tutorial")}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorialsLazy.displayedItems.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
          
          <LoadMoreButton 
            hasMore={tutorialsLazy.hasMore} 
            onLoadMore={tutorialsLazy.loadMore}
          />
          <div ref={tutorialsLazy.loadMoreRef} className="h-4" />
        </section>

        {/* FAQ Section - existing code */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Have Questions? <span className="text-primary">Ask Away!</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Our AI-powered FAQ system can help you find answers to common questions about our platform and services.
            </p>
            
            <div className="flex gap-4">
              <div className="relative flex-1">
                <MessageCircleQuestion className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Ask a question about our services..."
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleFaqQuery()}
                />
              </div>
              <Button onClick={handleFaqQuery}>
                Ask
              </Button>
            </div>
            
            {faqResponse && (
              <Card className="mt-6 text-left">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-2">Answer:</p>
                  <p>{faqResponse}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>

      {/* Authentication Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please enter admin credentials to edit blogs.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleAuth} className="flex-1">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button variant="outline" onClick={() => setIsAuthDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editBlogData.title}
                  onChange={(e) => setEditBlogData({...editBlogData, title: e.target.value})}
                  placeholder="Blog title"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={editBlogData.category} onValueChange={(value) => setEditBlogData({...editBlogData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI & Automation">AI & Automation</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Field Force">Field Force</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Mobile CRM">Mobile CRM</SelectItem>
                    <SelectItem value="Integration">Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-excerpt">Excerpt</Label>
              <Textarea
                id="edit-excerpt"
                value={editBlogData.excerpt}
                onChange={(e) => setEditBlogData({...editBlogData, excerpt: e.target.value})}
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-content">Content</Label>
              <div className="mt-2">
                <ReactQuill
                  theme="snow"
                  value={editBlogData.content}
                  onChange={(content) => setEditBlogData({...editBlogData, content})}
                  placeholder="Full blog content..."
                  style={{ minHeight: '200px' }}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['blockquote', 'code-block'],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-author">Author</Label>
                <Input
                  id="edit-author"
                  value={editBlogData.author}
                  onChange={(e) => setEditBlogData({...editBlogData, author: e.target.value})}
                  placeholder="Author name"
                />
              </div>
              <div>
                <Label htmlFor="edit-readTime">Read Time</Label>
                <Input
                  id="edit-readTime"
                  value={editBlogData.readTime}
                  onChange={(e) => setEditBlogData({...editBlogData, readTime: e.target.value})}
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                value={editBlogData.tags}
                onChange={(e) => setEditBlogData({...editBlogData, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={editBlogData.imageUrl}
                onChange={(e) => setEditBlogData({...editBlogData, imageUrl: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveEdit} className="flex-1">
                <Edit3 className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Blog Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingBlog?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteBlog}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Resource Dialog - existing code */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New {newResourceType.charAt(0).toUpperCase() + newResourceType.slice(1)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  placeholder={`${newResourceType} title`}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newResource.category}
                  onChange={(e) => setNewResource({...newResource, category: e.target.value})}
                  placeholder="Category"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newResource.description}
                onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            {newResourceType === "blog" && (
              <div>
                <Label htmlFor="content">Content</Label>
                <div className="mt-2">
                  <ReactQuill
                    theme="snow"
                    value={newResource.content}
                    onChange={(content) => setNewResource({...newResource, content})}
                    placeholder="Full blog content..."
                    style={{ minHeight: '200px' }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['blockquote', 'code-block'],
                        ['link', 'image'],
                        ['clean']
                      ],
                    }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={newResource.author}
                  onChange={(e) => setNewResource({...newResource, author: e.target.value})}
                  placeholder="Author name"
                />
              </div>
              {(newResourceType === "event" || newResourceType === "tutorial") && (
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={newResource.type}
                    onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                    placeholder={newResourceType === "event" ? "Webinar, Workshop, etc." : "Video, Interactive, etc."}
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={newResource.tags}
                onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            {newResourceType === "blog" && (
              <div>
                <Label htmlFor="image">Blog Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewResource({...newResource, image: e.target.files?.[0] || null})}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload an image for your blog post (JPG, PNG, WebP supported)
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button onClick={() => handleAddResource(newResourceType)} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add {newResourceType.charAt(0).toUpperCase() + newResourceType.slice(1)}
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Resources;
