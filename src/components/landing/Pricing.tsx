import PricingCard from "./PricingCard";

export default function PricingSection() {
  const pricingPlans = [
    {
      title: "Basic",
      price: "Free",
      description: "Get started with 5 free tokens after registration",
      features: [
        "5 tokens on signup",
        "Basic features access",
        "Email support",
        "Limited usage",
      ],
    },
    {
      title: "Token Pack",
      price: "$1.99",
      description: "Purchase additional tokens when you need them",
      features: [
        "5 tokens per purchase",
        "No expiration",
        "Pay per use",
        "Priority email support",
      ],
      isPopular: true,
    },
    {
      title: "Unlimited",
      price: "$9.99",
      description: "Unrestricted access for power users",
      features: [
        "Unlimited tokens",
        "All premium features",
        "24/7 priority support",
        "Advanced analytics",
        "Cancel anytime",
      ],
    },
  ];

  return (
    <section className="px-4 my-32">
      <div className="container mx-auto">
        <div className="text-center space-y-1 mb-11">
          <h2 className="text-3xl font-bold">
            Flexible Token Pricing
          </h2>
          <p className="text-sm">
            Choose the plan that fits your needs - from free trial to unlimited access
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-32">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}