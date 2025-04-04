interface FloorSelectorProps {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  totalFloors: number;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({ currentFloor, setCurrentFloor, totalFloors }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>Floor: </label>
      <select value={currentFloor} onChange={(e) => setCurrentFloor(Number(e.target.value))}>
        {Array.from({ length: totalFloors }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Floor {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FloorSelector;
