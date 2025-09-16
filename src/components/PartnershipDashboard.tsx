import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  CheckCircle, 
  FileText, 
  Download, 
  ExternalLink,
  User,
  Building,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Calendar,
  Activity
} from "lucide-react";

interface Partnership {
  id: string;
  partnership_id: string;
  full_name: string;
  company_name?: string;
  email: string;
  contact_number: string;
  status: string;
  created_at: string;
  pan_number: string;
  gst_number?: string;
  address: string;
  proposed_territory: string;
  commission_setup: number;
  commission_recurring: number;
}

interface PartnershipDocument {
  id: string;
  document_id: string;
  document_type: string;
  status: string;
  content?: string;
  generated_at: string;
  signed_at?: string;
}

interface PartnershipActivity {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
  metadata?: any;
}

interface PartnershipDashboardProps {
  partnershipId: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending_kyc': return 'default';
    case 'kyc_approved': return 'secondary';
    case 'agreement_generated': return 'outline';
    case 'agreement_sent': return 'outline';
    case 'agreement_signed': return 'success';
    case 'active': return 'success';
    case 'rejected': return 'destructive';
    default: return 'default';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending_kyc': return 'Pending KYC';
    case 'kyc_approved': return 'KYC Approved';
    case 'agreement_generated': return 'Agreement Generated';
    case 'agreement_sent': return 'Agreement Sent';
    case 'agreement_signed': return 'Agreement Signed';
    case 'active': return 'Active Partnership';
    case 'rejected': return 'Rejected';
    default: return status;
  }
};

export default function PartnershipDashboard({ partnershipId }: PartnershipDashboardProps) {
  const [partnership, setPartnership] = useState<Partnership | null>(null);
  const [documents, setDocuments] = useState<PartnershipDocument[]>([]);
  const [activities, setActivities] = useState<PartnershipActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingAgreement, setGeneratingAgreement] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPartnershipData();
  }, [partnershipId]);

  const fetchPartnershipData = async () => {
    try {
      setLoading(true);
      
      // Fetch partnership details
      const partnershipResponse = await fetch(`/api/partnerships/${partnershipId}`);
      if (partnershipResponse.ok) {
        const partnershipData = await partnershipResponse.json();
        setPartnership(partnershipData);
      }

      // Fetch documents
      const documentsResponse = await fetch(`/api/partnerships/${partnershipId}/documents`);
      if (documentsResponse.ok) {
        const documentsData = await documentsResponse.json();
        setDocuments(documentsData);
      }

      // Fetch activities
      const activitiesResponse = await fetch(`/api/partnerships/${partnershipId}/activities`);
      if (activitiesResponse.ok) {
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData);
      }
    } catch (error) {
      console.error('Error fetching partnership data:', error);
      toast({
        title: "Error",
        description: "Failed to load partnership data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAgreement = async () => {
    setGeneratingAgreement(true);
    
    try {
      const response = await fetch('/api/partnerships/generate-agreement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partnershipId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate agreement');
      }

      const result = await response.json();
      
      toast({
        title: "Agreement Generated",
        description: "Partnership agreement has been generated successfully.",
      });

      // Refresh data
      fetchPartnershipData();
      
    } catch (error) {
      console.error('Agreement generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate partnership agreement.",
        variant: "destructive",
      });
    } finally {
      setGeneratingAgreement(false);
    }
  };

  const downloadDocument = (doc: PartnershipDocument) => {
    if (!doc.content) return;
    
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${doc.document_id}.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!partnership) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">Partnership not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Partnership Dashboard</h1>
          <p className="text-muted-foreground">Partnership ID: {partnership.partnership_id}</p>
        </div>
        <div className="text-right">
          <Badge variant={getStatusColor(partnership.status) as any} className="mb-2">
            {getStatusText(partnership.status)}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Applied on {new Date(partnership.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Partner Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Partner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="font-medium">{partnership.full_name}</p>
                </div>
                {partnership.company_name && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Company</label>
                    <p className="font-medium">{partnership.company_name}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {partnership.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Contact</label>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {partnership.contact_number}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">PAN Number</label>
                  <p className="font-medium">{partnership.pan_number}</p>
                </div>
                {partnership.gst_number && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">GST Number</label>
                    <p className="font-medium">{partnership.gst_number}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Territory</label>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {partnership.proposed_territory}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Commission Structure</label>
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {partnership.commission_setup}% setup, {partnership.commission_recurring}% recurring
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{partnership.address}</p>
            </CardContent>
          </Card>
        </div>

        {/* Documents & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {documents.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No documents available</p>
              ) : (
                documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{doc.document_type.replace('_', ' ').toUpperCase()}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(doc.generated_at).toLocaleDateString()}
                      </p>
                      <Badge variant="outline">
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => downloadDocument(doc)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {doc.status === 'sent_for_signature' && (
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
              
              {partnership.status === 'kyc_approved' && documents.length === 0 && (
                <Button 
                  onClick={generateAgreement}
                  disabled={generatingAgreement}
                  className="w-full"
                >
                  {generatingAgreement ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Agreement
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 mt-1 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {activities.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No activities yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}