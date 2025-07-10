import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mkcaxdsugnkzvvbxtgng.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rY2F4ZHN1Z25renZ2Ynh0Z25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjE0NzYsImV4cCI6MjA2NzczNzQ3Nn0.JoB-06gXVHxXWBooK6Xx90S4QZe02KiM-h1_7Q6rwBA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

