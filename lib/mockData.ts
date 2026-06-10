export interface Product {
  id: number;
  name: string;
  telugu: string;
  category: string;
  price: number;
  badge: string;
  hot: boolean;
  image: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  telugu: string;
  location: string;
  text: string;
  rating: number;
}

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Avakaya",
    telugu: "ఆవకాయ",
    category: "pickles",
    price: 280,
    badge: "Andhra Special",
    hot: true,
    image: "https://images.pexels.com/photos/7812134/pexels-photo-7812134.jpeg",
    desc: "Famous Andhra raw mango pickle with mustard & red chili. Stored in earthen jars."
  },
  {
    id: 2,
    name: "Gongura Pickle",
    telugu: "గోంగూర పచ్చడి",
    category: "pickles",
    price: 240,
    badge: "Most Loved",
    hot: true,
    image: "https://images.pexels.com/photos/11584813/pexels-photo-11584813.jpeg",
    desc: "Tangy sorrel leaves cooked with garlic & sesame oil. Aunty's recipe."
  },
  {
    id: 3,
    name: "Mango Pickle",
    telugu: "మామిడి పచ్చడి",
    category: "pickles",
    price: 260,
    badge: "Family Recipe",
    hot: false,
    image: "https://images.pexels.com/photos/7812134/pexels-photo-7812134.jpeg",
    desc: "Sweet & spicy raw mango pickle. Perfect with curd rice."
  },
  {
    id: 4,
    name: "Lemon Pickle",
    telugu: "నిమ్మకాయ ఊరగాయ",
    category: "pickles",
    price: 220,
    badge: "Sun Dried",
    hot: false,
    image: "https://images.pexels.com/photos/11584813/pexels-photo-11584813.jpeg",
    desc: "Sun-dried lemon pickle aged for 21 days for authentic tang."
  },
  {
    id: 5,
    name: "Sambar Masala",
    telugu: "సాంబార్ మసాలా",
    category: "masalas",
    price: 120,
    badge: "Daily Essential",
    hot: false,
    image: "https://images.unsplash.com/photo-1591272216626-b09e38519371",
    desc: "Aromatic blend for perfect sambar, every single time."
  },
  {
    id: 6,
    name: "Rasam Powder",
    telugu: "రసం పొడి",
    category: "masalas",
    price: 100,
    badge: "Home Ground",
    hot: false,
    image: "https://images.unsplash.com/photo-1591272216626-b09e38519371",
    desc: "Stone-ground spice blend for the perfect comfort rasam."
  },
  {
    id: 7,
    name: "Ariselu",
    telugu: "అరిసెలు",
    category: "sweets",
    price: 350,
    badge: "Festival Special",
    hot: true,
    image: "https://images.unsplash.com/photo-1635952346904-95f2ccfcd029",
    desc: "Traditional jaggery rice sweet, deep fried in ghee. Sankranti favorite."
  },
  {
    id: 8,
    name: "Sunnundalu",
    telugu: "సున్నుండలు",
    category: "sweets",
    price: 320,
    badge: "Protein Rich",
    hot: false,
    image: "https://images.unsplash.com/photo-1635952346904-95f2ccfcd029",
    desc: "Urad dal laddus made with pure ghee and jaggery."
  },
  {
    id: 9,
    name: "Chekkalu",
    telugu: "చెక్కలు",
    category: "snacks",
    price: 180,
    badge: "Crunchy",
    hot: false,
    image: "https://images.unsplash.com/photo-1683533678059-63c6a0e9e3ef",
    desc: "Crispy rice crackers seasoned with cumin and sesame."
  },
  {
    id: 10,
    name: "Murukulu",
    telugu: "మురుకులు",
    category: "snacks",
    price: 200,
    badge: "Tea Time",
    hot: true,
    image: "https://images.unsplash.com/photo-1683533678059-63c6a0e9e3ef",
    desc: "Spiral crunchy snack made with rice flour and cumin."
  },
  {
    id: 11,
    name: "Garlic Pickle",
    telugu: "వెల్లుల్లి పచ్చడి",
    category: "pickles",
    price: 250,
    badge: "Immunity Boost",
    hot: true,
    image: "https://images.pexels.com/photos/7812134/pexels-photo-7812134.jpeg",
    desc: "Whole garlic cloves marinated with chili and fenugreek."
  },
  {
    id: 12,
    name: "Bellam Pootharekulu",
    telugu: "బెల్లం పూతరేకులు",
    category: "sweets",
    price: 400,
    badge: "Paper Thin",
    hot: true,
    image: "https://images.unsplash.com/photo-1635952346904-95f2ccfcd029",
    desc: "Paper-thin rice crepe layered with jaggery and ghee."
  },
  {
    id: 13,
    name: "Biryani Masala",
    telugu: "బిర్యానీ మసాలా",
    category: "masalas",
    price: 180,
    badge: "Hyderabadi",
    hot: true,
    image: "https://images.unsplash.com/photo-1591272216626-b09e38519371",
    desc: "Hand-pounded Hyderabadi biryani masala with 18 spices."
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    name: "Lakshmi G.",
    telugu: "లక్ష్మి G.",
    location: "Hyderabad",
    text: "Tastes exactly like my grandmother used to make. Tears in my eyes!",
    rating: 5
  },
  {
    name: "Ravi K.",
    telugu: "రవి K.",
    location: "Visakhapatnam",
    text: "Best homemade snacks in Hyderabad. Avakaya is unbeatable!",
    rating: 5
  },
  {
    name: "Sita M.",
    telugu: "సీత M.",
    location: "Vijayawada",
    text: "Authentic Telugu flavors. The ariselu took me back to my village.",
    rating: 5
  }
];

export const categories = [
  { key: "all", label: "All", icon: "🍽️" },
  { key: "pickles", label: "Pickles", icon: "🌶️" },
  { key: "masalas", label: "Masalas", icon: "✨" },
  { key: "sweets", label: "Sweets", icon: "❤️" },
  { key: "snacks", label: "Snacks", icon: "🍃" }
];
