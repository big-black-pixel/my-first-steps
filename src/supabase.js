import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdtzbgyrvaignbemlsgc.supabase.co';
const supabaseKey = 'sb_publishable_7V9soC1TuOI8sH7p_yDY6g_qQjflW1k';

export const supabase = createClient(supabaseUrl, supabaseKey);


// VITE_SUPABASE_URL=https://hdtzbgyrvaignbemlsgc.supabase.co
// VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_7V9soC1TuOI8sH7p_yDY6g_qQjflW1k