export default {
  name: "deliverySettings",
  title: "Delivery Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Settings Name",
      type: "string",
      initialValue: "Delivery Cost & Offers",
      readOnly: true
    },
    {
      name: "deliveryCost",
      title: "Delivery Cost (₹)",
      type: "number",
      description: "Default delivery fee when order subtotal is below the threshold (e.g. 50)",
      initialValue: 50
    },
    {
      name: "freeDeliveryThreshold",
      title: "Free Delivery Threshold (₹)",
      type: "number",
      description: "Minimum order subtotal to qualify for free delivery (e.g. 500)",
      initialValue: 500
    }
  ]
};
