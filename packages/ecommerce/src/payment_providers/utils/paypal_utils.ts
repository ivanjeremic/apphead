/** Generic: find a link by rel on any PayPal resource */
export function findLink(resource: any, rel: string): string | null {
  const links: Array<{ rel?: string; href?: string }> = resource?.links ?? []
  const target = rel.toLowerCase()
  for (const l of links) {
    const r = (l?.rel ?? "").toLowerCase()
    if (r === target && typeof l?.href === "string") return l.href
  }
  return null
}

/** Extract the buyer approval URL from an Order response. */
export function getApprovalUrl(order: any): string | null {
  // Prefer "approve", fall back to "payer-action" if present
  return findLink(order, "approve") ?? findLink(order, "payer-action")
}

/** List all authorization IDs from an Order or from the /authorize response. */
export function listAuthorizationIds(orderOrAuthorizeRes: any): Array<string> {
  const units: Array<any> = orderOrAuthorizeRes?.purchase_units ?? []
  const ids: Array<string> = []
  for (const u of units) {
    const auths: Array<any> = u?.payments?.authorizations ?? []
    for (const a of auths) if (a?.id) ids.push(String(a.id))
  }
  return ids
}

/** First authorization id (handy for captureAuthorization) */
export function getFirstAuthorizationId(orderOrAuthorizeRes: any): string | null {
  return listAuthorizationIds(orderOrAuthorizeRes)[0] ?? null
}

/** List all capture IDs from an Order or from the /capture response. */
export function listCaptureIds(orderOrCaptureRes: any): Array<string> {
  const units: Array<any> = orderOrCaptureRes?.purchase_units ?? []
  const ids: Array<string> = []
  for (const u of units) {
    const captures: Array<any> = u?.payments?.captures ?? []
    for (const c of captures) if (c?.id) ids.push(String(c.id))
  }
  return ids
}

/** First capture id (handy for refunds) */
export function getFirstCaptureId(orderOrCaptureRes: any): string | null {
  return listCaptureIds(orderOrCaptureRes)[0] ?? null
}

/** Convenience: payer email from an Order (if available) */
export function getPayerEmail(order: any): string | null {
  const email = order?.payer?.email_address
  return typeof email === "string" ? email : null
}

/** Convenience: order status ("CREATED" | "APPROVED" | "COMPLETED" | ...) */
export function getOrderStatus(order: any): string | null {
  const st = order?.status
  return typeof st === "string" ? st : null
}

/** Convenience: first purchase unit's shipping address (if present) */
export function getShippingAddress(order: any): any | null {
  const unit = (order?.purchase_units ?? [])[0]
  return unit?.shipping?.address ?? null
}
