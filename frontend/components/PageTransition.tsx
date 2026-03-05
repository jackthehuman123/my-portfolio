"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: ref.current,
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
