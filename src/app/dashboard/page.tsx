'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { createClient } from '@/lib/supabase/browserClient';
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import PdfToText from "react-pdftotext";
import { useToken } from '@/contexts/TokenContext';
import { Upload } from "lucide-react";


export default function AIDetector() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { refreshTokens } = useToken();
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful! Your tokens have been added.');
    } else if (searchParams.get('canceled') === 'true') {
      toast.error('Payment was canceled.');
    }
  }, [searchParams]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await PdfToText(file);
      setText(text);
      setError("");
    } catch (err) {
      console.error("PDF extraction error:", err);
      setError("Failed to extract text from PDF.");
    }
  };
  const handlePaymentChoice = async (choice: 'pack' | 'subscribe') => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
      await refreshTokens();

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
                Get 5 more tokens for $1.99 (one-time purchase)
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Option 2: Unlimited Subscription</h4>
              <p className="text-sm text-muted-foreground">
                Unlimited access for $20/month (cancel anytime)
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => handlePaymentChoice('pack')}
              className="w-full"
              disabled={loading}
            >
              {loading ? 'loading...' : 'Buy Token Pack'}
            </Button>
            <Button 
              onClick={() => handlePaymentChoice('subscribe')} 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'loading...' : 'Subscribe'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
  {[
    {
      label: 'Confidence',
      value: result?.confidence || '--',
      description: 'Detection confidence level',
    },
    {
      label: 'Language',
      value: result?.language || '--',
      description: 'Detection language',
    },
    {
      label: 'Predicted Class',
      value: result?.predicted_class || '--',
      description: 'Final prediction: AI, Human, or Mixed',
    },
    {
      label: 'AI Probability',
      value: result?.probabilities.ai || '--',
      description: 'Probability that this was AI-written',
    },
    {
      label: 'Human Probability',
      value: result?.probabilities.human || '--',
      description: 'Probability that this was Human-written',
    },
    {
      label: 'Mixed Probability',
      value: result?.probabilities.mix || '--',
      description: 'Probability that it was partly AI + Human',
    },
  ].map((item, index) => (
    <Card key={index} className="rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardDescription className="text-gray-500 dark:text-gray-400">{item.label}</CardDescription>
        <CardTitle className="text-xl font-bold uppercase  tabular-nums">
          {item.value}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{item.description}</div>
      </CardFooter>
    </Card>
  ))}
</div>

        
      {/* Attractive Header */}
      <div className="flex items-center gap-3 group">
        <Sparkles className="h-8 w-8 text-primary fill-current transition-transform group-hover:rotate-12" />
        <h1 className="text-6xl  font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-none">
          AI Content Detector
        </h1>
        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          Beta
        </span>
      </div>

      {/* Enhanced Text Area */}
      <div className="relative">
        <Textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to analyze for AI-generated content..."
          className="w-full p-6 text-base border-2 rounded-xl shadow-sm hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors duration-200 min-h-[200px]"
        />

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {text.length}/2000
          </span>
          <button onClick={() => setText('')} className="text-sm text-primary hover:underline">
            Clear
          </button>
          <div className="relative">
    {/* Hidden file input */}
    <input
      type="file"
      accept="application/pdf"
      onChange={handlePdfUpload}
      ref={fileInputRef}
      className="hidden"
    />
    
    {/* Styled upload button */}
    <button
      type="button"
      onClick={handleButtonClick}
      className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <Upload className="w-5 h-5" />
      {/* <span>Upload PDF</span> */}
    </button>
  </div>
        </div>
      </div>

      {/* Character Counter (appears when typing) */}
      {text.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Minimum 50 characters recommended</span>
          <span>
            {text.length >= 50 ? (
              <span className="text-green-500">✓ Ready to analyze</span>
            ) : (
              <span className="text-orange-500">More text needed</span>
            )}
          </span>
        </div>
      )}


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