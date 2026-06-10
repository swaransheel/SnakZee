export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Customer Name (English)",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "telugu",
      title: "Customer Name (Telugu)",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "text",
      title: "Review Text",
      type: "text",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "rating",
      title: "Rating Stars (1-5)",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5]
      },
      validation: (Rule: any) => Rule.required().min(1).max(5)
    }
  ]
};
