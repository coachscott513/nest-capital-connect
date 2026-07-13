import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  quote: string;
  attribution?: string;
};

/**
 * A light editorial band inserted mid-page between dark sections
 * to introduce visual rhythm — Apple-style breathing room.
 * Keep short, mobile-friendly, and free of CTAs.
 */
export default function EditorialBreather({ eyebrow, quote, attribution }: Props) {
  return (
    <section className="relative w-full bg-[#F5F3EE] border-y border-black/[0.06]">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#0d6e66]"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-2xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.15] text-[#0B0F19]"
        >
          {quote}
        </motion.p>
        {attribution && (
          <p className="mt-6 text-sm text-neutral-500 font-light tracking-wide">
            {attribution}
          </p>
        )}
      </div>
    </section>
  );
}
