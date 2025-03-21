import { rides, stations } from "../drizzle/schema";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { updateStations } from "./stations";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/rides", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(rides).all();
  return c.json(result);
});

app.get("/rides/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = c.req.param("id");
  const result = await db
    .select()
    .from(rides)
    .where(eq(rides.ride_id, id))
    .get();

  if (!result) {
    return c.json({ error: "Ride not found" }, 404);
  }

  return c.json(result);
});

app.get("/stations", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(stations).all();
  return c.json(result);
});

app.get("/stations/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = c.req.param("id");
  const result = await db
    .select()
    .from(stations)
    .where(eq(stations.short_name, id))
    .get();
  if (!result) {
    return c.json({ error: "Station not found" }, 404);
  }
  return c.json(result);
});

export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: CloudflareBindings) {
    if (event.cron === "0 0 * * *") {
      await updateStations(env);
    }
  },
};
