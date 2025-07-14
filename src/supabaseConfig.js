import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avccmutkhwraftvyixnq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Y2NtdXRraHdyYWZ0dnlpeG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjExNzksImV4cCI6MjA2NzczNzE3OX0.Nta2R-jPnuPoJ04-xv_NFo6Xqpp1s0r24XwmmGiJ6sg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);