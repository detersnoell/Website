import type { Bundle, Product, ProductSlug } from "./types";

/*
 * Redaktioneller Katalog. Preise entsprechen dem Stand des WooCommerce-Shops
 * (Store API, 2026-09-24); das Backend bleibt die Quelle der Wahrheit.
 *
 * Wirkaussagen bewusst als Pflegeaussagen formuliert (keine Heil-/
 * Arzneimittelversprechen).
 *
 * Bilder: Übergangsmaterial bis zum Fotoshooting.
 */

const shampooFaq = {
  q: "Warum schäumt das Shampoo nicht?",
  a: "Schaum sagt nichts über die Reinigungsleistung aus. Unsere Shampoos reinigen mit milden, pflanzlichen Tensiden und kommen ohne Seife und Schaum aus. So lassen sie sich leichter und vollständig ausspülen.",
};

export const products: Record<ProductSlug, Product> = {
  warmduscher: {
    slug: "warmduscher",
    name: "Warmduscher",
    kind: "Shampoo",
    forWhom: "Shampoo für empfindliche und allergieanfällige Haut",
    need: "Empfindliche Haut",
    lead: "Reinigt Fell und Haut besonders sanft und beruhigt gereizte Hautstellen. Mit Lavendelöl, Arnika und Ringelblume, seifen- und schaumfrei.",
    notFor: {
      text: "Hat dein Hund robustes Fell und geht es vor allem um Glanz und Kämmbarkeit, passt Raufbold besser.",
      alternative: "raufbold",
    },
    highlights: [
      "Für empfindliche, zu Reizungen neigende Haut",
      "Seifen- und schaumfrei, pH-angepasst",
      "Mild genug für die regelmäßige Anwendung",
    ],
    keyIngredients: [
      { name: "Lavendelöl", benefit: "wirkt beruhigend auf gereizte Haut" },
      { name: "Arnika & Ringelblume", benefit: "pflegen empfindliche Hautstellen" },
      { name: "Bio-Jojobaöl", benefit: "spendet Feuchtigkeit, ohne zu fetten" },
    ],
    usage: [
      "Fell gründlich mit lauwarmem Wasser anfeuchten.",
      "Etwas Shampoo in Wasser verdünnen und in Fell und Haut einmassieren. Dass es nicht schäumt, ist gewollt.",
      "Gründlich ausspülen und mit einem Handtuch trocken rubbeln.",
    ],
    inci: [
      { inci: "Aqua", plain: "Wasser" },
      { inci: "Glycerin", plain: "Pflanzliches Glycerin, bindet Feuchtigkeit" },
      { inci: "Coco Glucoside", plain: "Mildes Tensid aus Kokos und Zucker" },
      { inci: "Sodium Coco-Sulfate", plain: "Tensid aus Kokosöl" },
      { inci: "Lauryl Glucoside", plain: "Mildes Zuckertensid" },
      { inci: "Polyglyceryl-2 Caprate", plain: "Pflanzlicher Emulgator" },
      { inci: "Glyceryl Oleate", plain: "Rückfettender Pflanzenstoff" },
      { inci: "Simmondsia Chinensis Seed Oil", plain: "Jojobaöl", organic: true },
      { inci: "Polyglyceryl-10 Laurate", plain: "Pflanzlicher Emulgator" },
      { inci: "Lavandula Angustifolia Oil", plain: "Lavendelöl" },
      { inci: "Betaine", plain: "Feuchtigkeitsspender aus Zuckerrüben" },
      { inci: "Arnica Montana Flower Extract", plain: "Arnikablütenextrakt" },
      { inci: "Calendula Officinalis Flower Extract", plain: "Ringelblumenextrakt" },
      { inci: "Cymbopogon Winterianus Herb Oil", plain: "Citronellaöl" },
      { inci: "Maris Sal", plain: "Meersalz" },
      { inci: "Citric Acid", plain: "Zitronensäure, stellt den pH-Wert ein" },
      { inci: "Sorbitan Caprylate", plain: "Naturbasierter Konservierungshelfer" },
      { inci: "Benzyl Alcohol", plain: "Naturidentischer Konservierungsstoff" },
      { inci: "Linalool", plain: "Natürlicher Bestandteil ätherischer Öle" },
    ],
    vegan: true,
    scent: "Lavendel, dezent",
    frequency: "Bei Bedarf, auch regelmäßig",
    images: [
      { src: "/images/products/warmduscher.jpg", alt: "Warmduscher Shampoo, 200-ml-Flasche mit Faltschachtel", role: "packshot", width: 1260, height: 1620 },
    ],
    variants: [
      { sku: "MB-WD-200", size: { value: 200, unit: "ml" }, priceGross: 2650, commerceIds: { woocommerce: 235 }, inStock: true },
    ],
    accent: "var(--accent-warmduscher)",
    faq: [
      shampooFaq,
      { q: "Wie oft darf ich meinen Hund damit waschen?", a: "Der Warmduscher ist mild genug für die regelmäßige Anwendung, zum Beispiel auch für die Pfoten nach dem Spaziergang." },
    ],
    seo: {
      title: "Warmduscher – natürliches Hundeshampoo für empfindliche Haut",
      description: "Seifen- und schaumfreies Hundeshampoo mit Lavendelöl, Arnika und Ringelblume. NPS-zertifiziert, hergestellt im Allgäu. 200 ml.",
    },
  },

  raufbold: {
    slug: "raufbold",
    name: "Raufbold",
    kind: "Shampoo",
    forWhom: "Shampoo für robustes, langes Fell",
    need: "Robustes Fell",
    lead: "Macht das Fell geschmeidig, glänzend und leicht kämmbar. Mit Bio-Arganöl aus Marokko, seifen- und schaumfrei.",
    notFor: {
      text: "Neigt die Haut deines Hundes zu Reizungen oder Allergien, empfehlen wir den Warmduscher.",
      alternative: "warmduscher",
    },
    highlights: [
      "Für Glanz und leichte Kämmbarkeit",
      "Mit Bio-Arganöl aus Marokko",
      "Seifen- und schaumfrei, pH-angepasst",
    ],
    keyIngredients: [
      { name: "Bio-Arganöl", benefit: "macht das Fell geschmeidig und glänzend" },
      { name: "Glycerin & Betain", benefit: "binden Feuchtigkeit in Haut und Fell" },
      { name: "Zedernholz & Lemongras", benefit: "sorgen für einen frischen, natürlichen Duft" },
    ],
    usage: [
      "Fell gründlich mit lauwarmem Wasser anfeuchten.",
      "Etwas Shampoo in Wasser verdünnen und bis auf die Haut einmassieren.",
      "Gründlich ausspülen, trocken rubbeln und durchkämmen.",
    ],
    inci: [
      { inci: "Aqua", plain: "Wasser" },
      { inci: "Coco Glucoside", plain: "Mildes Tensid aus Kokos und Zucker" },
      { inci: "Glycerin", plain: "Pflanzliches Glycerin, bindet Feuchtigkeit" },
      { inci: "Sodium Coco-Sulfate", plain: "Tensid aus Kokosöl" },
      { inci: "Lauryl Glucoside", plain: "Mildes Zuckertensid" },
      { inci: "Polyglyceryl-2 Caprate", plain: "Pflanzlicher Emulgator" },
      { inci: "Glyceryl Oleate", plain: "Rückfettender Pflanzenstoff" },
      { inci: "Argania Spinosa Kernel Oil", plain: "Arganöl", organic: true },
      { inci: "Polyglyceryl-10 Laurate", plain: "Pflanzlicher Emulgator" },
      { inci: "Betaine", plain: "Feuchtigkeitsspender aus Zuckerrüben" },
      { inci: "Cedrus Atlantica Wood Oil", plain: "Atlas-Zedernholzöl" },
      { inci: "Cymbopogon Flexuosus Oil", plain: "Lemongrasöl" },
      { inci: "Citric Acid", plain: "Zitronensäure, stellt den pH-Wert ein" },
      { inci: "Sorbitan Caprylate", plain: "Naturbasierter Konservierungshelfer" },
      { inci: "Benzyl Alcohol", plain: "Naturidentischer Konservierungsstoff" },
      { inci: "Citral", plain: "Natürlicher Bestandteil ätherischer Öle" },
    ],
    vegan: true,
    scent: "Zedernholz & Lemongras",
    frequency: "Bei Bedarf, auch regelmäßig",
    images: [
      { src: "/images/products/raufbold.jpg", alt: "Raufbold Shampoo, 200-ml-Flasche mit Faltschachtel", role: "packshot", width: 1260, height: 1477 },
    ],
    variants: [
      { sku: "MB-RB-200", size: { value: 200, unit: "ml" }, priceGross: 2380, commerceIds: { woocommerce: 263 }, inStock: true },
    ],
    accent: "var(--accent-raufbold)",
    faq: [
      shampooFaq,
      { q: "Hilft Raufbold beim Kämmen?", a: "Ja. Das Bio-Arganöl macht das Fell geschmeidig, dadurch lässt es sich nach dem Waschen leichter durchkämmen." },
    ],
    seo: {
      title: "Raufbold – natürliches Hundeshampoo mit Bio-Arganöl",
      description: "Seifen- und schaumfreies Hundeshampoo mit Bio-Arganöl für Glanz und leichte Kämmbarkeit. NPS-zertifiziert, hergestellt im Allgäu. 200 ml.",
    },
  },

  hasenfuessin: {
    slug: "hasenfuessin",
    name: "Hasenfüßin",
    kind: "Pfotenbalsam",
    forWhom: "Balsam für Pfoten, Nase und trockene Hautstellen",
    need: "Pfoten & Nase",
    lead: "Pflegt beanspruchte, rissige Pfotenballen und trockene Nasen. Zieht gut ein und schützt im Sommer wie im Winter.",
    notFor: {
      text: "Kein Ersatz für eine tierärztliche Behandlung: Bei offenen Wunden oder Entzündungen bitte zuerst zum Tierarzt.",
    },
    highlights: [
      "Pflegt rissige und beanspruchte Pfoten",
      "Auch für Nase und trockene Hautstellen",
      "Für Sommer und Winter",
    ],
    keyIngredients: [
      { name: "Mandel- & Bio-Jojobaöl", benefit: "machen die Ballen geschmeidig" },
      { name: "Propolis", benefit: "pflegt beanspruchte Haut" },
      { name: "Carnaubawachs", benefit: "legt einen schützenden Film auf die Haut" },
    ],
    usage: [
      "Pfoten reinigen und abtrocknen.",
      "Eine kleine Menge aus dem Tiegel gleichmäßig in die Ballen oder auf die Nase massieren.",
      "Kurz einziehen lassen: vor dem Spaziergang oder nach der Pfotenwäsche.",
    ],
    inci: [
      { inci: "Prunus Amygdalus Dulcis Oil", plain: "Mandelöl" },
      { inci: "Cera Alba", plain: "Bienenwachs" },
      { inci: "Simmondsia Chinensis Seed Oil", plain: "Jojobaöl", organic: true },
      { inci: "Ricinus Communis Seed Oil", plain: "Rizinusöl" },
      { inci: "Olea Europaea Fruit Oil", plain: "Olivenöl", organic: true },
      { inci: "Larix Europaea Wood Extract", plain: "Lärchenholzextrakt" },
      { inci: "Bisabolol", plain: "Wirkstoff der Kamille" },
      { inci: "Propolis Extract", plain: "Propolisextrakt" },
      { inci: "Daucus Carota Sativa Extract", plain: "Karottenextrakt", organic: true },
      { inci: "Citrus Nobilis Peel Oil", plain: "Mandarinenöl" },
      { inci: "Copernicia Cerifera Cera", plain: "Carnaubawachs" },
      { inci: "Tocopherol", plain: "Natürliches Vitamin E" },
      { inci: "Ascorbyl Palmitate", plain: "Vitamin-C-Ester, schützt die Öle" },
      { inci: "Abies Sibirica Needle Oil", plain: "Fichtennadelöl" },
      { inci: "Commiphora Myrrha Oil", plain: "Myrrhenöl" },
      { inci: "Rosmarinus Officinalis Leaf Extract", plain: "Rosmarinextrakt", organic: true },
      { inci: "Mel", plain: "Blütenhonig" },
      { inci: "Alcohol", plain: "Alkohol" },
      { inci: "Aqua", plain: "Wasser" },
      { inci: "Limonene", plain: "Natürlicher Bestandteil ätherischer Öle" },
      { inci: "Linalool", plain: "Natürlicher Bestandteil ätherischer Öle" },
    ],
    // Laut Nutzer vegan; die veröffentlichte INCI nennt jedoch Bienenwachs,
    // Propolis und Honig. Bis zur Klärung nicht als vegan ausweisen.
    vegan: false,
    scent: "Mandarine & Fichtennadel, dezent",
    frequency: "Vor oder nach dem Spaziergang",
    images: [
      { src: "/images/products/hasenfuessin-packshot.jpg", alt: "Hasenfüßin Pfotenbalsam: geöffneter 50-ml-Tiegel neben der Faltschachtel", role: "packshot", width: 1312, height: 841, focus: "74% 55%" },
      { src: "/images/products/hasenfuessin-textur.jpg", alt: "Geöffneter Tiegel mit cremigem Balsam", role: "texture", width: 921, height: 894 },
      { src: "/images/products/hasenfuessin-aufsicht.jpg", alt: "Blick von oben in den geöffneten Tiegel", role: "texture", width: 436, height: 347 },
    ],
    variants: [
      { sku: "MB-HF-50", size: { value: 50, unit: "ml" }, priceGross: 1995, commerceIds: { woocommerce: 574 }, inStock: true },
    ],
    accent: "var(--accent-hasenfuessin)",
    faq: [
      { q: "Kann ich die Hasenfüßin auch für die Nase verwenden?", a: "Ja. Sie eignet sich für Pfotenballen, Nase und trockene Hautstellen." },
      { q: "Wie oft sollte ich sie auftragen?", a: "Bei beanspruchten Pfoten gern täglich: vor dem Spaziergang als Schutz oder danach zur Pflege." },
    ],
    seo: {
      title: "Hasenfüßin – natürlicher Pfotenbalsam für Hunde",
      description: "Natürlicher Pfotenbalsam für rissige Pfoten, Nase und trockene Hautstellen. NPS-zertifiziert, hergestellt im Allgäu. 50 ml.",
    },
  },
};

