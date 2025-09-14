import crmLeadsView from "@/assets/crm-leads-new.png";
import crmDetailView from "@/assets/crm-detail-new.png";
import autodialerView from "@/assets/autodialer-new.png";
import dripMarketingView from "@/assets/drip-marketing-new.png";

const CRMShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-50/25 via-teal-50/15 to-cyan-50/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            See{" "}
            <span className="text-purple-600">
              In-Sync CRM
            </span>{" "}
            in Action
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience our intuitive interface designed for modern sales teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* CRM Leads Management */}
          <div className="space-y-4">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/10">
              <img 
                src={crmLeadsView} 
                alt="In-Sync CRM Leads Management Interface"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">CRM & Leads Management</h4>
              <p className="text-sm text-muted-foreground">
                Advanced CRM with lead tracking, filtering, and comprehensive customer data management
              </p>
            </div>
          </div>

          {/* Customer Support Details */}
          <div className="space-y-4">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/10">
              <img 
                src={crmDetailView} 
                alt="In-Sync Customer Support Detail View"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Customer Support Hub</h4>
              <p className="text-sm text-muted-foreground">
                Complete customer support workflow with ticket management, timeline tracking, and team collaboration
              </p>
            </div>
          </div>

          {/* Auto Dialler */}
          <div className="space-y-4">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/10">
              <img 
                src={autodialerView} 
                alt="In-Sync Auto Dialler Interface"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Auto Dialler</h4>
              <p className="text-sm text-muted-foreground">
                Automated calling campaigns with progress tracking, agent assignment, and bulk upload capabilities
              </p>
            </div>
          </div>

          {/* Drip Marketing */}
          <div className="space-y-4">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/10">
              <img 
                src={dripMarketingView} 
                alt="In-Sync Drip Marketing Campaign Interface"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Automated Marketing</h4>
              <p className="text-sm text-muted-foreground">
                Multi-channel drip campaigns with WhatsApp, SMS, and Email integration for maximum reach
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMShowcase;