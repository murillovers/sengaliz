CREATE TABLE public.product_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 12000),
  parts JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.product_chat_messages TO authenticated;
GRANT ALL ON public.product_chat_messages TO service_role;

ALTER TABLE public.product_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view their own product chat"
ON public.product_chat_messages
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Customers can add their own product chat messages"
ON public.product_chat_messages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Customers can clear their own product chat"
ON public.product_chat_messages
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX product_chat_messages_user_created_idx
ON public.product_chat_messages (user_id, created_at, id);

CREATE OR REPLACE FUNCTION public.update_product_chat_messages_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_product_chat_messages_updated_at
BEFORE UPDATE ON public.product_chat_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_product_chat_messages_updated_at();