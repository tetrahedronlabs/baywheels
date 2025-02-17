import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { database } from "@/src/utils/database";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ station_id: string }>;
}) {
  const params = await props.params;
  const station = await database.db.stations
    .filter("short_name", params.station_id)
    .getFirst();
  if (!station) return notFound();
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trip Route</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
