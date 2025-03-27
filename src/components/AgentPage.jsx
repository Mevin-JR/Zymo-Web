import React from "react";
import CustomerCard from "./CustomerCard";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
export default function AgentPage({title}) {
  const customerData = {
    name: "John Doe",
    bookedAt: "March 16, 2025, 10:00 AM",
    startDate: "March 18, 2025",
    endDate: "March 20, 2025",
    fromWhen: "March 18",
    toWhen: "March 20",
    city: "New York",
    carType: "SUV",
    carBrand: "Hyundai",
    carName: "i20 2019",
    hourlyAmount: "₹114/hr",
    seats: "5 Seats",
    payableAmount: "₹5,928.00",
    details: "Phone: 123-456-7890 | Email: johndoe@example.com",
  };
  useEffect(() => {
    document.title = title;
}, [title]);
  return (
    <>
  <Helmet>
                <title>{title}</title>
                <meta name="description" content="View agent details and manage your Zymo partner account." />
                <link rel="canonical" href="https://zymo.app/agent-info" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Find out how you can partner with Zymo as an agent." />
            </Helmet>
    <div className="flex items-center justify-center h-screen bg-black">
      <CustomerCard customer={customerData} />
    </div>
    </>
  );
}
