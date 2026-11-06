/** Keep the homepage connected to the existing server-filtered directory. */
export function homeDirectorySearch(query: string, town = "", category = ""): string {
  const params = new URLSearchParams();
  if (query.trim()) params.set("search", query.trim());
  if (town) params.set("town", town);
  // The legacy directory remaps coffee/legal/accounting labels to official
  // categories that do not match imported rows. Use its existing keyword
  // search for those verticals rather than altering directory data or filters.
  const keywordCategory = ["Coffee", "Attorney", "Accountant", "Marketing"].includes(category);
  if (category && keywordCategory && !query.trim()) params.set("search", category.toLowerCase());
  else if (category && !keywordCategory) params.set("category", category);
  const suffix = params.toString();
  return suffix ? `/local?${suffix}` : "/local";
}