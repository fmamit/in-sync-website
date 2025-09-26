import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import jsPDF from "jspdf";
import { 
  ClipboardCheck,
  Users,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Download
} from "lucide-react";

interface Question {
  id: string;
  category: "operations" | "sales" | "communication" | "growth";
  question: string;
  options: { value: number; label: string; description?: string }[];
}

interface AssessmentResult {
  score: number;
  level: "critical" | "needs-improvement" | "good" | "excellent";
  title: string;
  description: string;
  recommendations: string[];
  color: string;
}

const BusinessAssessment = ({ className = "" }: { className?: string }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Load previous results on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('insync-assessment-results');
    if (savedResults) {
      try {
        const data = JSON.parse(savedResults);
        // Optionally pre-load previous answers
        // setAnswers(data.answers);
      } catch (error) {
        console.error('Failed to load saved assessment results:', error);
      }
    }
  }, []);

  const questions: Question[] = [
    {
      id: "lead-tracking",
      category: "sales",
      question: "How do you currently track leads and customer interactions?",
      options: [
        { value: 1, label: "Spreadsheets or paper", description: "Manual tracking, prone to errors" },
        { value: 2, label: "Basic CRM with limited features", description: "Some automation but lacks integration" },
        { value: 3, label: "Good CRM but missing integrations", description: "Works well but isolated from other tools" },
        { value: 4, label: "Fully integrated CRM system", description: "Connected to all business processes" }
      ]
    },
    {
      id: "customer-communication",
      category: "communication",
      question: "How effectively does your team communicate with customers?",
      options: [
        { value: 1, label: "Phone calls and emails only", description: "Limited channels, slow response" },
        { value: 2, label: "Multiple channels but not organized", description: "WhatsApp, SMS, email but fragmented" },
        { value: 3, label: "Organized multi-channel approach", description: "Good coverage but manual management" },
        { value: 4, label: "Automated multi-channel system", description: "Seamless, automated customer engagement" }
      ]
    },
    {
      id: "team-productivity",
      category: "operations",
      question: "How much time does your team spend on manual, repetitive tasks?",
      options: [
        { value: 1, label: "Most of their time (60%+)", description: "Heavy manual work, low efficiency" },
        { value: 2, label: "About half their time (40-60%)", description: "Significant manual processes" },
        { value: 3, label: "Some manual work (20-40%)", description: "Moderate automation in place" },
        { value: 4, label: "Minimal manual work (<20%)", description: "Highly automated processes" }
      ]
    },
    {
      id: "data-insights",
      category: "growth",
      question: "How well do you understand your business performance metrics?",
      options: [
        { value: 1, label: "Limited visibility", description: "Basic reports, unclear ROI" },
        { value: 2, label: "Some reports but hard to access", description: "Data exists but difficult to analyze" },
        { value: 3, label: "Good reporting with some gaps", description: "Regular reports but missing connections" },
        { value: 4, label: "Real-time comprehensive analytics", description: "Full visibility across all metrics" }
      ]
    },
    {
      id: "sales-process",
      category: "sales",
      question: "How structured is your sales process?",
      options: [
        { value: 1, label: "No formal process", description: "Ad-hoc approach, inconsistent results" },
        { value: 2, label: "Basic process but not followed", description: "Guidelines exist but not enforced" },
        { value: 3, label: "Good process with some gaps", description: "Structured but missing automation" },
        { value: 4, label: "Fully automated sales pipeline", description: "Systematic, tracked, and optimized" }
      ]
    },
    {
      id: "team-collaboration",
      category: "operations",
      question: "How well does your team collaborate and share information?",
      options: [
        { value: 1, label: "Poor information sharing", description: "Siloed teams, communication gaps" },
        { value: 2, label: "Some collaboration tools", description: "Basic tools but inconsistent use" },
        { value: 3, label: "Good collaboration systems", description: "Regular communication, shared resources" },
        { value: 4, label: "Seamless team integration", description: "Real-time collaboration, shared visibility" }
      ]
    },
    {
      id: "customer-service",
      category: "communication",
      question: "How quickly and effectively do you resolve customer issues?",
      options: [
        { value: 1, label: "Slow response, manual tracking", description: "Hours/days to respond, issues get lost" },
        { value: 2, label: "Moderate response time", description: "Some tracking but manual processes" },
        { value: 3, label: "Good response with tracking", description: "Organized system, reasonable speed" },
        { value: 4, label: "Instant response with automation", description: "Automated routing, fast resolution" }
      ]
    },
    {
      id: "business-growth",
      category: "growth",
      question: "How predictable is your business growth?",
      options: [
        { value: 1, label: "Very unpredictable", description: "Revenue fluctuates wildly, hard to forecast" },
        { value: 2, label: "Some patterns but inconsistent", description: "General trends but many surprises" },
        { value: 3, label: "Mostly predictable growth", description: "Good forecasting with occasional surprises" },
        { value: 4, label: "Highly predictable pipeline", description: "Accurate forecasts, systematic growth" }
      ]
    }
  ];

  // Calculate color based on score percentage (red -> yellow -> green)
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "hsl(var(--chart-2))"; // Green
    if (percentage >= 70) return "hsl(142, 76%, 45%)"; // Light green
    if (percentage >= 60) return "hsl(60, 100%, 45%)"; // Yellow-green
    if (percentage >= 50) return "hsl(45, 100%, 50%)"; // Yellow
    if (percentage >= 40) return "hsl(30, 100%, 55%)"; // Orange
    if (percentage >= 30) return "hsl(15, 100%, 60%)"; // Orange-red
    return "hsl(var(--chart-1))"; // Red
  };

  const getScoreColorClass = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 70) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    if (percentage >= 50) return "text-yellow-600";
    if (percentage >= 40) return "text-orange-500";
    if (percentage >= 30) return "text-orange-600";
    return "text-red-600";
  };

  // Save assessment results to localStorage
  const saveAssessmentResults = (results: AssessmentResult, answers: Record<string, number>) => {
    const assessmentData = {
      results,
      answers,
      timestamp: new Date().toISOString(),
      questions: questions
    };
    localStorage.setItem('insync-assessment-results', JSON.stringify(assessmentData));
  };

  // Export results as PDF
  const exportToPDF = (results: AssessmentResult, answers: Record<string, number>) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('In-Sync Business Assessment Results', 20, 20);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Assessment Date: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Overall Score
    doc.setFontSize(16);
    doc.text(`Overall Score: ${Math.round(results.score)}%`, 20, 55);
    doc.text(`Level: ${results.title}`, 20, 70);
    
    // Description
    doc.setFontSize(12);
    const splitDescription = doc.splitTextToSize(results.description, 170);
    doc.text(splitDescription, 20, 85);
    
    // Category Breakdown
    let yPos = 110;
    doc.setFontSize(14);
    doc.text('Performance by Category:', 20, yPos);
    yPos += 15;
    
    Object.entries({
      operations: "Operations",
      sales: "Sales Process", 
      communication: "Communication",
      growth: "Growth & Analytics"
    }).forEach(([category, label]) => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const categoryAnswers = categoryQuestions.map(q => answers[q.id] || 0);
      const categoryScore = categoryAnswers.reduce((sum, score) => sum + score, 0);
      const categoryMax = categoryQuestions.length * 4;
      const categoryPercentage = (categoryScore / categoryMax) * 100;
      
      doc.setFontSize(12);
      doc.text(`${label}: ${Math.round(categoryPercentage)}%`, 25, yPos);
      yPos += 12;
    });
    
    // Recommendations
    yPos += 10;
    doc.setFontSize(14);
    doc.text('Recommendations:', 20, yPos);
    yPos += 15;
    
    results.recommendations.forEach((rec, index) => {
      doc.setFontSize(12);
      const splitRec = doc.splitTextToSize(`${index + 1}. ${rec}`, 170);
      doc.text(splitRec, 25, yPos);
      yPos += splitRec.length * 6 + 5;
    });
    
    // Save the PDF
    doc.save('insync-business-assessment-results.pdf');
  };

  const calculateResults = (): AssessmentResult => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let result: AssessmentResult;

    if (percentage >= 85) {
      result = {
        score: percentage,
        level: "excellent",
        title: "Business Excellence",
        description: "Your business operations are highly optimized. You're already operating at a high level with strong systems in place.",
        recommendations: [
          "Consider advanced AI features to push efficiency even higher",
          "Explore custom integrations for unique business needs",
          "Implement predictive analytics for market trends",
          "Focus on scaling your proven systems"
        ],
        color: getScoreColorClass(percentage)
      };
    } else if (percentage >= 65) {
      result = {
        score: percentage,
        level: "good",
        title: "Strong Foundation",
        description: "You have good systems in place but there's room for optimization. Strategic improvements could significantly boost your efficiency.",
        recommendations: [
          "Integrate your existing tools into a unified platform",
          "Automate remaining manual processes",
          "Implement advanced analytics for better insights",
          "Enhance customer communication channels"
        ],
        color: getScoreColorClass(percentage)
      };
    } else if (percentage >= 45) {
      result = {
        score: percentage,
        level: "needs-improvement",
        title: "Improvement Opportunities",
        description: "Your business has potential but inefficiencies are holding you back. Systematic improvements could unlock significant growth.",
        recommendations: [
          "Implement a comprehensive CRM system",
          "Automate repetitive manual tasks",
          "Establish structured sales and communication processes",
          "Invest in team collaboration tools"
        ],
        color: getScoreColorClass(percentage)
      };
    } else {
      result = {
        score: percentage,
        level: "critical",
        title: "Critical Action Needed",
        description: "Your business is facing significant operational challenges. Immediate action is needed to prevent inefficiencies and missed opportunities.",
        recommendations: [
          "Start with basic CRM and communication tools",
          "Eliminate manual processes that waste time",
          "Implement customer tracking and follow-up systems",
          "Establish basic reporting and analytics"
        ],
        color: getScoreColorClass(percentage)
      };
    }

    // Save results to localStorage
    saveAssessmentResults(result, answers);
    
    return result;
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const results = showResults ? calculateResults() : null;

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQ.id]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const categoryIcons = {
    operations: Users,
    sales: Target,
    communication: Zap,
    growth: TrendingUp
  };

  const CategoryIcon = categoryIcons[currentQ?.category] || ClipboardCheck;

  if (showResults && results) {
    return (
      <div className={`w-full max-w-6xl mx-auto ${className}`}>
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Assessment Results</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score Display */}
            <Card>
              <CardContent className="text-center p-8">
                <div 
                  className="text-6xl font-bold mb-4"
                  style={{ color: getScoreColor(results.score) }}
                >
                  {Math.round(results.score)}%
                </div>
                <div className="space-y-2">
                  <h3 className={`text-2xl font-bold ${results.color}`}>
                    {results.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {results.description}
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  <Progress 
                    value={results.score} 
                    className="h-3 max-w-md mx-auto"
                    indicatorColor={getScoreColor(results.score)}
                  />
                  <Button
                    onClick={() => exportToPDF(results, answers)}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries({
                    operations: "Operations",
                    sales: "Sales Process", 
                    communication: "Communication",
                    growth: "Growth & Analytics"
                  }).map(([category, label]) => {
                    const categoryQuestions = questions.filter(q => q.category === category);
                    const categoryAnswers = categoryQuestions.map(q => answers[q.id] || 0);
                    const categoryScore = categoryAnswers.reduce((sum, score) => sum + score, 0);
                    const categoryMax = categoryQuestions.length * 4;
                    const categoryPercentage = (categoryScore / categoryMax) * 100;
                    const Icon = categoryIcons[category as keyof typeof categoryIcons];

                    return (
                      <div key={category} className="text-center p-4 border rounded-lg">
                        <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <div 
                          className={`text-2xl font-bold mb-1 ${getScoreColorClass(categoryPercentage)}`}
                        >
                          {Math.round(categoryPercentage)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="font-semibold">Ready to Transform?</h3>
                <div className="space-y-3">
                  <Button variant="outline" size="lg" onClick={resetAssessment} className="w-full">
                    Retake Assessment
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get a personalized demo based on your assessment results
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ClipboardCheck className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Business Readiness Assessment</h2>
        </div>
        <p className="text-muted-foreground">
          Answer 8 quick questions to discover how In-Sync can transform your business operations
        </p>
        <div className="mt-4">
          <Progress 
            value={progress} 
            className="h-2"
            indicatorColor="hsl(var(--primary))"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CategoryIcon className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="outline" className="text-xs">
              {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
            </Badge>
          </div>
          <CardTitle className="text-xl">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQ.id]?.toString() || ""}
            onValueChange={(value) => handleAnswer(Number(value))}
            className="space-y-4"
          >
            {currentQ.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                onClick={() => handleAnswer(option.value)}
              >
                <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                <div className="flex-1">
                  <Label 
                    htmlFor={`option-${option.value}`} 
                    className="font-medium cursor-pointer"
                  >
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAssessment;