import { useState, useEffect, useRef } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const authSchema = z.object({
  userId: z.string().min(1, 'Please enter your user ID'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({ userId: '', password: '' });
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    // Redirect if user is already authenticated
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    setIsLoading(true);

    try {
      const validation = authSchema.parse(signInData);
      const { error } = await signIn(validation.userId, validation.password, captchaToken);
      
      if (!error) {
        navigate('/');
      } else {
        // Reset captcha on error
        captchaRef.current?.resetCaptcha();
        setCaptchaToken('');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      // Reset captcha on error
      captchaRef.current?.resetCaptcha();
      setCaptchaToken('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to In-Sync</CardTitle>
          <CardDescription>
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your user ID"
                value={signInData.userId}
                onChange={(e) => setSignInData({ ...signInData, userId: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-4">
              <HCaptcha
                ref={captchaRef}
                sitekey="10000000-ffff-ffff-ffff-000000000001" // Test site key - replace with your actual site key
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken('')}
                onError={() => setCaptchaToken('')}
              />
              <Button type="submit" className="w-full" disabled={isLoading || !captchaToken}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}