import React, { useState } from "react";
import PartnershipShowcase from "@/components/PartnershipShowcase";
import PartnershipDashboard from "@/components/PartnershipDashboard";

export default function Partnership() {
  const [partnershipId, setPartnershipId] = useState<string | null>(null);

  const handleEnrollmentSuccess = (data: { partnershipId: string }) => {
    setPartnershipId(data.partnershipId);
  };

  return (
    <div className="min-h-screen bg-background">
      {partnershipId ? (
        <PartnershipDashboard partnershipId={partnershipId} />
      ) : (
        <PartnershipShowcase onEnrollmentSuccess={handleEnrollmentSuccess} />
      )}
    </div>
  );
}