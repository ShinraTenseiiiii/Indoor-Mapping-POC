import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { create } from "zustand";

interface GeoJsonState {
  geoJson: any;
  setGeoJson: (geoJson: any) => void;
}

export const useGeoJsonStore = create<GeoJsonState>((set) => ({
  geoJson: null,
  setGeoJson: (geoJson) => set({ geoJson }),
}));

const MapEvents = () => {
  const map = useMap();
  const setGeoJson = useGeoJsonStore((state) => state.setGeoJson);

  useEffect(() => {
    map.on("pm:create", (e) => {
      setGeoJson((e.layer as L.Layer & { toGeoJSON: () => any }).toGeoJSON());
    });

    map.on("pm:edit", (e) => {
      setGeoJson((e.layer as L.Layer & { toGeoJSON: () => any }).toGeoJSON());
    });

    map.on("pm:remove", (e) => {
      setGeoJson(null);
    });

    return () => {
      map.off("pm:create");
      map.off("pm:edit");
      map.off("pm:remove");
    };
  }, [map, setGeoJson]);

  return null;
};

export default MapEvents;
