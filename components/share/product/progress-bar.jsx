"use client";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressBar() {
  return (
    <div style={{ width: 50, height: 50 }}>
      <CircularProgressbar
        value={66}
        text="66"
        styles={buildStyles({ backgroundColor: "orange" })}
      />
    </div>
  );
}
