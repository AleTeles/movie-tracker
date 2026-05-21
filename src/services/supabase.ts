import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://cwmlwlkmjlwdqhmjcaay.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWx3bGttamx3ZHFobWpjYWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxOTkwNDQsImV4cCI6MjA4NDc3NTA0NH0._pEismOhIOxYGohILdZpdfAJwXlQUaGoC1FpLfypMAI"

export const supabase = createClient(supabaseUrl, supabaseKey)