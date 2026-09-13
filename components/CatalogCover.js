import Image from "next/image";
import BookCoverArt from "./illustrations/BookCoverArt";

const ART = {
  world: ["world", "boy", "girl"], animals: ["elephant", "lion"],
  school: ["school", "boy", "girl"], family: ["family"],
  food: ["pizza", "apple"], nature: ["tree", "elephant", "lion"],
};

export default function CatalogCover({ book }) {
  return <div className={`catalog-cover cover-theme-${book.art}`}>
    <h2>{book.title}</h2>
    <div className="catalog-scene" aria-hidden="true">
      <span className="scene-star">✦</span>
      {ART[book.art] ? ART[book.art].map((name, index) => <Image key={name} src={`/illustrations/${name}.svg`} width={200} height={200} alt="" className={`scene-character scene-character-${index}`} />) : <BookCoverArt art={book.art} className="scene-fallback" />}
    </div>
  </div>;
}
