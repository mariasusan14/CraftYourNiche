import { useRef } from "react";
import "./Magnifier.css";

export default function Magnifier({ imgSrc, mousepos }) {
  let { x, y } = mousepos;

  return (
    <div
      className="magnifier-img"
      src={imgSrc}
      style={{
        backgroundImage: `url(${imgSrc})`,

        backgroundPosition: `-${x * 3 - 220}px -${y * 3 - 150}px`,
      }}
    />
  );
}
