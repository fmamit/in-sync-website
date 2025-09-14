import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImageFromUrl } from '@/utils/backgroundRemoval';
import { toast } from 'sonner';

// Import the logos that need background removal
import incredLogo from '@/assets/incred-logo.png';
import capitalIndiaLogo from '@/assets/capital-india-logo.png';
import evcoLogo from '@/assets/evco-logo.png';

const LogoProcessor = () => {
  const [processing, setProcessing] = useState(false);

  const processLogos = async () => {
    setProcessing(true);
    toast.info('Starting background removal for logos...');

    try {
      const logos = [
        { src: incredLogo, name: 'incred-logo-processed.png' },
        { src: capitalIndiaLogo, name: 'capital-india-logo-processed.png' },
        { src: evcoLogo, name: 'evco-logo-processed.png' }
      ];

      for (const logo of logos) {
        try {
          console.log(`Processing ${logo.name}...`);
          const img = await loadImageFromUrl(logo.src);
          const processedBlob = await removeBackground(img);
          
          // Create download link
          const url = URL.createObjectURL(processedBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = logo.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          toast.success(`Processed ${logo.name}`);
        } catch (error) {
          console.error(`Error processing ${logo.name}:`, error);
          toast.error(`Failed to process ${logo.name}`);
        }
      }
      
      toast.success('Background removal completed! Check your downloads.');
    } catch (error) {
      console.error('Error processing logos:', error);
      toast.error('Failed to process logos');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-card p-4 rounded-lg border shadow-lg">
      <h3 className="text-sm font-medium mb-2">Logo Background Removal</h3>
      <Button 
        onClick={processLogos} 
        disabled={processing}
        size="sm"
      >
        {processing ? 'Processing...' : 'Remove Backgrounds'}
      </Button>
      <p className="text-xs text-muted-foreground mt-1">
        This will download processed logos with transparent backgrounds.
      </p>
    </div>
  );
};

export default LogoProcessor;