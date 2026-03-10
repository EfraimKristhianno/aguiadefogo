import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pugkwannvnkskgyxldnb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Z2t3YW5udm5rc2tneXhsZG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTkyMjIsImV4cCI6MjA4ODY3NTIyMn0._ilo0aCVjHi88fXgpdDd-ISHKnT4rAQ3_jh2m2CE2yE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
