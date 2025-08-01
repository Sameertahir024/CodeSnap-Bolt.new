'use client';

import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from '@/lib/supabase/browserClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
}: PricingCardProps) => {
  const supabase = createClient();
  const router = useRouter();

  const handlePurchase = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please log in to make a purchase');
        router.push('/login');
        return;
      }

      // Determine which endpoint to call based on the plan
      const endpoint = title === 'Token Pack' 
        ? '/api/payment/pack' 
        : '/api/payment/subscribe';

      const { url } = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          email: user.email 
        }),
      }).then(res => res.json());

      window.location.href = url;
      
    } catch (error) {
      toast.error('Failed to initiate payment');
      console.error(error);
    }
  };

  return (
    <div>
      <Card
        className={`w-full max-w-sm mx-auto flex flex-col ${
          isPopular ? "border-primary shadow-lg" : ""
        }`}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            {isPopular && (
              <span className="px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                Popular
              </span>
            )}
          </div>
          <CardDescription className="text-xl font-semibold mt-2">
            <span className="text-4xl">{price}</span>
            {title === 'Unlimited' && (
              <span className="text-sm font-normal">/month</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground mb-6">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={isPopular ? "default" : "outline"}
            onClick={handlePurchase}
          >
            {title === 'Basic' ? 'Get Started' : 'Purchase Now'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCard;