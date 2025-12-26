import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tpwonzripeslsvzdchti.supabase.co'
const supabaseAnonKey = 'sb_publishable_5Il1EcKcysyU645irV_jlw_nzXgrHt7'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
