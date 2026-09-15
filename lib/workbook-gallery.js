// Educational raster artwork supplied for this project, distributed by theme.
// Vocabulary illustrations are all included in the dictionary and line activities.
export const WORKBOOK_GALLERY = {
  'my-world-in-english': ['/catalog-images/my-world-in-english.png', '/book-images/world.png', '/photos/world.jpg', '/home-reference.png', '/INICO.png', '/catalog-images/catalog-banner.png'],
  'animals-around-us': ['/catalog-images/animals-around-us.png', '/book-images/animals.png', '/photos/animals.jpg', '/resources-images/r4-animals-song.png', '/resources-images/r5-animals-song-2.png', '/activity-images/lion.png'],
  'at-school': ['/catalog-images/at-school.png', '/book-images/school.png', '/photos/school.jpg', '/resources-images/r1-alphabet-song.png'],
  'my-family': ['/catalog-images/my-family.png', '/book-images/family.png', '/photos/family.jpg', '/about-images/about-illustration.png'],
  'food-and-fun': ['/catalog-images/food-and-fun.png', '/resources-images/r6-flashcards.png'],
  'nature-around-us': ['/catalog-images/nature-around-us.png', '/english-kids-frog.png'],
  'colors-and-shapes': ['/catalog-images/colors-and-shapes.png', '/resources-images/r3-colors-for-kids.png'],
  'numbers-everywhere': ['/catalog-images/numbers-everywhere.png', '/resources-images/r2-numbers-1-100.png'],
  'my-amazing-body': ['/catalog-images/my-amazing-body.png', '/resources-images/r9-juegos.png'],
  'places-i-know': ['/catalog-images/places-i-know.png', '/contact-images/contact-illustration.png', '/photos/reading.jpg', '/resources-images/r7-posters.png'],
  'special-celebrations': ['/catalog-images/special-celebrations.png', '/resources-images/r8-worksheets-v2.png'],
};

export function galleryImages(book, second = false) {
  const images = WORKBOOK_GALLERY[book.id];
  const middle = Math.ceil(images.length / 2);
  return second ? images.slice(middle) : images.slice(0, middle);
}
