import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

export const SMS_CONSENT_TEXT =
  "I agree to be contacted by Capital District Nest via call, email, and text for real estate services. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. You can also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.";

interface SmsConsentProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}

/**
 * TCPA / SMS consent checkbox. Optional by design — never block submission on it.
 * Label text is legally reviewed; do not paraphrase.
 */
const SmsConsent = ({ checked, onCheckedChange, id = "sms-consent", className = "" }: SmsConsentProps) => {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className="mt-0.5 shrink-0"
      />
      <label htmlFor={id} className="text-xs leading-relaxed text-muted-foreground cursor-pointer">
        {SMS_CONSENT_TEXT}{" "}
        <Link to="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
      </label>
    </div>
  );
};

export default SmsConsent;
