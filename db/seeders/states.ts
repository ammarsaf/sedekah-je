// fetch api from env's MALAYSIA_API_BASE_URL
// call /state/v1/all.json
// get value where key = state
// insert into malaysian_states

import { db } from "..";
import { malaysianStates } from "../schema";

export async function seedStates() {
  console.log("🌱 Seeding Malaysian states...");

  try {
    const response = await fetch(`${process.env.MALAYSIA_API_BASE_URL}/state/v1/all.json`);
    const data = await response.json();

    const states = data.map((state: any) => ({
      name: state.state,
      code: state.abbreviation,
    }));

    await db.insert(malaysianStates).values(states);
    console.log("✅ Malaysian states seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding Malaysian states:", error);
    throw error;
  }
}
