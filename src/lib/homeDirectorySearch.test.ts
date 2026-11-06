import { describe, expect, it } from "vitest";
import { homeDirectorySearch } from "./homeDirectorySearch";

describe("homepage directory search", () => {
  it("sends real business names to the existing directory, not property search", () => {
    expect(homeDirectorySearch("  Ambition Coffee  ")).toBe("/local?search=Ambition+Coffee");
  });
  it("preserves the selected town and category", () => {
    expect(homeDirectorySearch("coffee", "schenectady", "Coffee")).toBe("/local?search=coffee&town=schenectady&category=Coffee");
  });
  it("allows browsing the existing directory without a query", () => {
    expect(homeDirectorySearch(" ")).toBe("/local");
  });
});