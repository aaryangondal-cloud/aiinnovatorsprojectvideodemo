"use client";

const testimonials = [
  {
    quote: "We list 40+ new pieces a month. GemCopy cut our description time from an hour per piece to under a minute. The copy is accurate, professional, and actually sells.",
    name: "Sarah Chen",
    role: "Wholesale Director",
    company: "Lumiere Diamonds, New York",
    initials: "SC",
  },
  {
    quote: "Our online store traffic increased 40% in three months. The SEO tags are exactly what our buyers search for. Every jeweler selling online needs this.",
    name: "Marcus Rivera",
    role: "Founder",
    company: "Rivera Fine Jewelry, Miami",
    initials: "MR",
  },
  {
    quote: "What I love is the accuracy. The specs are always right, the grading language is correct, and the copy is honest - not over-hyped. Our B2B clients trust it.",
    name: "Priya Nair",
    role: "Operations Manager",
    company: "Ananda Gems, Chicago",
    initials: "PN",
  },
  {
    quote: "I used to dread writing descriptions for our lab-grown inventory. Now I load the cert data, hit generate, and it's done. Clean, direct, and searchable.",
    name: "David Kim",
    role: "E-commerce Lead",
    company: "Clarity Co, Los Angeles",
    initials: "DK",
  },
  {
    quote: "The 'Amipi Style' tone is perfect for our store. Wearability-first language that speaks to how people actually shop for jewelry - not how catalogues describe it.",
    name: "Leila Hosseini",
    role: "Head Buyer",
    company: "Goldenthread Jewelers, Houston",
    initials: "LH",
  },
  {
    quote: "We run a small family shop. Before GemCopy we had 200 pieces with copy from 2019. We updated all of them in one afternoon. Game changer.",
    name: "Tom Ferrara",
    role: "Owner",
    company: "Ferrara Fine Jewelry, Boston",
    initials: "TF",
  },
  {
    quote: "The SEO tags it generates are genuinely good. Not generic fluff - real search terms our customers actually use. Our Google traffic doubled in 60 days.",
    name: "Aisha Patel",
    role: "Digital Manager",
    company: "Sparkle District, Atlanta",
    initials: "AP",
  },
  {
    quote: "As a GIA graduate I was skeptical the AI would get the grading language right. It does. Every term is used correctly. I can trust it for our trade clients.",
    name: "Robert Nakamura",
    role: "Graduate Gemologist",
    company: "Pacific Gem House, Seattle",
    initials: "RN",
  },
  {
    quote: "Bridal season used to mean 60-hour weeks just on listings. Last season we used GemCopy and got out at normal hours. The copy converts better too.",
    name: "Maria Santos",
    role: "Sales Director",
    company: "Diamond Dreams, Dallas",
    initials: "MS",
  },
  {
    quote: "Our wholesale customers started commenting that our listings look more professional. We haven't changed anything except the descriptions. That's proof.",
    name: "James Wu",
    role: "Inventory Manager",
    company: "Crown Wholesale, San Francisco",
    initials: "JW",
  },
  {
    quote: "I tried three other AI tools first. None of them understood jewelry grading. GemCopy clearly was built by people who know the industry.",
    name: "Nina Goldberg",
    role: "Creative Director",
    company: "Studio Nova Jewelry, NYC",
    initials: "NG",
  },
  {
    quote: "Fixed our biggest problem: inconsistent copy across 500 SKUs. Everything sounds like us now. One voice, one standard, every listing.",
    name: "Carlos Mendez",
    role: "Brand Manager",
    company: "Prestige Collection, Phoenix",
    initials: "CM",
  },
];

const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 8);
const col3 = testimonials.slice(8, 12);

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-navy-600 flex items-center justify-center text-white text-xs font-black shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-black text-navy-700">{t.name}</p>
          <p className="text-xs text-gray-400">{t.role} - {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function ScrollColumn({ items, duration, direction = "up" }: {
  items: typeof testimonials;
  duration: number;
  direction?: "up" | "down";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden h-[600px]">
      <div
        className="flex flex-col"
        style={{
          animation: `scroll-${direction} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
      {/* top and bottom fade */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-gray-50 py-20 overflow-hidden">
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Real Results</span>
          <h2 className="text-3xl font-black text-navy-700 mt-2">Loved by independent jewelers</h2>
          <p className="text-gray-400 text-sm mt-2">Join hundreds of jewelers writing better listings in seconds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScrollColumn items={col1} duration={28} direction="up" />
          <ScrollColumn items={col2} duration={22} direction="down" />
          <ScrollColumn items={col3} duration={32} direction="up" />
        </div>
      </div>
    </section>
  );
}
