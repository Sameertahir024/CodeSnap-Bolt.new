'use client';

import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { Loader2, Sparkles, Link as LinkIcon, ClipboardCopy, Check, Upload } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { createClient } from '@/lib/supabase/browserClient';
import { useToken } from '@/contexts/TokenContext';

export default function ArticleSummarizer() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { refreshTokens } = useToken();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful! Your tokens have been added.');
    } else if (searchParams.get('canceled') === 'true') {
      toast.error('Payment was canceled.');
    }
  }, [searchParams]);

  const handlePaymentChoice = async (choice: 'pack' | 'subscribe') => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!url.startsWith("http")) {
      toast.error("Please enter a valid URL starting with http or https");
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      // 1. First check/use token
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to use this feature');
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

      // 2. If token consumed successfully, perform summarization
      const response = await axios({
        method: "GET",
        url: "https://ai-article-extractor-and-summarizer.p.rapidapi.com/summarize",
        params: { url, summarize: "true" },
        headers: {
          "x-rapidapi-key": "f27ff9c45amshfec40b6a7bfe08dp11ae9djsnb8abef9c181a",
          "x-rapidapi-host": "ai-article-extractor-and-summarizer.p.rapidapi.com"
        }
      });

      setSummary(response.data?.summary?.trim() || "No summary available");
      toast.success("Summary generated!");
      await refreshTokens();
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleReset = () => {
    setUrl("");
    setSummary("");
  };

  return (
    <div className="min-h-screen min-w-full p-20 px-4 sm:px-6 lg:px-8">
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
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'Buy Token Pack'}
            </Button>
            <Button 
              onClick={() => handlePaymentChoice('subscribe')} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'Subscribe'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-w-full  mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl  font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-none">
            Article Summarizer
          </h1>
          <p className="text-gray-600">Get quick summaries of any article</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <div className="relative">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full p-3  border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles />
                  Generate Summary
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleReset}
              disabled={isLoading || (!url && !summary)}
              className="bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-lg disabled:opacity-50"
            >
              Reset
            </Button>
          </div>
        </form>

        {summary && (
          <div className="border rounded-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">Summary</h3>
              <Button 
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm  hover:bg-gray-200 py-1 px-2 rounded"
              >
                {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div className="p-4">
              {summary.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}