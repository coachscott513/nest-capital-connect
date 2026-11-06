/** Keep the homepage connected to the existing server-filtered directory. */
export function homeDirectorySearch(query: string, town = "", category = ""): string {
  const params = new URLSearchParams();
  if (query.trim()) params.set("search", query.trim());
  if (town) params.set("town", town);
  if (category) params.set("category", category);
  const suffix = params.toString();
  return suffix ? `/local?${suffix}` : "/local";
}