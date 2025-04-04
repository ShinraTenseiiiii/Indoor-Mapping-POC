import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import { useEffect } from "react";

interface GeomanControlProps {
  position?: "topleft" | "topright" | "bottomleft" | "bottomright";
  drawMarker?: boolean;
  drawPolyline?: boolean;
  drawRectangle?: boolean;
  drawPolygon?: boolean;
  drawCircle?: boolean;
  editMode?: boolean;
}

const GeomanControl: React.FC<GeomanControlProps> = ({
  position = "topleft",
  drawMarker = true,
  drawPolyline = true,
  drawRectangle = true,
  drawPolygon = true,
  drawCircle = false,
  editMode = true,
}) => {
  const map = useMap();

  useEffect(() => {
    map.pm.addControls({
      position,
      drawMarker,
      drawPolyline,
      drawRectangle,
      drawPolygon,
      drawCircle,
      editMode,
    });
  }, [map, position, drawMarker, drawPolyline, drawRectangle, drawPolygon, drawCircle, editMode]);

  return null;
};

export default GeomanControl;
