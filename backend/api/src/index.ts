import { rides, stations } from "../drizzle/schema";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/rides", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(rides).all();
  return c.json(result);
});

app.get("/stations", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(stations).all();
  return c.json(result);
});

export default app;
