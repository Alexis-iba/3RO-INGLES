import Link from "next/link";
import BookCoverArt from "./illustrations/BookCoverArt";
import { CATEGORIES, CATEGORY_COLORS, TAG_CLASSES, COVER_GRADIENTS } from "@/lib/data";

export default function BookCard({ book }) {
  const color = CATEGORY_COLORS[book.category] || "blue";
  const label = CATEGORIES.find((c) => c.id === book.category)?.label || "";

  return (
    <Link
      href={`/libros/${book.id}`}
      className="book-card card card-hover flex flex-col overflow-hidden"
    >
      <div className={`book-cover flex flex-col h-32 items-center justify-center bg-gradient-to-br ${COVER_GRADIENTS[book.category]}`}>
        <span className="book-cover-title">{book.title}</span>
        <BookCoverArt art={book.art} className="h-24 w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-heading text-[15px] font-extrabold text-navy">{book.title}</h3>
        <span className="text-xs text-navy/60">{book.unit}</span>
        <span className={`tag ${TAG_CLASSES[color]} mt-auto w-fit`}>{label}</span>
      </div>
    </Link>
  );
}
