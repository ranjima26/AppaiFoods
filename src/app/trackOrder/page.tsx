import TrackOrder from "@/app/components/trackOrder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Order - Appai Foods",
  description: "Track your Appai Foods order from our Kerala kitchen to your doorstep.",
};

export default function TrackOrderPage() {
  return <TrackOrder />;
}
