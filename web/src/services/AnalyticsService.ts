import { api } from "../lib/axios";
import type { AnalyticsStats, RecentAnalysis } from "../@types/Analytics";

export async function getAnalyticsStats() {
  try {
    const response = await api.get("/analytics/stats");

    if (response.status === 200) {
      return { data: response.data as AnalyticsStats, type: "success" };
    }

    return { type: "error" };
  } catch (error) {
    console.error("Error:", error);
    return { type: "error" };
  }
}

export async function getRecentAnalyses(limit: number = 10) {
  try {
    const response = await api.get("/analytics/recent", {
      params: { limit },
    });

    if (response.status === 200) {
      return { data: response.data as RecentAnalysis[], type: "success" };
    }

    return { type: "error" };
  } catch (error) {
    console.error("Error:", error);
    return { type: "error" };
  }
}
