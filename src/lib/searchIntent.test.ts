import { describe, expect, it } from "vitest";
import { getSearchRoute, resolveSearchIntent } from "./searchIntent";

describe("resolveSearchIntent", () => {
  it.each([
    ["finance", "/local?search=finance"],
    ["mortgage", "/local?search=mortgage"],
    ["coffee", "/local?search=coffee"],
    ["attorney", "/local?search=attorney"],
    ["Delmar", "/living-in/delmar"],
    ["Delmar homes", "/homes?town=Delmar"],
    ["Troy cafés", "/local?search=caf%C3%A9s&town=Troy"],
    ["investment properties Albany", "/investment-properties?town=Albany"],
  ])("routes %s to %s", (query, route) => {
    expect(getSearchRoute(query)).toBe(route);
  });

  it("never defaults business or unknown searches to external MLS URLs", () => {
    for (const query of ["HVAC Troy", "dentist", "local service", "weird regional thing"]) {
      expect(resolveSearchIntent(query).route).not.toContain("scottalvarez.remax.com");
      expect(resolveSearchIntent(query).route).not.toContain("wide.php");
    }
  });
});