import { ExternalLink } from "lucide-react";

interface SearchLink {
  text: string;
  href: string;
}

interface SearchCategory {
  title: string;
  links: SearchLink[];
}

const searchCategories: SearchCategory[] = [
  {
    title: "Investment Searches",
    links: [
      {
        text: "Multi-Family Homes Under $300k in Albany NY",
        href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=300000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map"
      },
      {
        text: "All Multi-Family Properties in Albany County NY",
        href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map"
      }
    ]
  },
  {
    title: "Area Searches",
    links: [
      {
        text: "Homes for Sale in Albany County NY",
        href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=0&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map"
      }
    ]
  },
  {
    title: "Price Searches",
    links: [
      {
        text: "Homes Under $300k in Albany County NY",
        href: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=300000&beds=0&baths=0&types%5B%5D=0&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map"
      }
    ]
  }
];

const QuickSearchBlock = () => {
  return (
    <section 
      className="py-16 px-4 bg-background"
      aria-labelledby="quick-search-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 
            id="quick-search-heading"
            className="font-playfair text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3"
          >
            Quick Property Search
          </h2>
          <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
            Browse curated listings in the Capital District
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {searchCategories.map((category) => (
            <article key={category.title} className="space-y-4">
              <h3 className="font-playfair text-xl font-medium text-foreground border-b border-border/30 pb-2">
                {category.title}
              </h3>
              <ul className="space-y-3" role="list">
                {category.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-light leading-relaxed group-hover:underline underline-offset-2">
                        {link.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground font-light">
            All listings provided by RE/MAX • Updated daily
          </p>
        </footer>
      </div>
    </section>
  );
};

export default QuickSearchBlock;
