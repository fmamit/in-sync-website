import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEOHelmet from "@/components/SEOHelmet";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { defaultSEOConfig } from "@/utils/seo";
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
import { useLazyList } from "@/hooks/useLazyLoad";
import { useBlogOperations, type BlogPost } from "@/hooks/useBlogOperations";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { uploadBlogImage, processQuillImages } from "@/utils/imageUpload";
import { 
  createWhitepaper, 
  updateWhitepaper, 
  deleteWhitepaper, 
  fetchWhitepapers,
  fixWhitepaperPageCounts,
  downloadWhitepaperPDF,
  type WhitepaperData 
} from "@/utils/whitepaperUpload";
import { ResourceCard } from "@/components/common/BusinessCard";
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
  Trash2,
  Upload
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
    author: "Flt Lt Amit Sengupta",
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
    author: "Flt Lt Amit Sengupta",
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

const initialTutorials: any[] = [];

const Resources = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [whitepapers, setWhitepapers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [tutorials, setTutorials] = useState(initialTutorials);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
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
    readTime: "",
    publicationDate: ""
  });
  
  // Delete blog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState<BlogPost | null>(null);
  
  // Edit whitepaper state
  const [isEditWhitepaperDialogOpen, setIsEditWhitepaperDialogOpen] = useState(false);
  const [editingWhitepaper, setEditingWhitepaper] = useState<any>(null);
  const [editWhitepaperData, setEditWhitepaperData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    pages: 0,
    publishDate: ""
  });
  
  // Delete whitepaper state
  const [isDeleteWhitepaperDialogOpen, setIsDeleteWhitepaperDialogOpen] = useState(false);
  const [deletingWhitepaper, setDeletingWhitepaper] = useState<any>(null);
  
  // Edit tutorial state
  const [isEditTutorialDialogOpen, setIsEditTutorialDialogOpen] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState<any>(null);
  const [editTutorialData, setEditTutorialData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    type: "",
    duration: "",
    level: "",
    videoUrl: ""
  });
  
  // Delete tutorial state
  const [isDeleteTutorialDialogOpen, setIsDeleteTutorialDialogOpen] = useState(false);
  const [deletingTutorial, setDeletingTutorial] = useState<any>(null);
  
  // Edit event state
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [editEventData, setEditEventData] = useState({
    title: "",
    description: "",
    type: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    tags: "",
    videoUrl: ""
  });
  
  // Delete event state
  const [isDeleteEventDialogOpen, setIsDeleteEventDialogOpen] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState<any>(null);
  
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
    image: null as File | null,
    pdf: null as File | null,
    metaDescription: "",
    metaKeywords: "",
    geoRegion: "IN",
    geoPlacename: "India",
    geoPosition: "20.5937;78.9629",
    icbm: "20.5937, 78.9629"
  });

  // Load blogs, whitepapers, and tutorials from Supabase on component mount
  useEffect(() => {
    const loadData = async () => {
      const blogData = await fetchBlogs();
      setBlogs(blogData);
      
      const whitepaperData = await fetchWhitepapers();
      setWhitepapers(whitepaperData);

      // Fetch events from Supabase
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!eventsError && eventsData) {
        setEvents(eventsData.map((e: any) => ({
          id: e.id,
          title: e.title,
          description: e.description,
          type: e.type,
          date: e.date,
          time: e.time,
          duration: e.duration,
          location: e.location,
          currentAttendees: e.current_attendees,
          maxAttendees: e.max_attendees,
          tags: e.tags || [],
          videoUrl: e.video_url,
          thumbnailUrl: e.thumbnail_url
        })));
      } else {
        // Fallback to initial events if table is empty
        setEvents(initialEvents);
      }

      // Fetch tutorials from Supabase
      const { data: tutorialsData, error } = await supabase
        .from('tutorials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && tutorialsData) {
        setTutorials(tutorialsData.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          type: t.type,
          duration: t.duration,
          level: t.level,
          category: t.category,
          videoCount: t.video_count,
          tags: t.tags || [],
          videoUrl: t.video_url
        })));
      }
    };
    loadData();
  }, []);

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
      readTime: blog.readTime,
      publicationDate: blog.publicationDate || blog.date
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

    let processedContent = editBlogData.content;
    if (processedContent) {
      processedContent = await processQuillImages(processedContent);
    }

    const updatedBlogData = {
      title: editBlogData.title,
      excerpt: editBlogData.excerpt,
      content: processedContent,
      category: editBlogData.category,
      tags: editBlogData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      imageUrl: editBlogData.imageUrl,
      author: editBlogData.author,
      readTime: editBlogData.readTime,
      publicationDate: editBlogData.publicationDate
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

  // Edit whitepaper functions
  const handleEditWhitepaper = (whitepaper: any) => {
    setEditingWhitepaper(whitepaper);
    setEditWhitepaperData({
      title: whitepaper.title,
      description: whitepaper.description,
      category: whitepaper.category,
      tags: whitepaper.tags.join(", "),
      pages: whitepaper.pages,
      publishDate: whitepaper.publishDate
    });
    setIsEditWhitepaperDialogOpen(true);
  };

  const handleSaveWhitepaperEdit = async () => {
    if (!editWhitepaperData.title.trim() || !editWhitepaperData.description.trim() || !editingWhitepaper) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedWhitepaperData = {
      ...editingWhitepaper,
      title: editWhitepaperData.title,
      description: editWhitepaperData.description,
      category: editWhitepaperData.category,
      tags: editWhitepaperData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      pages: editWhitepaperData.pages,
      publishDate: editWhitepaperData.publishDate
    };

    setWhitepapers(whitepapers.map(wp => wp.id === editingWhitepaper.id ? updatedWhitepaperData : wp));
    setIsEditWhitepaperDialogOpen(false);
    setEditingWhitepaper(null);
    
    toast({
      title: "Success",
      description: "Whitepaper updated successfully!",
    });
  };

  // Delete whitepaper functions
  const handleDeleteWhitepaper = (whitepaper: any) => {
    setDeletingWhitepaper(whitepaper);
    setIsDeleteWhitepaperDialogOpen(true);
  };

  const confirmDeleteWhitepaper = async () => {
    if (deletingWhitepaper) {
      setWhitepapers(whitepapers.filter(wp => wp.id !== deletingWhitepaper.id));
      setIsDeleteWhitepaperDialogOpen(false);
      setDeletingWhitepaper(null);
      
      toast({
        title: "Success",
        description: "Whitepaper deleted successfully!",
      });
    }
  };

  // Edit tutorial functions
  const handleEditTutorial = (tutorial: any) => {
    setEditingTutorial(tutorial);
    setEditTutorialData({
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category,
      tags: tutorial.tags.join(", "),
      type: tutorial.type,
      duration: tutorial.duration,
      level: tutorial.level,
      videoUrl: tutorial.videoUrl || ""
    });
    setIsEditTutorialDialogOpen(true);
  };

  const handleSaveTutorialEdit = async () => {
    if (!editTutorialData.title.trim() || !editTutorialData.description.trim() || !editingTutorial) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const { data, error } = await supabase
      .from('tutorials')
      .update({
        title: editTutorialData.title,
        description: editTutorialData.description,
        category: editTutorialData.category,
        tags: editTutorialData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        type: editTutorialData.type,
        duration: editTutorialData.duration,
        level: editTutorialData.level,
        video_url: editTutorialData.videoUrl
      })
      .eq('id', editingTutorial.id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update tutorial. Please try again.",
        variant: "destructive"
      });
      console.error('Error updating tutorial:', error);
      return;
    }

    const updatedTutorialData = {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      duration: data.duration,
      level: data.level,
      category: data.category,
      videoCount: data.video_count,
      tags: data.tags || [],
      videoUrl: data.video_url
    };

    setTutorials(tutorials.map(t => t.id === editingTutorial.id ? updatedTutorialData : t));
    setIsEditTutorialDialogOpen(false);
    setEditingTutorial(null);
    
    toast({
      title: "Success",
      description: "Tutorial updated successfully!",
    });
  };

  // Delete tutorial functions
  const handleDeleteTutorial = (tutorial: any) => {
    setDeletingTutorial(tutorial);
    setIsDeleteTutorialDialogOpen(true);
  };

  const confirmDeleteTutorial = async () => {
    if (deletingTutorial) {
      const { error } = await supabase
        .from('tutorials')
        .delete()
        .eq('id', deletingTutorial.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete tutorial. Please try again.",
          variant: "destructive"
        });
        console.error('Error deleting tutorial:', error);
        return;
      }

      setTutorials(tutorials.filter(t => t.id !== deletingTutorial.id));
      setIsDeleteTutorialDialogOpen(false);
      setDeletingTutorial(null);
      
      toast({
        title: "Success",
        description: "Tutorial deleted successfully!",
      });
    }
  };

  // Edit event functions
  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setEditEventData({
      title: event.title,
      description: event.description,
      type: event.type,
      date: event.date,
      time: event.time,
      duration: event.duration,
      location: event.location,
      tags: event.tags.join(", "),
      videoUrl: event.videoUrl || ""
    });
    setIsEditEventDialogOpen(true);
  };

  const handleSaveEventEdit = async () => {
    if (!editEventData.title.trim() || !editEventData.description.trim() || !editingEvent) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const updatedEventData = {
        title: editEventData.title,
        description: editEventData.description,
        type: editEventData.type,
        date: editEventData.date,
        time: editEventData.time,
        duration: editEventData.duration,
        location: editEventData.location,
        tags: editEventData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        video_url: editEventData.videoUrl || null
      };

      const { error } = await supabase
        .from('events')
        .update(updatedEventData)
        .eq('id', editingEvent.id);

      if (error) throw error;

      // Update local state
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? { 
              ...e, 
              ...updatedEventData, 
              tags: updatedEventData.tags,
              videoUrl: updatedEventData.video_url 
            }
          : e
      ));
      
      setIsEditEventDialogOpen(false);
      setEditingEvent(null);
      
      toast({
        title: "Success",
        description: "Event updated successfully!",
      });
    } catch (error) {
      console.error('Error updating event:', error);
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete event functions
  const handleDeleteEvent = (event: any) => {
    setDeletingEvent(event);
    setIsDeleteEventDialogOpen(true);
  };

  const confirmDeleteEvent = async () => {
    if (deletingEvent) {
      try {
        // Delete from database
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', deletingEvent.id);

        if (error) throw error;

        // Update local state
        setEvents(events.filter(e => e.id !== deletingEvent.id));
        setIsDeleteEventDialogOpen(false);
        setDeletingEvent(null);
        
        toast({
          title: "Success",
          description: "Event deleted successfully!",
        });
      } catch (error) {
        console.error('Error deleting event:', error);
        toast({
          title: "Error",
          description: "Failed to delete event. Please try again.",
          variant: "destructive",
        });
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
  const blogsLazy = useLazyList({ items: filteredBlogs, initialCount: 4 });
  const whitepapersLazy = useLazyList({ items: filteredWhitepapers, initialCount: 4 });
  const eventsLazy = useLazyList({ items: filteredEvents, initialCount: 4 });
  const tutorialsLazy = useLazyList({ items: filteredTutorials, initialCount: 4 });

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
      // Process content to upload any blob images
      let processedContent = newResource.content;
      if (processedContent) {
        processedContent = await processQuillImages(processedContent);
      }

      // Handle main blog image upload
      let imageUrl = "/api/placeholder/400/250";
      if (newResource.image) {
        const uploadedUrl = await uploadBlogImage(newResource.image);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast({
            title: "Warning",
            description: "Failed to upload image. Using default placeholder.",
            variant: "destructive"
          });
        }
      }

      const blogData = {
        title: newResource.title,
        excerpt: newResource.description,
        content: processedContent,
        author: newResource.author || "In-Sync Team",
        category: newResource.category,
        readTime: "5 min read",
        tags: newResource.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        imageUrl: imageUrl,
        metaDescription: newResource.metaDescription,
        metaKeywords: newResource.metaKeywords,
        geoRegion: newResource.geoRegion,
        geoPlacename: newResource.geoPlacename,
        geoPosition: newResource.geoPosition,
        icbm: newResource.icbm
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
          if (!newResource.pdf) {
            toast({
              title: "Error",
              description: "Please upload a PDF file for the whitepaper.",
              variant: "destructive"
            });
            return;
          }

          const whitepaperData: WhitepaperData = {
            title: newResource.title,
            description: newResource.description,
            category: newResource.category,
            author: newResource.author || "In-Sync Team",
            tags: newResource.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
            publicationDate: new Date().toISOString().split("T")[0]
          };

          const whitepaperResult = await createWhitepaper(whitepaperData, newResource.pdf);
          if (whitepaperResult) {
            const updatedWhitepapers = await fetchWhitepapers();
            setWhitepapers(updatedWhitepapers);
            toast({
              title: "Success",
              description: "Whitepaper uploaded successfully!",
            });
          } else {
            toast({
              title: "Error",
              description: "Failed to upload whitepaper. Please try again.",
              variant: "destructive"
            });
            return;
          }
          break;
        case "event":
          try {
            let eventThumbnailUrl = null;
            
            // Fetch YouTube metadata if video URL is provided
            if (newResource.content) {
              console.log('Fetching YouTube metadata for event URL:', newResource.content);
              try {
                const { data: metadata, error: metadataError } = await supabase.functions.invoke(
                  'fetch-youtube-metadata',
                  {
                    body: { videoUrl: newResource.content }
                  }
                );

                console.log('YouTube metadata response for event:', { metadata, metadataError });

                if (metadataError) {
                  console.error('Error fetching YouTube metadata:', metadataError);
                  toast({
                    title: "Warning",
                    description: "Could not fetch thumbnail from YouTube. Event will be added without thumbnail.",
                    variant: "default"
                  });
                } else if (metadata?.thumbnail) {
                  eventThumbnailUrl = metadata.thumbnail;
                  console.log('YouTube thumbnail successfully retrieved:', eventThumbnailUrl);
                  toast({
                    title: "Success",
                    description: "YouTube thumbnail successfully retrieved!",
                  });
                }
              } catch (fetchError) {
                console.error('Error in YouTube metadata fetch:', fetchError);
                toast({
                  title: "Warning",
                  description: "Could not fetch thumbnail from YouTube. Event will be added without thumbnail.",
                  variant: "default"
                });
              }
            } else {
              console.log('No video URL provided for event');
            }

            const eventData = {
              title: resourceData.title,
              description: resourceData.description,
              type: newResource.type || "Webinar",
              date: resourceData.date,
              time: "3:00 PM IST",
              duration: "1 hour",
              location: "Online",
              max_attendees: 500,
              current_attendees: 0,
              tags: resourceData.tags,
              video_url: newResource.content || null,
              thumbnail_url: eventThumbnailUrl
            };

            const { data: newEvent, error } = await supabase
              .from('events')
              .insert([eventData])
              .select()
              .single();

            if (error) throw error;

            if (newEvent) {
              setEvents([...events, {
                id: newEvent.id,
                title: newEvent.title,
                description: newEvent.description,
                type: newEvent.type,
                date: newEvent.date,
                time: newEvent.time,
                duration: newEvent.duration,
                location: newEvent.location,
                maxAttendees: newEvent.max_attendees,
                currentAttendees: newEvent.current_attendees,
                tags: newEvent.tags,
                videoUrl: newEvent.video_url,
                thumbnailUrl: newEvent.thumbnail_url,
                registrationUrl: "#",
                speakers: [newResource.author || "In-Sync Team"]
              }]);

              toast({
                title: "Success",
                description: "Event added successfully!",
              });
            }
          } catch (error) {
            console.error('Error adding event:', error);
            toast({
              title: "Error",
              description: "Failed to add event. Please try again.",
              variant: "destructive"
            });
          }
          break;
        case "tutorial":
          let thumbnailUrl = null;
          
          // Fetch YouTube metadata if video URL is provided
          if (newResource.content) {
            console.log('Fetching YouTube metadata for URL:', newResource.content);
            try {
              const { data: metadata, error: metadataError } = await supabase.functions.invoke(
                'fetch-youtube-metadata',
                {
                  body: { videoUrl: newResource.content }
                }
              );

              console.log('YouTube metadata response:', { metadata, metadataError });

              if (metadataError) {
                console.error('Error fetching YouTube metadata:', metadataError);
                toast({
                  title: "Warning",
                  description: "Could not fetch thumbnail from YouTube. Tutorial will be added without thumbnail.",
                  variant: "default"
                });
              } else if (metadata && metadata.thumbnails) {
                // Use the highest quality thumbnail available
                thumbnailUrl = metadata.thumbnails.maxres?.url || 
                              metadata.thumbnails.high?.url || 
                              metadata.thumbnails.medium?.url ||
                              metadata.thumbnails.default?.url;
                
                console.log('Thumbnail URL extracted:', thumbnailUrl);
                
                toast({
                  title: "Thumbnail Fetched",
                  description: "YouTube thumbnail successfully retrieved!",
                });
              }
            } catch (err) {
              console.error('Failed to fetch YouTube metadata:', err);
              toast({
                title: "Warning",
                description: "Could not fetch thumbnail from YouTube. Tutorial will be added without thumbnail.",
                variant: "default"
              });
            }
          } else {
            console.log('No video URL provided for tutorial');
          }

          const { data: tutorialData, error: tutorialError } = await supabase
            .from('tutorials')
            .insert({
              title: newResource.title,
              description: newResource.description,
              category: newResource.category,
              type: newResource.type || "Video Tutorial",
              duration: "30 minutes",
              level: "Beginner",
              video_count: 1,
              video_url: newResource.content || "#",
              thumbnail_url: thumbnailUrl,
              tags: newResource.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
            })
            .select()
            .single();

          if (tutorialError) {
            toast({
              title: "Error",
              description: "Failed to create tutorial. Please try again.",
              variant: "destructive"
            });
            console.error('Error creating tutorial:', tutorialError);
            return;
          }

          if (tutorialData) {
            setTutorials([{
              id: tutorialData.id,
              title: tutorialData.title,
              description: tutorialData.description,
              type: tutorialData.type,
              duration: tutorialData.duration,
              level: tutorialData.level,
              category: tutorialData.category,
              videoCount: tutorialData.video_count,
              tags: tutorialData.tags || [],
              videoUrl: tutorialData.video_url,
              thumbnailUrl: tutorialData.thumbnail_url
            }, ...tutorials]);
          }
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
      image: null,
      pdf: null,
      metaDescription: "",
      metaKeywords: "",
      geoRegion: "IN",
      geoPlacename: "India",
      geoPosition: "20.5937;78.9629",
      icbm: "20.5937, 78.9629"
    });
    setIsAddDialogOpen(false);
  };

  const handleAddClick = (resourceType: string) => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins can add resources. Please sign in with admin credentials.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    setNewResourceType(resourceType);
    setIsAddDialogOpen(true);
  };

  const handleFixWhitepaperPageCounts = async () => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins can perform this action.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Processing...",
      description: "Fixing whitepaper page counts. This may take a moment.",
    });

    try {
      const result = await fixWhitepaperPageCounts();
      
      if (result.success) {
        // Refresh the whitepapers list
        const updatedWhitepapers = await fetchWhitepapers();
        setWhitepapers(updatedWhitepapers);
        
        toast({
          title: "Success!",
          description: `Fixed ${result.fixed} whitepapers. ${result.errors.length > 0 ? `${result.errors.length} errors occurred.` : ''}`,
        });
        
        if (result.errors.length > 0) {
          console.warn('Errors during fix:', result.errors);
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to fix whitepaper page counts. Check console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error in handleFixWhitepaperPageCounts:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fixing page counts.",
        variant: "destructive"
      });
    }
  };

  const handleFaqQuery = () => {
    if (!faqQuery.trim()) return;
    
    const response = getResponseForQuery(faqQuery);
    setFaqResponse(response);
  };

  const handleAutoFillTags = async () => {
    if (!newResource.title && !newResource.content && !newResource.metaDescription) {
      toast({
        title: "Error",
        description: "Please add at least a title, content, or meta description before auto-filling tags.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-tags', {
        body: {
          title: newResource.title,
          content: newResource.content,
          metaDescription: newResource.metaDescription
        }
      });

      if (error) throw error;

      if (data?.tags || data?.keywords) {
        setNewResource(prev => ({
          ...prev,
          tags: data.tags ? data.tags.join(', ') : prev.tags,
          metaKeywords: data.keywords || prev.metaKeywords
        }));
        
        toast({
          title: "Success",
          description: "Tags and keywords auto-filled successfully!",
        });
      }
    } catch (error) {
      console.error('Error auto-filling tags:', error);
      toast({
        title: "Error",
        description: "Failed to auto-fill tags and keywords. Please try again.",
        variant: "destructive"
      });
    }
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
          <div className="w-full h-48 bg-primary/10" />
        )}
        <Badge className="absolute top-4 left-4">{blog.category}</Badge>
        {user && isAdmin && (
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
          {user && isAdmin && (
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

  const WhitepaperCard = ({ whitepaper }: { whitepaper: any }) => {
    const handleDownload = async () => {
      try {
        await downloadWhitepaperPDF(whitepaper);
        toast({
          title: "Download Started",
          description: "Your whitepaper download has begun.",
        });
      } catch (error) {
        console.error('Download failed:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading the whitepaper. Please try again.",
          variant: "destructive"
        });
      }
    };

    return (
      <ResourceCard
        title={whitepaper.title}
        description={whitepaper.description}
        category={whitepaper.category}
        tags={whitepaper.tags}
        thumbnail={whitepaper.thumbnail_url}
        metadata={[
          { label: "Published", value: whitepaper.publication_date || whitepaper.publishDate },
          { label: "Downloads", value: String(whitepaper.download_count || whitepaper.downloadCount) }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{whitepaper.pages} pages</span>
            </div>
            {user && isAdmin && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEditWhitepaper(whitepaper)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteWhitepaper(whitepaper)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        }
        footer={
          <Button 
            className="w-full"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        }
        className="h-full"
      />
    );
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      {event.thumbnailUrl && (
        <div className="relative w-full aspect-video overflow-hidden">
          <img 
            src={event.thumbnailUrl} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {event.type}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Video className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      )}
      <CardHeader>
        {!event.thumbnailUrl && (
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">{event.type}</Badge>
            <div className="text-sm text-muted-foreground">
              {event.date}
            </div>
          </div>
        )}
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

        <div className="flex gap-2">
          {event.videoUrl && event.videoUrl !== "#" ? (
            <Button 
              className="flex-1"
              onClick={() => window.open(event.videoUrl, '_blank')}
            >
              <Video className="h-4 w-4 mr-2" />
              Watch Video
            </Button>
          ) : (
            <Button className="flex-1">
              Register Now
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          )}
          {user && isAdmin && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditEvent(event)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteEvent(event)}
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

  const TutorialCard = ({ tutorial }: { tutorial: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      {tutorial.thumbnailUrl && (
        <div className="relative w-full aspect-video overflow-hidden">
          <img 
            src={tutorial.thumbnailUrl} 
            alt={tutorial.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {tutorial.level}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Video className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      )}
      <CardHeader>
        {!tutorial.thumbnailUrl && (
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
        )}
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

        <div className="flex gap-2">
          {tutorial.videoUrl && tutorial.videoUrl !== "#" ? (
            <Button 
              className="flex-1"
              onClick={() => window.open(tutorial.videoUrl, '_blank')}
            >
              <Video className="h-4 w-4 mr-2" />
              Watch Video
            </Button>
          ) : (
            <Button className="flex-1">
              Start Learning
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          )}
          {user && isAdmin && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditTutorial(tutorial)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteTutorial(tutorial)}
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

  const SectionHeader = ({ title, description, count, onAddClick, onFixClick, showFixButton }: any) => (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">
          {description} ({count} available)
        </p>
      </div>
      {user && isAdmin && (
        <div className="flex gap-2 shrink-0">
          {showFixButton && onFixClick && (
            <Button onClick={onFixClick} variant="outline" size="sm">
              Fix Page Counts
            </Button>
          )}
          <Button onClick={onAddClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add {title.slice(0, -1)}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <SEOHelmet config={defaultSEOConfig.resources} />
      
      <div className="min-h-screen bg-background">
        <Breadcrumbs items={[{ name: 'Resources', url: '/resources' }]} />
        
        {/* Header Section */}
        <div className="relative bg-primary/5 py-16" role="banner">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Learn & Grow with Our <span className="text-primary">Resources</span>
                </h1>
              </div>
              {user && isAdmin && (
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/auth')} variant="outline">
                    Signed in as Admin
                  </Button>
                </div>
              )}
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
            onFixClick={handleFixWhitepaperPageCounts}
            showFixButton={true}
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
              <Label htmlFor="edit-publicationDate">Publication Date</Label>
              <Input
                id="edit-publicationDate"
                type="date"
                value={editBlogData.publicationDate}
                onChange={(e) => setEditBlogData({...editBlogData, publicationDate: e.target.value})}
              />
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

      {/* Edit Whitepaper Dialog */}
      <Dialog open={isEditWhitepaperDialogOpen} onOpenChange={setIsEditWhitepaperDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Whitepaper</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-wp-title">Title</Label>
                <Input
                  id="edit-wp-title"
                  value={editWhitepaperData.title}
                  onChange={(e) => setEditWhitepaperData({...editWhitepaperData, title: e.target.value})}
                  placeholder="Whitepaper title"
                />
              </div>
              <div>
                <Label htmlFor="edit-wp-category">Category</Label>
                <Input
                  id="edit-wp-category"
                  value={editWhitepaperData.category}
                  onChange={(e) => setEditWhitepaperData({...editWhitepaperData, category: e.target.value})}
                  placeholder="Category"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-wp-description">Description</Label>
              <Textarea
                id="edit-wp-description"
                value={editWhitepaperData.description}
                onChange={(e) => setEditWhitepaperData({...editWhitepaperData, description: e.target.value})}
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-wp-pages">Pages</Label>
                <Input
                  id="edit-wp-pages"
                  type="number"
                  value={editWhitepaperData.pages}
                  onChange={(e) => setEditWhitepaperData({...editWhitepaperData, pages: parseInt(e.target.value) || 0})}
                  placeholder="Number of pages"
                />
              </div>
              <div>
                <Label htmlFor="edit-wp-publishDate">Publish Date</Label>
                <Input
                  id="edit-wp-publishDate"
                  type="date"
                  value={editWhitepaperData.publishDate}
                  onChange={(e) => setEditWhitepaperData({...editWhitepaperData, publishDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-wp-tags">Tags (comma separated)</Label>
              <Input
                id="edit-wp-tags"
                value={editWhitepaperData.tags}
                onChange={(e) => setEditWhitepaperData({...editWhitepaperData, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveWhitepaperEdit} className="flex-1">
                <Edit3 className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditWhitepaperDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Whitepaper Confirmation Dialog */}
      <AlertDialog open={isDeleteWhitepaperDialogOpen} onOpenChange={setIsDeleteWhitepaperDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Whitepaper</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingWhitepaper?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteWhitepaperDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteWhitepaper}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Tutorial Dialog */}
      <Dialog open={isEditTutorialDialogOpen} onOpenChange={setIsEditTutorialDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tutorial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-tutorial-title">Title</Label>
              <Input
                id="edit-tutorial-title"
                value={editTutorialData.title}
                onChange={(e) => setEditTutorialData({...editTutorialData, title: e.target.value})}
                placeholder="Tutorial title"
              />
            </div>

            <div>
              <Label htmlFor="edit-tutorial-description">Description</Label>
              <Textarea
                id="edit-tutorial-description"
                value={editTutorialData.description}
                onChange={(e) => setEditTutorialData({...editTutorialData, description: e.target.value})}
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-tutorial-category">Category</Label>
                <Input
                  id="edit-tutorial-category"
                  value={editTutorialData.category}
                  onChange={(e) => setEditTutorialData({...editTutorialData, category: e.target.value})}
                  placeholder="Category"
                />
              </div>
              <div>
                <Label htmlFor="edit-tutorial-type">Type</Label>
                <Select value={editTutorialData.type} onValueChange={(value) => setEditTutorialData({...editTutorialData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Video Tutorial">Video Tutorial</SelectItem>
                    <SelectItem value="Video Series">Video Series</SelectItem>
                    <SelectItem value="Written Tutorial">Written Tutorial</SelectItem>
                    <SelectItem value="Interactive Tutorial">Interactive Tutorial</SelectItem>
                    <SelectItem value="Interactive Guide">Interactive Guide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-tutorial-duration">Duration</Label>
                <Input
                  id="edit-tutorial-duration"
                  value={editTutorialData.duration}
                  onChange={(e) => setEditTutorialData({...editTutorialData, duration: e.target.value})}
                  placeholder="e.g. 30 minutes"
                />
              </div>
              <div>
                <Label htmlFor="edit-tutorial-level">Level</Label>
                <Select value={editTutorialData.level} onValueChange={(value) => setEditTutorialData({...editTutorialData, level: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="edit-tutorial-videoUrl">YouTube Video URL (Optional)</Label>
                {editTutorialData.videoUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        const { data, error } = await supabase.functions.invoke('fetch-youtube-metadata', {
                          body: { videoUrl: editTutorialData.videoUrl }
                        });

                        if (error) throw error;

                        if (data) {
                          setEditTutorialData({
                            ...editTutorialData,
                            description: data.description || editTutorialData.description,
                            tags: data.tags?.join(', ') || editTutorialData.tags
                          });
                          
                          toast({
                            title: "Success",
                            description: "Video metadata fetched successfully!",
                          });
                        }
                      } catch (error) {
                        console.error('Error fetching YouTube metadata:', error);
                        toast({
                          title: "Error",
                          description: "Failed to fetch video metadata. Please check the URL.",
                          variant: "destructive"
                        });
                      }
                    }}
                    className="text-xs"
                  >
                    Fetch Video Details
                  </Button>
                )}
              </div>
              <Input
                id="edit-tutorial-videoUrl"
                value={editTutorialData.videoUrl}
                onChange={(e) => setEditTutorialData({...editTutorialData, videoUrl: e.target.value})}
                placeholder="https://www.youtube.com/watch?v=..."
                type="url"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add a YouTube video URL and click "Fetch Video Details" to auto-fill description and tags
              </p>
            </div>

            <div>
              <Label htmlFor="edit-tutorial-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tutorial-tags"
                value={editTutorialData.tags}
                onChange={(e) => setEditTutorialData({...editTutorialData, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveTutorialEdit} className="flex-1">
                <Edit3 className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditTutorialDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Tutorial Confirmation Dialog */}
      <AlertDialog open={isDeleteTutorialDialogOpen} onOpenChange={setIsDeleteTutorialDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tutorial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingTutorial?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteTutorialDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteTutorial}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditEventDialogOpen} onOpenChange={setIsEditEventDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-event-title">Title</Label>
              <Input
                id="edit-event-title"
                value={editEventData.title}
                onChange={(e) => setEditEventData({...editEventData, title: e.target.value})}
                placeholder="Event title"
              />
            </div>

            <div>
              <Label htmlFor="edit-event-description">Description</Label>
              <Textarea
                id="edit-event-description"
                value={editEventData.description}
                onChange={(e) => setEditEventData({...editEventData, description: e.target.value})}
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-event-type">Type</Label>
                <Select value={editEventData.type} onValueChange={(value) => setEditEventData({...editEventData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-event-location">Location</Label>
                <Input
                  id="edit-event-location"
                  value={editEventData.location}
                  onChange={(e) => setEditEventData({...editEventData, location: e.target.value})}
                  placeholder="Online or venue"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-event-date">Date</Label>
                <Input
                  id="edit-event-date"
                  type="date"
                  value={editEventData.date}
                  onChange={(e) => setEditEventData({...editEventData, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-event-time">Time</Label>
                <Input
                  id="edit-event-time"
                  value={editEventData.time}
                  onChange={(e) => setEditEventData({...editEventData, time: e.target.value})}
                  placeholder="e.g. 3:00 PM IST"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-event-duration">Duration</Label>
              <Input
                id="edit-event-duration"
                value={editEventData.duration}
                onChange={(e) => setEditEventData({...editEventData, duration: e.target.value})}
                placeholder="e.g. 2 hours"
              />
            </div>

            <div>
              <Label htmlFor="edit-event-tags">Tags (comma separated)</Label>
              <Input
                id="edit-event-tags"
                value={editEventData.tags}
                onChange={(e) => setEditEventData({...editEventData, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <Label htmlFor="edit-event-video">YouTube Video URL (Optional)</Label>
              <Input
                id="edit-event-video"
                value={editEventData.videoUrl}
                onChange={(e) => setEditEventData({...editEventData, videoUrl: e.target.value})}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveEventEdit} className="flex-1">
                <Edit3 className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditEventDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Event Confirmation Dialog */}
      <AlertDialog open={isDeleteEventDialogOpen} onOpenChange={setIsDeleteEventDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingEvent?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteEventDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteEvent}
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
              {(newResourceType === "event" || newResourceType === "tutorial") && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="videoUrl">YouTube Video URL (Optional)</Label>
                    {newResource.content && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            const { data, error } = await supabase.functions.invoke('fetch-youtube-metadata', {
                              body: { videoUrl: newResource.content }
                            });

                            if (error) throw error;

                            if (data) {
                              setNewResource({
                                ...newResource,
                                description: data.description || newResource.description,
                                tags: data.tags?.join(', ') || newResource.tags
                              });
                              
                              toast({
                                title: "Success",
                                description: "Video metadata fetched successfully!",
                              });
                            }
                          } catch (error) {
                            console.error('Error fetching YouTube metadata:', error);
                            toast({
                              title: "Error",
                              description: "Failed to fetch video metadata.",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        Auto-fill from YouTube
                      </Button>
                    )}
                  </div>
                  <Input
                    id="videoUrl"
                    value={newResource.content}
                    onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}
              {newResourceType === "tutorial" && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="videoUrl">YouTube Video URL (Optional)</Label>
                    {newResource.content && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            const { data, error } = await supabase.functions.invoke('fetch-youtube-metadata', {
                              body: { videoUrl: newResource.content }
                            });

                            if (error) throw error;

                            if (data) {
                              setNewResource({
                                ...newResource,
                                description: data.description || newResource.description,
                                tags: data.tags?.join(', ') || newResource.tags
                              });
                              
                              toast({
                                title: "Success",
                                description: "Video metadata fetched successfully!",
                              });
                            }
                          } catch (error) {
                            console.error('Error fetching YouTube metadata:', error);
                            toast({
                              title: "Error",
                              description: "Failed to fetch video metadata. Please check the URL.",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="text-xs"
                      >
                        Fetch Video Details
                      </Button>
                    )}
                  </div>
                  <Input
                    id="videoUrl"
                    type="url"
                    value={newResource.content}
                    onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Add a YouTube video URL and click "Fetch Video Details" to auto-fill description and tags
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                {newResourceType === "blog" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAutoFillTags}
                    disabled={!newResource.title && !newResource.content && !newResource.metaDescription}
                    className="text-xs"
                  >
                    Auto-fill Tags & Keywords
                  </Button>
                )}
              </div>
              <Input
                id="tags"
                value={newResource.tags}
                onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            {newResourceType === "whitepaper" && (
              <div>
                <Label htmlFor="pdf">Whitepaper PDF <span className="text-red-500">*</span></Label>
                <Input
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setNewResource({...newResource, pdf: e.target.files?.[0] || null})}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload the PDF file for your whitepaper. The first page will be used as thumbnail.
                </p>
              </div>
            )}

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

            {newResourceType === "blog" && (
              <div className="border border-border rounded-lg p-4 bg-card">
                <h4 className="font-medium mb-3 text-card-foreground">SEO Meta Tags</h4>
                <div className="space-y-4">
                   <div>
                     <Label htmlFor="metaDescription">Meta Description</Label>
                     <Textarea
                       id="metaDescription"
                       value={newResource.metaDescription}
                       onChange={(e) => setNewResource({...newResource, metaDescription: e.target.value})}
                       placeholder="Learn how to master project deadlines with the precision of booking Tatkal tickets..."
                       rows={4}
                       maxLength={500}
                       className="resize-y min-h-[100px]"
                     />
                     <p className="text-xs text-muted-foreground mt-1">
                       {newResource.metaDescription.length}/500 characters (recommended: 150-160 for SEO)
                     </p>
                   </div>
                  
                   <div>
                     <Label htmlFor="metaKeywords">Keywords (comma separated)</Label>
                     <Textarea
                       id="metaKeywords"
                       value={newResource.metaKeywords}
                       onChange={(e) => setNewResource({...newResource, metaKeywords: e.target.value})}
                       placeholder="project management, Tatkal tickets, deadline management, critical path optimization..."
                       rows={3}
                       className="resize-y min-h-[80px]"
                     />
                   </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="geoRegion">Geo Region</Label>
                      <Input
                        id="geoRegion"
                        value={newResource.geoRegion}
                        onChange={(e) => setNewResource({...newResource, geoRegion: e.target.value})}
                        placeholder="IN"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="geoPlacename">Geo Place Name</Label>
                      <Input
                        id="geoPlacename"
                        value={newResource.geoPlacename}
                        onChange={(e) => setNewResource({...newResource, geoPlacename: e.target.value})}
                        placeholder="India"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="geoPosition">Geo Position</Label>
                      <Input
                        id="geoPosition"
                        value={newResource.geoPosition}
                        onChange={(e) => setNewResource({...newResource, geoPosition: e.target.value})}
                        placeholder="20.5937;78.9629"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="icbm">ICBM</Label>
                      <Input
                        id="icbm"
                        value={newResource.icbm}
                        onChange={(e) => setNewResource({...newResource, icbm: e.target.value})}
                        placeholder="20.5937, 78.9629"
                      />
                    </div>
                  </div>
                </div>
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
    </>
  );
};

export default Resources;
