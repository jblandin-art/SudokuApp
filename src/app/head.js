export default function Head() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Sudoku Solver",
    "description": "A challenging and addictive Sudoku puzzle game with multiple difficulty levels",
    "url": "https://webpages.charlotte.edu/jblandin/",
    "image": "https://webpages.charlotte.edu/jblandin/sudoku-1920w.png",
    "applicationCategory": "GameApplication",
    "genre": "Puzzle",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Josiah Blanding"
    },
    "sameAs": [
      "https://www.linkedin.com/in/josiahblanding/",
      "https://github.com/jblandin-art"
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
