import React from "react";
import CustomerCard from "./CustomerCard";

export default function AgentPage() {
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

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <CustomerCard customer={customerData} />
    </div>
  );
}
