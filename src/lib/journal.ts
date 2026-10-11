export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  heroImage: string;
  excerpt: string;
  content: string[];
  recommendedAesthetic: string;
  keyTakeaways: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "anatomy-of-quiet-luxury",
    title: "The Anatomy of Quiet Luxury: Silhouettes, Textures & Nuance",
    subtitle: "Why true sophistication avoids logos and focuses entirely on proportional drape, weave density, and tonal cohesion.",
    category: "Philosophy",
    readTime: "6 min read",
    date: "October 2026",
    heroImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Quiet luxury is not a price tag—it is the deliberate mastery of tactile tension, monochrome undertones, and unhurried tailoring.",
    keyTakeaways: [
      "Prioritize unbrushed noble fibers: virgin wool, Mongolian baby cashmere, and heavy French linen.",
      "Muted undertones (tobacco, charcoal, slate, and bone) harmonize far more effortlessly than high-contrast primaries.",
      "Allow one architectural accent piece—such as a Deadly Ponies bovine leather bag or brass signet—to ground the fluid silhouette.",
    ],
    content: [
      "In an era inundated with conspicuous branding, the quietest wardrobe often makes the most definitive impression. Quiet luxury is rooted in the restraint of craft: garments designed to be felt rather than announced.",
      "The foundation begins with silhouette geometry. Where fast fashion relies on synthetic elasticity to mimic shape, artisanal tailoring achieves drape through fabric weight. A double-pleated flannel trouser in worsted wool falls in an unbroken vertical plane from hip to hem, creating effortless elongation.",
      "Color harmony in quiet luxury rejects stark contrasts in favor of subtle gradients. Pairing camel cashmere with charcoal wool, or layering ecru cotton with sand suede, generates depth without visual noise. When accessorizing, reach for natural materials with intrinsic patina—vegetable-tanned leather, hand-cast brass, and unpolished horn buttons.",
    ],
    recommendedAesthetic: "Quiet Luxury",
  },
  {
    slug: "trouser-shoe-pairing-guide",
    title: "Shoe-to-Hem Geometry: The Definitive Trouser Pairing Guide",
    subtitle: "Mastering the break, leg opening width, and footwear sole profile for seamless elegance.",
    category: "Masterclass",
    readTime: "7 min read",
    date: "September 2026",
    heroImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=80",
    excerpt: "The point where your trouser meets your shoe dictates the entire proportion of your outfit. Here is the mathematical formula for perfect balance.",
    keyTakeaways: [
      "Wide-leg pleated trousers demand low-profile loafers or sleek almond-toe derbies with a subtle half-break.",
      "Cropped or tapered trousers shine with robust footwear: chunky penny loafers, Chelsea boots, or clean minimalist sneakers.",
      "Never allow wide hems to bunch heavily over lightweight slip-ons; ensure the hem rests lightly on the vamp.",
    ],
    content: [
      "Most outfit disharmonies occur at ankle height. You can wear a bespoke cashmere overcoat, but if your trouser hem pools haphazardly over an incompatible shoe profile, the entire architectural balance collapses.",
      "Rule 1: The Width-to-Sole Equation. A wide trouser opening (22cm+) creates visual weight. Pairing it with a razor-thin sole can make the foot appear lost. Balance wide wool trousers with a substantial leather welt, such as Crockett & Jones tassel loafers or G.H. Bass Weejuns.",
      "Rule 2: The Clean No-Break. For tapered, smart-casual trousers, the no-break hem—where the cuff floats exactly 1cm above the shoe vamp—reveals the ankle line and showcases footwear craftsmanship without fabric distortion.",
    ],
    recommendedAesthetic: "Old Money",
  },
  {
    slug: "deadly-ponies-leather-craft",
    title: "Deadly Ponies & The Art of Handcrafted Leather Accents",
    subtitle: "How New Zealand's cult leather atelier revolutionized sculptural bags, vegetable tannins, and brass hardware.",
    category: "Brand Spotlight",
    readTime: "5 min read",
    date: "August 2026",
    heroImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Exploring the tactile genius of Deadly Ponies: supple bovine hides, deer nappa leather, and how a single accessory transforms an outfit.",
    keyTakeaways: [
      "Ethically sourced New Zealand bovine and deer nappa leathers age with a rich, unique patina.",
      "Hand-cast solid brass hardware introduces an artisanal, heirloom finish that elevates minimalist clothing.",
      "A structured leather crossbody bag like the Mr Mini Bandit bridges the gap between formal tailoring and everyday utilitarian ease.",
    ],
    content: [
      "Founded with an uncompromising devotion to material integrity, Deadly Ponies stands as a beacon of Antipodean luxury. While European heritage houses often lean into hyper-structured canvas and monogram prints, Deadly Ponies celebrates the raw, buttery tactility of full-grain leather.",
      "The Mr Mini Bandit and Poucher Grande are prime examples of sculptural minimalism. By pairing rich black bovine leather with hand-finished solid brass zip teeth, the pieces act as tactile jewelry for your wardrobe.",
      "In our AI styling engine, Deadly Ponies accessories serve as the quintessential 'anchor point'. When an outfit is composed of matte textures like wool and cashmere, the subtle sheen of vegetable-tanned leather introduces the essential dimension needed to complete the silhouette.",
    ],
    recommendedAesthetic: "Quiet Luxury",
  },
  {
    slug: "capsule-wardrobe-formula",
    title: "The Capsule Wardrobe Formula: 10 Pieces, 30 Refined Looks",
    subtitle: "A ruthless curation guide to building a versatile, high-utility luxury wardrobe that travels anywhere.",
    category: "Capsule Guide",
    readTime: "8 min read",
    date: "July 2026",
    heroImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Streamline your closet down to 10 interconnected pieces that multiply into dozens of coordinated, effortless combinations.",
    keyTakeaways: [
      "The 10-piece matrix: 3 Tops, 2 Trousers, 2 Outerwear layers, 2 Footwear pairs, and 1 Signature Leather Accessory.",
      "Stick to a 3-color palette: 2 neutrals (charcoal, navy, black) + 1 warm tone (camel, tobacco, oatmeal).",
      "Ensure every top harmonizes seamlessly with both pairs of trousers.",
    ],
    content: [
      "Wardrobe fatigue stems from having too many disjointed items and not enough cohesive systems. The capsule methodology replaces arbitrary shopping with a modular ecosystem where every piece communicates with the rest.",
      "The essential 10 items include: 1. Camel Cashmere Knit, 2. White Supima Cotton Tee, 3. Oxford Button-Down Shirt, 4. Charcoal Pleated Wool Trousers, 5. Raw Selvedge Denim, 6. Double-Breasted Wool Overcoat, 7. Tailored Gabardine Trench, 8. Polished Penny Loafers, 9. Minimalist White Nappa Sneakers, 10. Deadly Ponies Leather Crossbody Bag.",
      "With these 10 elements, you can assemble 30 distinct looks ranging from smart casual coffee runs to gallery vernissages and black-tie dinners.",
    ],
    recommendedAesthetic: "Minimalist",
  },
  {
    slug: "high-low-dressing",
    title: "High-Low Dressing: Pairing Heritage Pieces with High-Street Essentials",
    subtitle: "How to balance luxury investment items with accessible staples from Uniqlo and COS without compromising aesthetic rigor.",
    category: "Styling Advice",
    readTime: "6 min read",
    date: "June 2026",
    heroImage: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80",
    excerpt: "True style intelligence lies in knowing exactly where to invest your capital and where high-street basics perform flawlessly.",
    keyTakeaways: [
      "Invest in contact points: shoes, leather goods, watches, and heavy outerwear.",
      "Save on foundational layers: heavyweight cotton crewnecks from Uniqlo U or flowy pleated trousers from COS.",
      "The high-low contrast creates an approachable, effortless chic that full-designer looks often lack.",
    ],
    content: [
      "Dressing head-to-toe in luxury runway brands often looks contrived. The most compelling personal style combines high-end heirloom pieces with accessible, well-engineered staples.",
      "The golden rule of high-low styling is simple: invest where craftsmanship, leather grain, and architectural silhouette are unforgeable. A Deadly Ponies Ranger Belt, a Cartier Tank watch, or Loro Piana suede loafers carry an undeniable presence.",
      "Conversely, modern brands like Uniqlo U (helmed by Christophe Lemaire) produce heavyweight Supima cotton tees that hold their collar shape better than tees costing ten times as much. When anchored by tailored trousers and luxury leather accessories, the entire outfit presents as effortless quiet luxury.",
    ],
    recommendedAesthetic: "Smart Casual",
  },
  {
    slug: "scent-architecture",
    title: "Scent Architecture: Selecting Fragrance as an Invisible Layer",
    subtitle: "Why the final touch of any outfit is not visual, but olfactive.",
    category: "Vibe & Atmosphere",
    readTime: "5 min read",
    date: "May 2026",
    heroImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Matching olfactive families (woody, leathery, ambery, clean aldehydes) to your wardrobe silhouette and seasonal climate.",
    keyTakeaways: [
      "Heavy wools and leather pair best with warm, dry woods (Santal 33, cedarwood, cardamom).",
      "Linen and relaxed cotton crave clean aldehydes, iris, and crisp vetiver.",
      "Treat fragrance not as an afterthought, but as the invisible acoustic tone of your visual outfit.",
    ],
    content: [
      "An outfit is an experience for all senses. When you wear a tailored wool coat and hand-buffed calfskin shoes, wearing a cloying, synthetic aquatic fragrance creates dissonance.",
      "Atelier AI integrates fragrance into every outfit capsule because scent serves as the emotional sealant. For old-money and quiet luxury edits, niche fragrances with prominent notes of sandalwood (Le Labo Santal 33), raw tobacco (Maison Margiela Jazz Club), or Tuscan leather (Tom Ford Ombré Leather) provide the tactile resonance that visually matches heavy woolen fabrics.",
    ],
    recommendedAesthetic: "Old Money",
  },
];
