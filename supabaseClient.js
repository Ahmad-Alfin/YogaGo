// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Ganti URL dan Anon Key di bawah ini sesuai dengan yang ada di Dashboard Supabase Anda (Project Settings > API)
const SUPABASE_URL = 'https://twmbbrsemhqivtuvyxyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3bWJicnNlbWhxaXZ0dXZ5eHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MTc4MzAsImV4cCI6MjA5NTk5MzgzMH0.CztQgepUAUEBCLHIQskx18vBhWa9HdRWsrpY6kkfHjg';

// Membuat dan mengeksport instance client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);