export default {
  name: "aboutSettings",
  title: "About Section Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Settings Name",
      type: "string",
      initialValue: "About Section Settings",
      readOnly: true
    },
    {
      name: "aboutImage",
      title: "Taste of Our Home Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "aboutTextEnglish",
      title: "About Story (English)",
      type: "text",
      initialValue: "Our recipes are inspired by generations of culinary traditions from Telugu households. Every single jar of pickle, packet of masala, sweet, and crunchy snack is handcrafted with utmost care, preserving the authentic taste of Andhra and Telangana heritage."
    },
    {
      name: "aboutTextTelugu",
      title: "About Story (Telugu Proverb / Tagline)",
      type: "text",
      initialValue: "ప్రేమతో తయారు చేసిన ప్రతి రుచి మీ ఇంటి రుచిలా ఉంటుంది."
    }
  ]
};
