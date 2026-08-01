export default function Head() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Josiah Blanding",
    "url": "https://webpages.charlotte.edu/jblandin/",
    "image": "https://webpages.charlotte.edu/jblandin/headshotExtended.jpg",
    "jobTitle": ["Full Stack Developer", "Software Developer"],
    "sameAs": [
      "https://www.linkedin.com/in/josiahblanding/",
      "https://github.com/jblandin-art"
    ],
    "email": "mailto:josiahblanding@gmail.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "mailto:josiahblanding@gmail.com",
        "contactType": "professional"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
