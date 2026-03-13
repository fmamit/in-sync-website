import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseAgent = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Ticket {
  ticket_id: string;
  project_name: string;
  user_message: string;
  category: 'bug' | 'query' | 'api_issue';
  status: 'open' | 'in_progress' | 'resolved';
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export async function createTicket(
  projectName: string,
  userMessage: string,
  category: Ticket['category']
): Promise<Ticket | null> {
  const { data, error } = await supabaseAgent
    .from('tickets')
    .insert({
      project_name: projectName,
      user_message: userMessage,
      category,
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create ticket:', error.message);
    return null;
  }
  return data as Ticket;
}

export async function getTicketById(ticketId: string): Promise<Ticket | null> {
  const { data, error } = await supabaseAgent
    .from('tickets')
    .select('*')
    .eq('ticket_id', ticketId)
    .single();

  if (error) {
    console.error('Failed to fetch ticket:', error.message);
    return null;
  }
  return data as Ticket;
}

export async function getTicketsByProject(projectName: string): Promise<Ticket[]> {
  const { data, error } = await supabaseAgent
    .from('tickets')
    .select('*')
    .eq('project_name', projectName)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch tickets:', error.message);
    return [];
  }
  return (data as Ticket[]) || [];
}

export async function updateTicketStatus(
  ticketId: string,
  status: Ticket['status'],
  assignedTo?: string
): Promise<Ticket | null> {
  const updateData: Record<string, string> = { status };
  if (assignedTo !== undefined) {
    updateData.assigned_to = assignedTo;
  }

  const { data, error } = await supabaseAgent
    .from('tickets')
    .update(updateData)
    .eq('ticket_id', ticketId)
    .select()
    .single();

  if (error) {
    console.error('Failed to update ticket:', error.message);
    return null;
  }
  return data as Ticket;
}
