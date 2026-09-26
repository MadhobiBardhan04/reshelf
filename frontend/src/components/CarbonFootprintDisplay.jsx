import { useCarbonFootprint } from "react-carbon-footprint";

export default function CarbonFootprintDisplay() {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div>
      <h3>Network Usage</h3>

      <p>Bytes Transferred: {bytesTransferred} bytes</p>

      <p>Estimated CO₂: {gCO2.toFixed(2)} grams</p>
    </div>
  );
}
