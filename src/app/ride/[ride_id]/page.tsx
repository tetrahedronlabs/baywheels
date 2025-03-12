import RideMap from "@/src/components/map";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Bike, Calendar, Clock, User, Zap } from "lucide-react";
import { notFound } from "next/navigation";
import { getRideById } from "@/src/utils/ride";

export default async function Page(props: {
  params: Promise<{ ride_id: string }>;
}) {
  const params = await props.params;
  const ride = await getRideById(params.ride_id);

  if (!ride) return notFound();

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <RideMap
            startStation={{
              latitude: ride.start_lat!,
              longitude: ride.start_lng!,
            }}
            endStation={{
              latitude: ride.end_lat!,
              longitude: ride.end_lng!,
            }}
          />
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardContent className="space-y-4 p-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bike className="mr-2" size={18} />
                  Bike Type
                </div>
                <Badge
                  variant={
                    ride.rideable_type === "electric_bike"
                      ? "default"
                      : "secondary"
                  }
                  className="flex items-center gap-1"
                >
                  {ride.rideable_type === "electric_bike" && (
                    <Zap className="h-3 w-3" />
                  )}
                  {ride.rideable_type === "electric_bike"
                    ? "Electric Bike"
                    : "Classic Bike"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="mr-2" size={18} />
                  Rider Type
                </div>
                <Badge
                  variant={
                    ride.member_casual === "member" ? "default" : "secondary"
                  }
                >
                  {ride.member_casual!.charAt(0).toUpperCase() +
                    ride.member_casual!.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2" size={18} />
                  Duration
                </div>
                <div>
                  {(() => {
                    if (!ride.started_at || !ride.ended_at) return "";

                    let diff = Math.floor(
                      (ride.ended_at!.getTime() - ride.started_at!.getTime()) /
                        1000
                    );
                    const hours = Math.floor(diff / 3600);
                    diff %= 3600;
                    const minutes = Math.floor(diff / 60);
                    const seconds = diff % 60;

                    return [
                      hours ? `${hours} hr${hours > 1 ? "s" : ""}` : "",
                      minutes ? `${minutes} min${minutes > 1 ? "s" : ""}` : "",
                      seconds ? `${seconds} sec${seconds > 1 ? "s" : ""}` : "",
                    ]
                      .filter(Boolean)
                      .join(" ");
                  })()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2" size={18} />
                  Date
                </div>
                <div>
                  {ride.started_at!.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
