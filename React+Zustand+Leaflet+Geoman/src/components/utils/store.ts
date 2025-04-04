import { create } from "zustand";

interface GeoJsonState {
  geoJson: any;
  setGeoJson: (data: any) => void;
}

export const useGeoJsonStore = create<GeoJsonState>((set) => ({
  geoJson: null,
  setGeoJson: (data) => set({ geoJson: data }),
}));
