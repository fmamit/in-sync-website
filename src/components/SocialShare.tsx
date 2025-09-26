import { Share2, Linkedin, Twitter, Facebook, Link2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface SocialShareProps {
  title: string;
  excerpt: string;
  url: string;
  imageUrl?: string;
}

export const SocialShare = ({ title, excerpt, url, imageUrl }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedImageUrl = imageUrl ? encodeURIComponent(`${window.location.origin}${imageUrl}`) : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=InSyncCX`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0ARead more: ${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share this article:</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('linkedin')}
          className="text-[#0077B5] hover:text-[#0077B5] hover:bg-[#0077B5]/10"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">LinkedIn</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="text-[#000000] hover:text-[#000000] hover:bg-black/10"
          title="Share on X"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">X</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10"
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Facebook</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('email')}
          className="text-muted-foreground hover:text-foreground"
          title="Share via Email"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Email</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-foreground"
          title="Copy Link"
        >
          <Link2 className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
      </div>
    </div>
  );
};