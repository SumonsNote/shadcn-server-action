import Subscribers from "@/components/subscribers";
import SubscriptionForm from "@/components/subscription-form";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-around p-4">
      <SubscriptionForm />
      <Subscribers />
    </div>
  );
}
