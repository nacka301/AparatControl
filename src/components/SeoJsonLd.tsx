type SeoJsonLdProps = {
  data: Record<string, unknown>;
  id?: string;
};

export default function SeoJsonLd({ data, id }: SeoJsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