export const productOrder: ProductSlug[] = ["warmduscher", "raufbold", "hasenfuessin"];

export const allProducts = productOrder.map((s) => products[s]);

export function getProduct(slug: string): Product | undefined {
  return (products as Record<string, Product>)[slug];
}

export const bundles: Bundle[] = [
  {
    slug: "duo-warmduscher",
    name: "Duo Sensibel",
    description: "Warmduscher und Hasenfüßin: die Pflege für empfindliche Hunde, von Kopf bis Pfote.",
    items: [
      { slug: "warmduscher", qty: 1 },
      { slug: "hasenfuessin", qty: 1 },
    ],
  },
  {
    slug: "duo-raufbold",
    name: "Duo Robust",
    description: "Raufbold und Hasenfüßin: Glanz fürs Fell, Pflege für die Pfoten.",
    items: [
      { slug: "raufbold", qty: 1 },
      { slug: "hasenfuessin", qty: 1 },
    ],
  },
  {
    slug: "alle-drei",
    name: "Alle drei",
    description: "Beide Shampoos und die Hasenfüßin, ideal für mehrere Hunde oder zum Kennenlernen. Versandkostenfrei.",
    items: [
      { slug: "warmduscher", qty: 1 },
      { slug: "raufbold", qty: 1 },
      { slug: "hasenfuessin", qty: 1 },
    ],
  },
];

export function bundlePrice(bundle: Bundle): number {
  return (
    bundle.priceGross ??
    bundle.items.reduce((sum, i) => sum + products[i.slug].variants[0].priceGross * i.qty, 0)
  );
}
