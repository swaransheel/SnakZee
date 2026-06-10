export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name (English)",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "telugu",
      title: "Product Name (Telugu)",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Pickles (పచ్చళ్ళు)", value: "pickles" },
          { title: "Masalas (మసాలాలు)", value: "masalas" },
          { title: "Sweets (స్వీట్స్)", value: "sweets" },
          { title: "Snacks (స్నాక్స్)", value: "snacks" }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: "badge",
      title: "Badge (e.g. Special Offer)",
      type: "string"
    },
    {
      name: "hot",
      title: "Hot Product (Star Tag)",
      type: "boolean",
      initialValue: false
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "desc",
      title: "Description",
      type: "text",
      validation: (Rule: any) => Rule.required()
    }
  ]
};
