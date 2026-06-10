export default {
  name: "categorySettings",
  title: "Category Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Settings Name",
      type: "string",
      initialValue: "Category Images Settings",
      readOnly: true
    },
    {
      name: "picklesImage",
      title: "Pickles Category Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "masalasImage",
      title: "Masalas Category Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "sweetsImage",
      title: "Sweets Category Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "snacksImage",
      title: "Snacks Category Image",
      type: "image",
      options: {
        hotspot: true
      }
    }
  ]
};
