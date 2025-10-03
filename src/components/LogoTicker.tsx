import insyncLogo from "@/assets/insync-logo-color.png";

const LogoTicker = () => {
  return (
    <div className="sticky top-20 z-40 w-full bg-primary/5 border-b border-border overflow-hidden py-3">
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <img 
                src={insyncLogo} 
                alt="In-Sync" 
                className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-0 flex animate-ticker whitespace-nowrap" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <img 
                src={insyncLogo} 
                alt="In-Sync" 
                className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;