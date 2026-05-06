import { ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Apple-style scroll reveal: opacity 0→1 + translateY 20→0.
 * Triggers once when 15% in view. Honors prefers-reduced-motion via .reveal CSS.
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  as: Tag = "div",
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, visible]);

  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Reveal;
