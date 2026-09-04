import { PredictionResponse } from "@/types";

const LOCAL_STORAGE_KEY = "eduvision_predictions_cache";

export function getLocalPredictions(): PredictionResponse[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read from localStorage:", err);
    return [];
  }
}

export function saveLocalPrediction(item: PredictionResponse): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalPredictions();
    // Prepend and keep max 50
    const updated = [item, ...existing.filter((p) => p.id !== item.id)].slice(0, 50);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
}
