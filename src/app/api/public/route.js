import { supabase } from "@/lib/supabase/supabase";

export async function GET(request) {
  const { data, error } = await supabase.from("test").select("*");
  // ...existing code...
  return new Response(JSON.stringify(data), { status: 200 });
}
