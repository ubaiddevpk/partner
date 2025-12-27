import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tpwonzripeslsvzdchti.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwd29uenJpcGVzbHN2emRjaHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MjYzMjIsImV4cCI6MjA4MjMwMjMyMn0.hqSzVW3GQTEjxbBzrtriEcc_AmIWMBY9tIQDVGOzF64'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'sb-tpwonzripeslsvzdchti-auth-token'
  }
})