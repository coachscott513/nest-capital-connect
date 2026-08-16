import { logEngagement } from "@/lib/engagement";
import { routeGroupLabel } from "@/lib/routeExperience";

/**
 * Buyer Tools analytics. Non-identifying only: no address, listing id,
 * search text, owner/client identity, or contact information.
 */
export type BuyerToolProduct =
  | "analyze_any_deal"
  | "analyze_any_property"
  | "talk_to_scott"
  | "search_homes";

export const trackBuyerToolsOpen = (sourceLocation: string, pathname: string) =>
  logEngagement("buyer_tools_open", {}, {
    source_location: sourceLocation,
    pathname: pathname.split("?")[0].split("#")[0],
    route_group: routeGroupLabel(pathname),
  });

export const trackBuyerToolSelect = (
  sourceLocation: string,
  pathname: string,
  productType: BuyerToolProduct,
  intentType?: string,
) =>
  logEngagement("buyer_tool_select", {}, {
    source_location: sourceLocation,
    pathname: pathname.split("?")[0].split("#")[0],
    route_group: routeGroupLabel(pathname),
    product_type: productType,
    ...(intentType ? { intent_type: intentType } : {}),
  });
