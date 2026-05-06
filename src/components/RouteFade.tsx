import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * RouteFade — wraps route content in a key'd div so each pathname change
 * re-runs the .page-fade-enter CSS animation (opacity + slight rise).
 * Apple-style, very subtle, ~280ms.
 */
const RouteFade = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-fade-enter">
      {children}
    </div>
  );
};

export default RouteFade;
