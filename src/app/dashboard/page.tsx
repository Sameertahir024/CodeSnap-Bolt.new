'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import TokenCounter from './_components/TokenCounter';
import { loadStripe } from '@stripe/stripe-js';
import { createClient } from '@/lib/supabase/browserClient';

export default function AIDetector() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Handle payment success/cancel toasts
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful! Your tokens have been added.');
    } else if (searchParams.get('canceled') === 'true') {
      toast.error('Payment was canceled.');
    }
  }, [searchParams]);

  const handlePaymentChoice = async (choice: 'pack' | 'subscribe') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to make a payment');
        return;
      }

      const { url } = await fetch(
        choice === 'subscribe' ? '/api/payment/subscribe' : '/api/payment/pack',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: user.id, 
            email: user.email 
          }),
        }
      ).then(res => res.json());

      window.location.href = url;
    } catch (error) {
      toast.error('Failed to initiate payment');
      console.error(error);
    }
  };

  const detectContent = async () => {
    if (!text.trim()) {
      setError('Please enter text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // 1. First check/use token
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to use this feature');
        return;
      }
      
      const tokenResponse = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });

      if (tokenResponse.status === 402) {
        // Handle payment requirement
        const { currentTier } = await tokenResponse.json();
        
        if (currentTier === 'basic') {
          setPaymentDialogOpen(true);
          return;
        }
      }

      // 2. If token consumed successfully, perform detection
      const options = {
        method: 'POST',
        url: 'https://ai-content-detector6.p.rapidapi.com/v1/ai-detector',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_KEY,
          'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_HOST,
          'Content-Type': 'application/json'
        },
        data: { text }
      };

      const response = await axios.request(options);
      setResult(response.data);
      toast.success('Analysis complete!');

    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to detect content';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 pt-20">
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>You're out of tokens!</DialogTitle>
            <DialogDescription>
              Choose how you'd like to continue:
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Option 1: Token Pack</h4>
              <p className="text-sm text-muted-foreground">
                Get 5 more tokens for $5 (one-time purchase)
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Option 2: Unlimited Subscription</h4>
              <p className="text-sm text-muted-foreground">
                Unlimited access for $10/month (cancel anytime)
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => handlePaymentChoice('pack')}
              className="w-full"
            >
              Buy Token Pack
            </Button>
            <Button 
              onClick={() => handlePaymentChoice('subscribe')} 
              className="w-full"
            >
              Subscribe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className='flex flex-wrap gap-2'>
      
        
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Confidence</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {result?.confidence || '--'}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">Detection confidence level</div>
          </CardFooter>
        </Card>

        {/* Other cards remain the same */}
        {/* ... */}
      </div>
        
      <h1 className="text-2xl font-bold">🧠 AI Content Detector</h1>
      
      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type text to check if it's AI-generated..."
        className="w-full border rounded p-3 text-sm"
      />

      <Button
        onClick={detectContent}
        size="lg" 
        className="text-sm px-8"
        disabled={loading || !text.trim()}
      >
        {loading ? 'Analyzing...' : 'Detect AI Content'}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Detailed Analysis</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}