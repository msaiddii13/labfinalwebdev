import { AlarmClockCheck } from "lucide-react";

export default function Component({ children, x, z = 0 }) {
  z += 1;

  return (
    <div className="border rounded p-2 m-4">
      <h2>
        Component {x}
        {z}
        {/* {Math.random()} */}
        <AlarmClockCheck />
      </h2>
      {children}
    </div>
  );
}
