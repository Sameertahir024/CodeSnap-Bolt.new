import PricingCard from "./PricingCard";

export default function PricingSection() {
  const pricingPlans = [
    {
      title: "Basic",
      price: "$9",
      description: "Perfect for individuals and small teams",
      features: [
        "Up to 5 users",
        "Basic analytics",
        "24/7 support",
        "1GB storage",
      ],
    },
    {
      title: "Pro",
      price: "$29",
      description: "Ideal for growing businesses",
      features: [
        "Up to 20 users",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Custom integrations",
      ],
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For large-scale organizations",
      features: [
        "Unlimited users",
        "Enterprise-grade security",
        "Dedicated account manager",
        "Unlimited storage",
        "Custom development",
      ],
    },
  ];

  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto">
        <div className="text-center space-y-1 mb-11">
          <h2 className="text-3xl font-bold ">
            Simple pricing for advanced people
          </h2>
          <p className="text-sm">
            Our pricing is designed for advanced people who need more features{" "}
            <br />
            and more flexibility.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
