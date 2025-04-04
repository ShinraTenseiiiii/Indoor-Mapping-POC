import { MapContainer, ImageOverlay, useMap, useMapEvents } from "react-leaflet";
import GeomanControl from "../GeomanControl";
import MapEvents from "../MapEvents";
import { useState, useEffect } from "react";
import L from "leaflet";

// Extend LeafletEventHandlerFnMap to include "pm:create"
declare module "leaflet" {
  interface LeafletEventHandlerFnMap {
    "pm:create"?: (e: any) => void;
  }
}

const imageUrl = "/image.png";
const imageWidth = 1024;
const imageHeight = 768;

// set bounds according to the actual dimensions
const bounds: [[number, number], [number, number]] = [
  [0, 0],
  [imageHeight, imageWidth],
];

const FitBounds = () => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [10, 10] });
  }, [map]);
  return null;
};

// Modal component for entering a point name
const Modal: React.FC<{ 
  isOpen: boolean; 
  onSubmit: (name: string) => void; 
  onClose: () => void; 
}> = ({ isOpen, onSubmit, onClose }) => {
  const [input, setInput] = useState("");

  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", minWidth: "300px" }}>
        <h3>Enter point name</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={{ padding: "8px 12px" }}>
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(input);
              setInput("");
            }}
            style={{ padding: "8px 12px" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// Component to handle PM events and pass new features to a callback
const GeoJsonEvents = ({
  onNewFeature,
}: {
  onNewFeature: (feature: any) => void;
}) => {
  useMapEvents({
    "pm:create": (e: any) => {
      const geojson = e.layer.toGeoJSON();
      // Instead of a prompt, pass the feature via callback to open the modal
      onNewFeature(geojson);
    },
    // Additional events (pm:edit, pm:delete, etc.) can be added here
  });
  return null;
};

interface SidebarProps {
  geojsonData: {
    type: string;
    features: any[];
  };
}

const Sidebar: React.FC<SidebarProps> = ({ geojsonData }) => {
  return (
    <div style={{ width: "300px", padding: "10px", background: "#f1f1f1" }}>
      <h3>GeoJSON Data</h3>
      <pre style={{ overflow: "auto", maxHeight: "400px" }}>
        {JSON.stringify(geojsonData, null, 2)}
      </pre>
    </div>
  );
};

const IndoorMapApp = () => {
  const [floor, setFloor] = useState(1);
  const totalFloors = 5;
  const [geojsonData, setGeojsonData] = useState<{
    type: string;
    features: any[];
  }>({
    type: "FeatureCollection",
    features: [],
  });
  // State to hold the pending feature and toggle the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingFeature, setPendingFeature] = useState<any>(null);

  // When a new feature gets created, store it and open the modal
  const handleNewFeature = (feature: any) => {
    setPendingFeature(feature);
    setIsModalOpen(true);
  };

  // When the modal is submitted update the feature with the name and store it in state
  const handleSubmitName = (name: string) => {
    if (pendingFeature) {
      pendingFeature.properties = { ...pendingFeature.properties, name: name || "Unnamed" };
      setGeojsonData((prev: any) => {
        const newFeatures = [...prev.features, pendingFeature];
        console.log({ type: "FeatureCollection", features: newFeatures });
        return { type: "FeatureCollection", features: newFeatures };
      });
      setPendingFeature(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Floor Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          background: "#f8f9fa",
          borderBottom: "1px solid #ccc",
        }}
      >
        {[...Array(totalFloors)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setFloor(index + 1)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              border: "none",
              cursor: "pointer",
              background: floor === index + 1 ? "#007bff" : "#e0e0e0",
              color: floor === index + 1 ? "white" : "black",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Floor {index + 1}
          </button>
        ))}
      </div>

      {/* Map Layout */}
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1 }}>
          <MapContainer
            crs={L.CRS.Simple} // use pixel coordinate system
            center={[imageHeight / 2, imageWidth / 2]}
            zoom={1}
            scrollWheelZoom={true}
            style={{ height: "100%" }}
          >
            <FitBounds />
            <ImageOverlay url={imageUrl} bounds={bounds} />
            <GeomanControl
              position="topleft"
              drawMarker={true}
              drawPolyline={true}
              drawRectangle={true}
              drawPolygon={true}
              editMode={true}
            />
            <MapEvents />
            <GeoJsonEvents onNewFeature={handleNewFeature} />
          </MapContainer>
        </div>

        {/* Right Sidebar receives geojsonData as prop */}
        <Sidebar geojsonData={geojsonData} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onSubmit={handleSubmitName}
        onClose={() => {
          setPendingFeature(null);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default IndoorMapApp;