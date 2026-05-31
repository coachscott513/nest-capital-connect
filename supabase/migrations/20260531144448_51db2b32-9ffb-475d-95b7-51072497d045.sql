DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.partner_referrals;
CREATE TRIGGER trg_notify_new_lead
AFTER INSERT ON public.partner_referrals
FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();