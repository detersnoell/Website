/** Shop-weite Fakten. Werte mit TODO vom Betreiber bestätigen lassen. */
export const store = {
  name: "Maybrooks",
  legalName: "Maybrooks Cottage",
  currency: "EUR",
  freeShippingThreshold: 7000,
  shippingCostDE: 495,
  carrier: "DHL",
  // TODO(Betreiber): tatsächliche Versanddauer bestätigen
  dispatchNote: "Versand mit DHL",
  contact: {
    // TODO(Betreiber): Kontaktdaten bestätigen
    email: "hallo@maybrooks.de",
  },
  certification: {
    short: "NPS-zertifiziert",
    long: "Natural Product Standard, approved by BDIH",
    controlledBy: "IONC GmbH",
  },
} as const;
