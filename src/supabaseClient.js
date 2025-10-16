import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ejoqpabhwzxpitrncdtc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqb3FwYWJod3p4cGl0cm5jZHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MDE5NDIsImV4cCI6MjA3NTI3Nzk0Mn0.wmAVa05d4EN9NUSY3d-xaBLDpi3x4h8CUyJp8bx6ji0';

export const supabase = createClient(supabaseUrl, supabaseKey);
