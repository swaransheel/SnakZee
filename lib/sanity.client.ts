import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { defaultProducts, Product, defaultTestimonials, Testimonial } from "./mockData";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-03-11";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // Bypass CDN cache in dev for instant edits, use CDN cache in production for edge speed
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return "";
  try {
    return builder.image(source).url();
  } catch (err) {
    return typeof source === "string" ? source : "";
  }
}

/**
 * Fetch products: Sanity CMS -> LocalStorage -> Default Mock Data
 */
export async function getProducts(): Promise<Product[]> {
  const isMock = projectId.includes("mock-project");

  if (!isMock) {
    try {
      const query = `*[_type == "product"] | order(_createdAt desc) {
        "id": _id,
        name,
        telugu,
        category,
        price,
        badge,
        hot,
        "image": image.asset->url,
        desc
      }`;
      const sanityProducts = await sanityClient.fetch(query);
      if (Array.isArray(sanityProducts) && sanityProducts.length > 0) {
        // Map string IDs to numbers if necessary, but keep string IDs compatible
        return sanityProducts.map((p: any, index: number) => ({
          ...p,
          id: typeof p.id === "string" ? index + 1 : p.id, // Ensure numeric IDs for cart logic
          _rawId: p.id // Preserve Sanity _id
        }));
      }
    } catch (err) {
      console.warn("Sanity fetch failed. Falling back to local storage...", err);
    }
  }

  // Fallback to local storage for local customization preview
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("snakzee_products");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing localStorage products:", e);
      }
    }
  }

  return defaultProducts;
}

/**
 * Fetch testimonials: Sanity CMS -> Default Mock Data
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const isMock = projectId.includes("mock-project");

  if (!isMock) {
    try {
      const query = `*[_type == "testimonial"] {
        name,
        telugu,
        location,
        text,
        rating
      }`;
      const sanityTestimonials = await sanityClient.fetch(query);
      if (Array.isArray(sanityTestimonials) && sanityTestimonials.length > 0) {
        return sanityTestimonials;
      }
    } catch (err) {
      console.warn("Sanity testimonials fetch failed. Falling back to mock data...", err);
    }
  }

  return defaultTestimonials;
}

export interface CategoryData {
  key: string;
  title: string;
  telugu: string;
  img: string;
  desc: string;
}

export async function getCategories(): Promise<CategoryData[] | null> {
  const isMock = projectId.includes("mock-project");

  if (!isMock) {
    try {
      const query = `*[_type == "category"] {
        key,
        title,
        telugu,
        "img": image.asset->url,
        desc
      }`;
      const data = await sanityClient.fetch(query);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn("Sanity categories fetch failed.", err);
    }
  }
  return null;
}

export interface SiteSettingsData {
  aboutImage: string;
  aboutTextEnglish?: string;
  aboutTextTelugu?: string;
  picklesImage?: string;
  masalasImage?: string;
  sweetsImage?: string;
  snacksImage?: string;
  deliveryCost?: number;
  freeDeliveryThreshold?: number;
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  const isMock = projectId.includes("mock-project");

  if (!isMock) {
    try {
      const query = `{
        "about": *[_type == "aboutSettings"][0] {
          "aboutImage": aboutImage.asset->url,
          aboutTextEnglish,
          aboutTextTelugu
        },
        "categories": *[_type == "categorySettings"][0] {
          "picklesImage": picklesImage.asset->url,
          "masalasImage": masalasImage.asset->url,
          "sweetsImage": sweetsImage.asset->url,
          "snacksImage": snacksImage.asset->url
        },
        "delivery": *[_type == "deliverySettings"][0] {
          deliveryCost,
          freeDeliveryThreshold
        }
      }`;
      const data = await sanityClient.fetch(query);
      if (data) {
        return {
          aboutImage: data.about?.aboutImage || "",
          aboutTextEnglish: data.about?.aboutTextEnglish,
          aboutTextTelugu: data.about?.aboutTextTelugu,
          picklesImage: data.categories?.picklesImage,
          masalasImage: data.categories?.masalasImage,
          sweetsImage: data.categories?.sweetsImage,
          snacksImage: data.categories?.snacksImage,
          deliveryCost: data.delivery?.deliveryCost,
          freeDeliveryThreshold: data.delivery?.freeDeliveryThreshold
        };
      }
    } catch (err) {
      console.warn("Sanity settings fetch failed.", err);
    }
  }
  return null;
}
