import { useGeoJsonStore } from "./utils/store";

const Sidebar = () => {
  const geoJson = useGeoJsonStore((state: { geoJson: any; }) => state.geoJson);

  return (
    <div style={{ position: "absolute", right: 0, top: 0, width: "300px", height: "100vh", background: "#eee", padding: "10px", overflowY: "auto" }}>
      <h3>GeoJSON Data</h3>
      <pre>{JSON.stringify(geoJson, null, 2)}</pre>
    </div>
  );
};

export default Sidebar;
