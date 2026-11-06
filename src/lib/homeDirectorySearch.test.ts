import { describe, expect, it } from "vitest";
import { homeDirectorySearch } from "./homeDirectorySearch";

describe("homepage directory search", () => {
  it("sends real business names to the existing directory, not property search", () => {
    expect(homeDirectorySearch("  Ambition Coffee  ")).toBe("/local?search=Ambition+Coffee");
  });
  it("preserves the selected town and category", () => {
    expect(homeDirectorySearch("cafe", "schenectady", "Restaurant")).toBe("/local?search=cafe&town=schenectady&category=Restaurant");
  });
  it("finds imported coffee records through existing keyword search", () => {
    expect(homeDirectorySearch("", "schenectady", "Coffee")).toBe("/local?town=schenectady&search=coffee");
  });
  it("allows browsing the existing directory without a query", () => {
    expect(homeDirectorySearch(" ")).toBe("/local");
  });
});