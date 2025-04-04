import { ImageOverlay } from "react-leaflet";

interface FloorPlanLayerProps {
  url: string;
  bounds: [[number, number], [number, number]];
}

const FloorPlanLayer: React.FC<FloorPlanLayerProps> = ({ url, bounds }) => {
  return <ImageOverlay url={url} bounds={bounds} />;
};

export default FloorPlanLayer;

/* 


const [imageUrl, setImageUrl] = useState("");

useEffect(() => {
  fetch(`/api/floorplans/${floor}`)
    .then(res => res.json())
    .then(data => setImageUrl(data.imageUrl));
}, [floor]);

<ImageOverlay url={imageUrl} bounds={bounds} />
*/
