// Supabase config shared across login, signup, profile, and the app
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Your project credentials
export const SUPABASE_URL = "https://pvloabwzczvfvfcqukak.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bG9hYnd6Y3p2ZnZmY3F1a2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTY5MzUsImV4cCI6MjA4MDMzMjkzNX0.T1KHWYHi7vVB2gwbl27ziRu7h4aHA19vh4QMUMSOzQs";

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Also expose it on window for any non-module scripts if needed
if (typeof window !== "undefined") {
  window.supabase = supabase;
}
