// Ten teaching pages per book. Content is specific to each topic.
export const WORKBOOK_TOPICS = {
  'my-world-in-english': {
    groups: ['Meeting someone', 'Saying goodbye'], sort: [['Hello', 'Hi', 'Good morning'], ['Bye', 'See you', 'Good night']],
    story: 'It is morning. Ana meets Ben at school. Ana says, “Good morning!” Ben says, “Hello, Ana!” After school, Ben says, “Bye!” Ana says, “See you!”',
    statements: [['Ana meets Ben at school.', true], ['Ben says “Good night” in the morning.', false], ['Ana says “See you” after school.', true]],
    scene: ['🌅', '🏫', '👧', '👦', '👋'], draw: 'Draw two friends meeting at school. Add a greeting in each speech bubble.', frame: 'A: Hello! My name is ____.  B: Hi! My name is ____.', challenge: 'Act out a morning greeting and an afternoon goodbye with a friend.'
  },
  'animals-around-us': {
    groups: ['Common pets', 'Wild animals'], sort: [['Cat', 'Dog', 'Rabbit'], ['Lion', 'Elephant', 'Monkey']],
    story: 'Mia visits a wildlife park. She sees a big elephant and a lion. A monkey is in a tree. A bird flies over the tree. At home, Mia feeds her cat.',
    statements: [['Mia sees an elephant.', true], ['The monkey is under a bed.', false], ['Mia has a cat at home.', true]],
    scene: ['🐘', '🦁', '🐒', '🌳', '🐦'], draw: 'Draw an animal in its home. Label the animal and tell a friend about it.', frame: 'This is a ____. It is ____.', challenge: 'Describe one animal using its name, size and color.'
  },
  'at-school': {
    groups: ['Things in a backpack', 'Classroom furniture'], sort: [['Book', 'Pencil', 'Ruler'], ['Chair', 'Desk']],
    story: 'Leo is in the classroom. His book and pencil are on the desk. His ruler is in his backpack. The teacher says, “Open your book.” Leo sits on his chair and reads.',
    statements: [['Leo is in the classroom.', true], ['His ruler is on the chair.', false], ['The teacher asks Leo to open his book.', true]],
    scene: ['🏫', '🎒', '📖', '✏️', '🪑'], draw: 'Draw your desk with three school objects. Label each object in English.', frame: 'My ____ is on the desk.', challenge: 'Ask a friend to point to a book, a pencil and a chair.'
  },
  'my-family': {
    groups: ['Parents and grandparents', 'Children'], sort: [['Mother', 'Father', 'Grandmother', 'Grandfather'], ['Sister', 'Brother', 'Baby']],
    story: 'This is Sara’s family. Her mother reads a book. Her father cooks. Her brother plays with the baby. Her grandmother sings. Sara helps her grandfather in the garden.',
    statements: [['Sara’s mother reads a book.', true], ['Sara’s father sings.', false], ['Sara helps her grandfather.', true]],
    scene: ['👩', '📖', '👨', '👶', '👵'], draw: 'Draw a family, real or imaginary. Label three family members.', frame: 'This is the ____. This is the ____.', challenge: 'Introduce three people from your drawing to a friend.'
  },
  'food-and-fun': {
    groups: ['Food', 'Drinks'], sort: [['Pizza', 'Apple', 'Bread', 'Rice'], ['Milk', 'Juice']],
    story: 'Tom has an egg and bread for breakfast. He drinks milk. For lunch, he has rice. In the afternoon, he eats an apple and drinks juice. He likes apples!',
    statements: [['Tom drinks milk at breakfast.', true], ['Tom eats pizza for lunch.', false], ['Tom eats an apple in the afternoon.', true]],
    scene: ['🥚', '🍞', '🥛', '🍚', '🍎'], draw: 'Draw a lunch with two foods and one drink. Label all three.', frame: 'I like ____. My drink is ____.', challenge: 'Tell a friend two foods you like and ask, “What do you like?”'
  },
  'nature-around-us': {
    groups: ['Living things', 'Nonliving things'], sort: [['Tree', 'Flower'], ['Sun', 'Moon', 'River', 'Mountain']],
    story: 'Eva walks beside a river. She sees a tall tree and a yellow flower. Clouds cover the sun. It rains. Then the sun comes out, and Eva sees a rainbow.',
    statements: [['Eva walks beside a river.', true], ['Eva sees a blue flower.', false], ['Eva sees a rainbow after the rain.', true]],
    scene: ['🏞️', '🌳', '🌼', '🌧️', '🌈'], draw: 'Draw a landscape with a river, a tree and the sun. Label them.', frame: 'I can see a ____. The ____ is ____.', challenge: 'Describe the weather and two things you can see outside.'
  },
  'colors-and-shapes': {
    groups: ['Colors', 'Shapes'], sort: [['Red', 'Blue', 'Yellow', 'Green'], ['Circle', 'Square', 'Triangle', 'Star']],
    story: 'Kim makes a picture. She draws a yellow circle for the sun. She draws a blue square for a house and a red triangle for its roof. A green tree is next to the house.',
    statements: [['The sun is a yellow circle.', true], ['The house is a red square.', false], ['The roof is a red triangle.', true]],
    scene: ['☀️', '🟦', '🔺', '🌳'], draw: 'Draw a blue square, a red triangle and a yellow circle. Make them into a picture.', frame: 'This is a ____. It is ____.', challenge: 'Find a circle and a square near you. Name their colors.'
  },
  'numbers-everywhere': {
    groups: ['One to four', 'Five to eight'], sort: [['One', 'Two', 'Three', 'Four'], ['Five', 'Six', 'Seven', 'Eight']],
    story: 'Max has three red balls and two blue balls. He has five balls in all. He gives one red ball to May. Now Max has four balls. May has one ball.',
    statements: [['Max starts with five balls.', true], ['Max gives two balls to May.', false], ['Max has four balls at the end.', true]],
    scene: ['🔴', '🔴', '🔴', '🔵', '🔵'], draw: 'Draw six stars. Color two yellow and four blue. Write the number words.', frame: '____ and ____ make ____.', challenge: 'Count eight classroom objects aloud. Then count backward to one.'
  },
  'my-amazing-body': {
    groups: ['Parts of the head', 'Other body parts'], sort: [['Eye', 'Ear', 'Nose', 'Mouth'], ['Hand', 'Foot', 'Arm']],
    story: 'I use my eyes to see a rainbow. I use my ears to hear a bird. I use my nose to smell a flower. I wave with my hand and kick a ball with my foot.',
    statements: [['I see with my eyes.', true], ['I hear with my nose.', false], ['I kick a ball with my foot.', true]],
    scene: ['👀', '🌈', '👂', '🐦', '🦶', '⚽'], draw: 'Draw a person. Add labels for head, arm, hand and foot.', frame: 'I use my ____ to ____.', challenge: 'Play “Simon says” with a friend: touch your head, nose and ears.'
  },
  'places-i-know': {
    groups: ['Learning and services', 'Outdoor leisure'], sort: [['School', 'Library', 'Hospital', 'Store'], ['Park', 'Beach', 'Zoo']],
    story: 'On Saturday, Lily goes to the library to read. Then she buys an apple at the store. She plays in the park with her brother. In the evening, they go back to their house.',
    statements: [['Lily reads at the library.', true], ['Lily buys an apple at the hospital.', false], ['Lily plays in the park.', true]],
    scene: ['📚', '🏬', '🍎', '🏞️', '🏠'], draw: 'Draw a map with a school, a park and a house. Label the places and draw a path.', frame: 'The ____ is next to the ____.', challenge: 'Use your map to tell a friend how to go from the house to the school.'
  },
  'special-celebrations': {
    groups: ['Special days', 'Party things'], sort: [['Birthday', 'Christmas', 'Halloween', 'New Year'], ['Gift', 'Balloon']],
    story: 'It is Amy’s birthday. Her friends bring a gift and balloons. They sing a song and eat cake. Amy says, “Thank you!” Everyone helps clean up after the party.',
    statements: [['It is Amy’s birthday.', true], ['Her friends bring a tree.', false], ['Everyone helps clean up.', true]],
    scene: ['🎂', '🎁', '🎈', '🎵'], draw: 'Design an invitation for an imaginary celebration. Add a picture, a date and a place.', frame: 'You are invited! Day: ____. Place: ____.', challenge: 'Tell a friend about a celebration you enjoy. Ask about theirs.'
  }
};

