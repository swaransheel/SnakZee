import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-anon-key";

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Example helper to log orders or contact messages to Supabase.
 * If credentials are not set, it will log to console as a mockup.
 */
export async function logOrderToSupabase(orderData: any) {
  const isMock = supabaseUrl.includes("mock.supabase.co");
  
  if (isMock) {
    console.log("Supabase Mock Order Logged:", orderData);
    return { data: { success: true, mock: true }, error: null };
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select();

    return { data, error };
  } catch (err) {
    console.error("Supabase Order Log Error:", err);
    return { data: null, error: err };
  }
}
