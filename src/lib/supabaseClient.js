
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://owzleztogrxabkmqqqop.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93emxlenRvZ3J4YWJrbXFxcW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2OTI1MjQsImV4cCI6MjA4MjI2ODUyNH0.958FoQqAOmi4W-lPTQ1bxwd7IdR4EQOMe1MvMKkrKgg';

export const supabase = createClient(supabaseUrl, supabaseKey);