export const WORKBOOK_PAGES = [
  ['Picture Dictionary', 'Look at the pictures. Read and say each word.', 'Observa las imágenes. Lee y di cada palabra.'],
  ['Match the Pictures', 'Write the correct letter beside each picture.', 'Escribe la letra correcta junto a cada imagen.'],
  ['Choose the Word', 'Circle the word that names each picture.', 'Encierra la palabra que corresponde a la imagen.'],
  ['Complete the Words', 'Write the missing letters. Use the picture clues.', 'Completa las letras. Usa las imágenes como pistas.'],
  ['Sort and Write', 'Put each word in the correct group.', 'Escribe cada palabra en el grupo correcto.'],
  ['Read a Little Story', 'Read the story aloud. Find the words you know.', 'Lee la historia en voz alta. Busca las palabras que conoces.'],
  ['True or False?', 'Read page 6 again. Mark T or F for each sentence.', 'Vuelve a leer la página 6. Marca verdadero o falso.'],
  ['Draw and Label', 'Create your own picture and add English labels.', 'Crea tu dibujo y escribe etiquetas en inglés.'],
  ['Speak and Write', 'Practice with a friend. Then write your own answer.', 'Practica con alguien. Después escribe tu respuesta.'],
  ['My Learning Check', 'Work on your own. Then check your progress.', 'Trabaja por tu cuenta y revisa tu progreso.']
];

export function exerciseWords(book, page) {
  const offset = page % book.vocab.length;
  return [...book.vocab.slice(offset), ...book.vocab.slice(0, offset)].slice(0, 4);
}
export function matchChoices(book) {
  const words = exerciseWords(book, 1);
  return [words[2], words[0], words[3], words[1]];
}
export function wordOptions(book, word, index) {
  const others = book.vocab.filter(w => w.word !== word.word);
  const result = [others[index % others.length], others[(index + 2) % others.length]];
  result.splice(index % 3, 0, word);
  return result;
}
export function missingLetters(word) {
  return [...word].map((letter, i) => /[a-z]/i.test(letter) && i % 2 ? '_' : letter).join(' ');
}
