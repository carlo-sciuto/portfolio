import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { config } from "@/lib/config";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
}

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export function SEO({
  title,
  description,
  image = `${config.site.url}/og-image.png`,
  url = config.site.url,
  type = "website",
}: SEOProps) {
  const { i18n } = useTranslation();

  const fullTitle = title ? `${title} | ${config.site.name}` : config.site.name;
  const metaDescription = description || config.site.description;

  // JSON-LD Structured Data for Person schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.site.author,
    url: config.site.url,
    email: config.site.email,
    jobTitle: "Senior Full Stack Developer",
    sameAs: [config.site.linkedin, config.site.github],
    description: config.site.description,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={i18n.language} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="author" content={config.site.author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={i18n.language} />
      <meta property="og:site_name" content={config.site.name} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
