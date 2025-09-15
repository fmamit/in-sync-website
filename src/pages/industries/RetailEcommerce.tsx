import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RetailEcommerce = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 px-4">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground">
            Home &gt; Industries &gt; Retail &amp; E-commerce
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Stop Losing Customers to Brands That Deliver Better Experiences
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform inventory chaos and poor customer communication into a unified retail engine that increases customer lifetime value by 300%, eliminates stockouts that cost sales, and builds the loyal customer base that drives sustainable growth.
                </p>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-primary">What This Means for Your Business:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Convert one-time buyers into repeat customers who spend 5x more
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Never lose a sale due to stockouts or poor inventory visibility
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Build a customer database that generates predictable monthly revenue
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Compete with larger brands through superior customer experience
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  See How Top Retailers Build Customer Loyalty - Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Calculate Your Customer Lifetime Value Potential
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">🛍️</div>
              <p className="opacity-80">Transform your retail business in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">The Customer Experience Crisis Killing Your Growth</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              <strong>Your Customers Buy Once and Disappear Forever</strong>
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              In retail, acquiring a customer costs money. Making profit requires repeat purchases. But when customers can't get updates on their orders, when you're out of stock on popular items, when follow-up is random - they shop somewhere else next time. You're paying acquisition costs for one-time transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-destructive">The Profit Killers:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Single-Purchase Customers:</strong> 80% of customers never buy again due to poor experience</li>
                  <li><strong>Inventory Disasters:</strong> Stockouts lose immediate sales and future customer trust</li>
                  <li><strong>Communication Gaps:</strong> Customers feel ignored and switch to more responsive brands</li>
                  <li><strong>Staff Inefficiency:</strong> Team spends time on manual tasks instead of serving customers</li>
                  <li><strong>Missed Opportunities:</strong> Can't identify or target your most valuable customers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-primary">Success Indicators:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Customer Loyalty:</strong> High repeat purchase rates and customer lifetime value</li>
                  <li><strong>Inventory Excellence:</strong> Optimal stock levels with minimal stockouts</li>
                  <li><strong>Responsive Communication:</strong> Customers feel valued and informed throughout their journey</li>
                  <li><strong>Team Efficiency:</strong> Staff focus on high-value customer service activities</li>
                  <li><strong>Data-Driven Decisions:</strong> Clear insights into customer behavior and preferences</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">How Leading Indian Retail Brands Build Customer Empires</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Turn Every Customer into a Repeat Revenue Stream</h3>
                <p className="text-lg font-semibold text-primary mb-4">From One-Time Buyers to Loyal Advocates</p>
                <p className="text-muted-foreground mb-6">
                  While competitors treat customers as transactions, you track preferences, automate personalized communication, and create experiences that make customers choose you repeatedly. Result? Higher lifetime value and predictable growth.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Customer Loyalty Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>300% Higher Customer Value:</strong> Repeat customers spend ₹15,000 annually vs ₹5,000 one-time</li>
                      <li><strong>Organic Growth Engine:</strong> Loyal customers refer friends and family automatically</li>
                      <li><strong>Premium Pricing Power:</strong> Great experience justifies higher prices than competitors</li>
                      <li><strong>Predictable Revenue:</strong> Know exactly how much your customer base will generate monthly</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Transform Inventory Management into Competitive Advantage</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Stockout Disasters to Perfect Availability</p>
                <p className="text-muted-foreground mb-6">
                  Never again tell customers "sorry, out of stock" or discover you're overstocked on slow-moving items. Real-time inventory visibility and automated reorder alerts ensure you have what customers want when they want it.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Revenue Protection Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Zero Lost Sales:</strong> Always have popular items in stock when customers want to buy</li>
                      <li><strong>40% Better Cash Flow:</strong> Optimize inventory levels without tying up excess capital</li>
                      <li><strong>Customer Trust Building:</strong> Reliable availability creates confidence in your brand</li>
                      <li><strong>Seasonal Success:</strong> Plan inventory for festivals and peak seasons systematically</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Make Your Team More Productive and Customer-Focused</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Manual Chaos to Automated Excellence</p>
                <p className="text-muted-foreground mb-6">
                  Your staff should spend time helping customers, not updating spreadsheets or chasing inventory information. Systematic processes free them to focus on sales and service that drives revenue.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Team Performance Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>60% More Selling Time:</strong> Automated processes eliminate administrative work</li>
                      <li><strong>Better Customer Service:</strong> Staff have instant access to customer history and preferences</li>
                      <li><strong>Higher Sales per Hour:</strong> Productive teams generate more revenue per shift</li>
                      <li><strong>Reduced Stress:</strong> Organized systems create better working environment</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Build Customer Intelligence That Drives Growth</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Guessing to Knowing Your Market</p>
                <p className="text-muted-foreground mb-6">
                  Stop making buying decisions based on gut feelings. Understand which products sell to which customers, when they buy, and what motivates repeat purchases. Use this intelligence to stock winners and eliminate losers.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Business Intelligence Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Product Performance Clarity:</strong> Know which items generate highest profit margins</li>
                      <li><strong>Customer Segmentation:</strong> Identify and target your most valuable customer groups</li>
                      <li><strong>Seasonal Planning:</strong> Predict demand patterns and prepare inventory accordingly</li>
                      <li><strong>Marketing ROI:</strong> Track which promotions actually drive profitable sales</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Real Results from Real Indian Retailers</h2>
          </div>

          <Card className="border-primary/20 bg-background">
            <CardContent className="pt-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Mumbai Fashion Store Increases Revenue by 400% with Same Location</h3>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 text-destructive">The Revenue Plateau:</h4>
                    <p className="text-sm text-muted-foreground">
                      A successful boutique fashion store had hit a revenue ceiling at ₹25 lakh monthly. Despite great products and location, customers rarely returned for second purchases. Inventory management was chaotic, and popular items were frequently out of stock.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Customer Experience Revolution:</h4>
                    <p className="text-sm text-muted-foreground">
                      In-sync provided complete customer tracking, automated follow-up communication, and real-time inventory management. Every customer became a relationship, not just a transaction.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Growth Explosion:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><strong>400% revenue increase:</strong> From ₹25 lakh to ₹1.25 crore monthly</li>
                      <li><strong>70% repeat customer rate:</strong> Customers now return every 2-3 months instead of never</li>
                      <li><strong>₹45,000 average annual customer value:</strong> Up from ₹12,000 through repeat purchases</li>
                      <li><strong>Zero stockout losses:</strong> Popular items always available when customers want them</li>
                    </ul>
                  </div>
                </div>
                
                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
                  "We realized we weren't in the fashion business - we were in the customer relationship business. Once we started treating customers as relationships to nurture instead of transactions to complete, everything changed." - Owner, Mumbai Fashion Boutique
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Strategic Choice Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Retail Excellence is Make-or-Break in Today's Market</h2>
            <p className="text-xl font-semibold text-primary mb-4">E-commerce Has Raised Customer Expectations</p>
            <p className="text-lg text-muted-foreground">
              Customers now expect instant communication, real-time order updates, and personalized service whether they shop online or offline. Retailers who can't deliver this experience lose customers to those who can.
            </p>
          </div>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-destructive">Your Competitive Choice:</h3>
              <ul className="space-y-3 text-sm">
                <li>• Keep treating customers as one-time transactions while competitors build loyalty</li>
                <li>• Watch profit margins shrink as you constantly acquire new customers at high cost</li>
                <li>• Continue losing sales to stockouts while competitors stay in stock</li>
                <li><strong>OR build the customer experience machine that creates sustainable competitive advantage</strong></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What Makes In-sync Perfect for Indian Retail</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Built for Retail Growth Reality</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Complete Customer Lifecycle:</strong> Track every interaction from first visit to loyal advocate</li>
                  <li><strong>Real-time Inventory Control:</strong> Never guess about stock levels or product availability</li>
                  <li><strong>Omnichannel Coordination:</strong> Unify online and offline customer experiences</li>
                  <li><strong>Team Productivity Enhancement:</strong> Automate manual tasks to focus on customer service</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Proven Retail Integration Capabilities</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Excel Integration:</strong> Import existing customer and product data instantly</li>
                  <li><strong>WhatsApp Business:</strong> Communicate with customers on their preferred platform</li>
                  <li><strong>SMS Automation:</strong> Order updates and promotional messages</li>
                  <li><strong>Analytics Integration:</strong> Power BI for advanced retail insights and reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Transform Your Retail Business into a Customer Magnet</h2>
            <p className="text-xl font-semibold text-primary">See Customer Loyalty Improvement in 30 Days Guaranteed</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 1</div>
                <p className="text-sm">Set up customer tracking and import existing sales data</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 2</div>
                <p className="text-sm">Deploy automated customer communication and inventory management</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 3</div>
                <p className="text-sm">Start tracking customer preferences and purchase patterns</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 4</div>
                <p className="text-sm">Watch repeat purchase rates climb and customer satisfaction soar</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/5 mb-12">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">What You Get:</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li>• Complete customer relationship management across all sales channels</li>
                <li>• Real-time inventory tracking and automated reorder alerts</li>
                <li>• Automated customer communication via WhatsApp, SMS, and email</li>
                <li>• Customer behavior analytics and business intelligence reporting</li>
                <li>• Unlimited users for your entire sales and operations team</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Stop Losing Customers to Better-Organized Competitors?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Schedule Your Demo Now</h3>
                <p className="text-sm opacity-90 mb-6">
                  See exactly how In-sync transforms one-time buyers into loyal customers for retailers just like yours.
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Calculate Your Customer Value Potential</h3>
                <p className="text-sm opacity-90 mb-6">
                  Discover how much revenue you're missing by not systematically building customer relationships.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Calculate Customer Value
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Get Your Retail Growth Strategy</h3>
                <p className="text-sm opacity-90 mb-6">
                  Our retail experts will design a customer experience system that drives repeat business and sustainable growth.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Get Growth Strategy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RetailEcommerce;