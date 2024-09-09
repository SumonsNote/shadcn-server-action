import { getSubscribers } from "@/app/queries";
import { Card, CardContent } from "@/components/ui/card";

const Subscribers = async () => {
  const subscribers = await getSubscribers();
  return (
    <div className="flex flex-col justify-center items-center my-4">
      {subscribers.map((sub) => (
        <Card key={sub.id} className="my-2">
          <CardContent>
            <p className="my-2">Wow!! {sub.name} Subscribed.</p>
            <p>
              Subscribed on:{" "}
              {new Intl.DateTimeFormat("en-us").format(sub.createdAt)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Subscribers;
