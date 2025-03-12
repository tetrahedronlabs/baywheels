import { RidesRecord } from "@/src/utils/xata";
import { database } from "@/src/utils/database";

export async function getRideById(rideId: string): Promise<RidesRecord | null> {
  let ride: RidesRecord | null = null;

  try {
    const kvResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.CLOUDFLARE_KV_NAMESPACE_ID}/values/${rideId}`,
      {
        headers: {
          "X-Auth-Email": process.env.CLOUDFLARE_EMAIL!,
          "X-Auth-Key": process.env.CLOUDFLARE_API_KEY!,
        },
      }
    );

    if (kvResponse.ok) {
      const kvData = await kvResponse.json();
      ride = {
        ...kvData,
        started_at: kvData.started_at ? new Date(kvData.started_at) : null,
        ended_at: kvData.ended_at ? new Date(kvData.ended_at) : null,
        xata_createdat: kvData.xata_createdat
          ? new Date(kvData.xata_createdat)
          : null,
        xata_updatedat: kvData.xata_updatedat
          ? new Date(kvData.xata_updatedat)
          : null,
      } as RidesRecord;
    }
  } catch (error) {
    console.log("Failed to fetch from KV, falling back to database", error);
  }

  if (!ride) {
    ride = await database.db.rides.filter("ride_id", rideId).getFirst();

    if (ride) {
      try {
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.CLOUDFLARE_KV_NAMESPACE_ID}/values/${rideId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Email": process.env.CLOUDFLARE_EMAIL!,
              "X-Auth-Key": process.env.CLOUDFLARE_API_KEY!,
            },
            body: JSON.stringify(ride),
          }
        );
      } catch (error) {
        console.error("Failed to cache in KV:", error);
      }
    }
  }

  return ride;
}
