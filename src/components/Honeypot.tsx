import { useRef } from "react";

/**
 * Anti-bot honeypot.
 *
 * Renders a hidden input that real users won't see or fill. Most form
 * bots happily fill every visible-by-DOM field, so when this comes back
 * non-empty we drop the submission silently.
 *
 * Usage:
 *   const hp = useHoneypot();
 *   ...
 *   <Honeypot bind={hp} />
 *   ...
 *   if (hp.isBot()) return; // silently discard
 */

export interface HoneypotBinding {
  ref: React.RefObject<HTMLInputElement>;
  name: string;
  isBot: () => boolean;
}

export const useHoneypot = (name = "company_website"): HoneypotBinding => {
  const ref = useRef<HTMLInputElement>(null);
  return {
    ref,
    name,
    isBot: () => Boolean(ref.current && ref.current.value.trim().length > 0),
  };
};

export const Honeypot = ({ bind }: { bind: HoneypotBinding }) => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      left: "-10000px",
      top: "auto",
      width: 1,
      height: 1,
      overflow: "hidden",
      opacity: 0,
      pointerEvents: "none",
    }}
  >
    <label htmlFor={`hp-${bind.name}`}>Leave this field empty</label>
    <input
      ref={bind.ref}
      id={`hp-${bind.name}`}
      type="text"
      name={bind.name}
      tabIndex={-1}
      autoComplete="off"
      defaultValue=""
    />
  </div>
);

export default Honeypot;
