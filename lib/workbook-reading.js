// Short, concrete texts for beginning English readers in third grade.
// Each question has exactly one answer explicitly supported by its reading.
const reading = (title, text, pictures, glossary, questions) => ({ title, text, pictures, glossary, questions });
const question = (text, options, answer) => ({ text, options, answer });

export const WORKBOOK_READING = {
  'my-world-in-english': {
    readings: [
      reading('A New Friend', 'It is morning. Ana is at school. She sees a new boy. “Hello! My name is Ana,” she says. “Hi! My name is Ben,” he says. They read a book together. After school, Ana says, “Bye, Ben!” Ben smiles and says, “See you!”', ['Good morning', 'Hi', 'Bye'], [['together', 'juntos'], ['smiles', 'sonríe']], [question('Where is Ana?', ['At the beach', 'At school', 'At a store'], 'At school'), question('What is the boy’s name?', ['Tom', 'Max', 'Ben'], 'Ben'), question('What do they read?', ['A book', 'A map', 'A letter'], 'A book')]),
      reading('Greetings All Day', 'In the morning, Leo says, “Good morning, Dad!” In the afternoon, he sees his teacher. “Good afternoon!” he says. At night, Leo puts his book away. He says, “Good night, Mom!” Then he goes to bed. Leo uses a different greeting at each time of day.', ['Good morning', 'Good afternoon', 'Good night'], [['at night', 'por la noche'], ['goes to bed', 'se va a dormir']], [question('Who does Leo greet in the morning?', ['His dad', 'His teacher', 'His friend'], 'His dad'), question('What does he say to his teacher?', ['Good night', 'Good afternoon', 'Bye'], 'Good afternoon'), question('When does Leo go to bed?', ['In the morning', 'In the afternoon', 'At night'], 'At night')]),
    ],
    sequence: ['Ana meets Ben at school.', 'Ana and Ben read a book.', 'Ana says goodbye after school.'],
    cloze: [['It is ____.', 'morning'], ['Ana and Ben read a ____.', 'book'], ['After school, Ana says, “____!”', 'Bye']],
  },
  'animals-around-us': {
    readings: [
      reading('Pets at Home', 'Sam has a dog and a cat. His dog is small and brown. His cat is white. Every morning, Sam gives his pets water. The dog plays with a ball. The cat sleeps on a chair. At night, Sam puts the ball in a box and says good night.', ['Dog', 'Cat'], [['pets', 'mascotas'], ['sleeps', 'duerme']], [question('How many pets does Sam have?', ['One', 'Two', 'Three'], 'Two'), question('What color is the cat?', ['Brown', 'Black', 'White'], 'White'), question('Where does the cat sleep?', ['On a chair', 'In a tree', 'Under a desk'], 'On a chair')]),
      reading('At the Wildlife Park', 'Mia visits a wildlife park with her dad. An elephant stands near a tree. A lion rests on a rock. A monkey climbs a branch. Mia sees a bird, too. The bird is small. Mia watches the animals quietly. She stays on the path with her dad.', ['Elephant', 'Lion', 'Monkey'], [['quietly', 'en silencio'], ['path', 'sendero']], [question('Who goes with Mia?', ['Her teacher', 'Her sister', 'Her dad'], 'Her dad'), question('Which animal climbs a branch?', ['The lion', 'The monkey', 'The elephant'], 'The monkey'), question('Where does Mia stay?', ['On the path', 'In the tree', 'On the rock'], 'On the path')]),
    ], sequence: ['Sam gives his pets water in the morning.', 'The dog plays with a ball.', 'Sam puts the ball away at night.'],
    cloze: [['Sam has a dog and a ____.', 'cat'], ['His dog is small and ____.', 'brown'], ['The dog plays with a ____.', 'ball']],
  },
  'at-school': {
    readings: [
      reading('Ready for Class', 'Lily puts a book, a pencil and a ruler in her backpack. She walks into the classroom. She sits on a chair beside her desk. The teacher says, “Take out your book.” Lily opens her backpack and finds the book. Now she is ready to read with her class.', ['Backpack', 'Book', 'Teacher'], [['take out', 'saca'], ['ready', 'lista']], [question('Where is Lily’s ruler?', ['In her backpack', 'Under a chair', 'At the park'], 'In her backpack'), question('Who asks for the book?', ['Her brother', 'The teacher', 'Her dad'], 'The teacher'), question('What is Lily ready to do?', ['Swim', 'Cook', 'Read'], 'Read')]),
      reading('Let’s Make a Poster', 'Our class makes a poster. Ben draws a tree with his pencil. Ana draws a sun. They use a ruler to draw a straight line. Their teacher writes the title. Then the children put their pencils in a box. They show the poster to the class and smile.', ['Pencil', 'Ruler', 'Classroom'], [['straight line', 'línea recta'], ['show', 'muestran']], [question('What does Ben draw?', ['A sun', 'A tree', 'A house'], 'A tree'), question('What helps them draw a straight line?', ['A ruler', 'A chair', 'A backpack'], 'A ruler'), question('Who writes the title?', ['Ana', 'Ben', 'The teacher'], 'The teacher')]),
    ], sequence: ['Lily packs her school things.', 'Lily sits beside her desk.', 'Lily takes out her book.'],
    cloze: [['Lily puts her things in a ____.', 'backpack'], ['She sits on a ____.', 'chair'], ['She is ready to ____.', 'read']],
  },
  'my-family': {
    readings: [
      reading('A Family Picnic', 'Sara goes to the park with her family. Her mother brings apples. Her father brings water. Her sister carries a ball. Her brother carries a blanket. They sit under a tree and eat. After lunch, Sara plays with her sister and brother. Everyone helps put the things away.', ['Mother', 'Father', 'Sister'], [['brings', 'trae'], ['blanket', 'manta']], [question('Where does the family go?', ['To a store', 'To school', 'To the park'], 'To the park'), question('Who brings apples?', ['The mother', 'The father', 'The brother'], 'The mother'), question('Who carries the ball?', ['The brother', 'The sister', 'Sara'], 'The sister')]),
      reading('An Afternoon Visit', 'On Sunday, Sara visits her grandmother and grandfather. Her grandmother reads a story. Her grandfather shows her a photo. The photo has a baby in it. “That baby is your father!” he says. Sara laughs. Before she leaves, she gives both grandparents a hug and says, “See you!”', ['Grandmother', 'Grandfather', 'Baby'], [['photo', 'foto'], ['hug', 'abrazo']], [question('Who reads a story?', ['Her father', 'Her grandmother', 'Her grandfather'], 'Her grandmother'), question('Who is the baby in the photo?', ['Sara', 'Her brother', 'Her father'], 'Her father'), question('What does Sara give her grandparents?', ['A hug', 'A ball', 'An apple'], 'A hug')]),
    ], sequence: ['The family brings things to the park.', 'The family eats under a tree.', 'Sara plays after lunch.'],
    cloze: [['Sara goes to the ____.', 'park'], ['Her mother brings ____.', 'apples'], ['Her sister carries a ____.', 'ball']],
  },
  'food-and-fun': {
    readings: [
      reading('A Lunch for Tom', 'Tom helps make his lunch. First, he puts rice and an egg in his lunch box. Next, he washes an apple and adds it. He takes water to drink. At school, Tom eats with his friend. He likes his lunch. When he finishes, he puts his lunch box away.', ['Rice', 'Egg', 'Apple'], [['first', 'primero'], ['next', 'después']], [question('What goes in the lunch box first?', ['Cake and bread', 'Rice and an egg', 'Pizza and juice'], 'Rice and an egg'), question('What fruit does Tom wash?', ['An apple', 'A banana', 'An orange'], 'An apple'), question('Who eats with Tom?', ['His sister', 'His dad', 'His friend'], 'His friend')]),
      reading('At the Small Café', 'Eva and her mom visit a small café. Eva chooses bread and milk. Her mom chooses an egg and juice. They sit at a table near the window. Eva sees a cake on the counter. She draws it in her notebook. Then they pay and say, “Thank you!”', ['Bread', 'Milk', 'Cake'], [['chooses', 'elige'], ['window', 'ventana']], [question('What does Eva drink?', ['Juice', 'Water', 'Milk'], 'Milk'), question('Where do they sit?', ['Near the door', 'Near the window', 'Outside'], 'Near the window'), question('What does Eva draw?', ['A cake', 'An egg', 'A table'], 'A cake')]),
    ], sequence: ['Tom packs rice and an egg.', 'Tom washes an apple.', 'Tom eats lunch at school.'],
    cloze: [['Tom puts rice and an ____ in his lunch box.', 'egg'], ['He washes an ____.', 'apple'], ['He takes ____ to drink.', 'water']],
  },
  'nature-around-us': {
    readings: [
      reading('A Walk by the River', 'Eva walks by the river with her aunt. The sun is bright. A tall tree gives them shade. Eva sees a yellow flower near a rock. She draws the flower in her notebook. Then a cloud covers the sun. Eva and her aunt walk home before it rains.', ['River', 'Tree', 'Flower'], [['shade', 'sombra'], ['before', 'antes de']], [question('Where does Eva walk?', ['By the river', 'By a store', 'In a classroom'], 'By the river'), question('What color is the flower?', ['Red', 'Blue', 'Yellow'], 'Yellow'), question('What covers the sun?', ['A mountain', 'A cloud', 'The moon'], 'A cloud')]),
      reading('After the Rain', 'It rains in the morning. Ben looks out of the window. He sees clouds above the mountain. In the afternoon, the rain stops. The sun comes out. A rainbow appears in the sky. Ben goes outside with his dad. They see drops of water on a flower and a tree.', ['Cloud', 'Mountain', 'Rainbow'], [['stops', 'se detiene'], ['drops', 'gotas']], [question('When does it rain?', ['At night', 'In the morning', 'In the evening'], 'In the morning'), question('What appears after the sun comes out?', ['A rainbow', 'The moon', 'A new mountain'], 'A rainbow'), question('Who goes outside with Ben?', ['His teacher', 'His friend', 'His dad'], 'His dad')]),
    ], sequence: ['Eva walks by the river in the sun.', 'Eva draws a yellow flower.', 'Eva walks home when a cloud covers the sun.'],
    cloze: [['Eva walks by the ____.', 'river'], ['A tall ____ gives shade.', 'tree'], ['Eva draws a yellow ____.', 'flower']],
  },
  'colors-and-shapes': {
    readings: [
      reading('Kim’s Shape House', 'Kim makes a house with paper shapes. She uses a blue square for the house. She puts a red triangle on top for the roof. A yellow circle is the sun. Kim adds a green tree beside the house. She shows her picture to Ben. Ben says, “I like your house!”', ['Square', 'Triangle', 'Circle'], [['roof', 'techo'], ['beside', 'al lado de']], [question('What shape is the house?', ['A circle', 'A triangle', 'A square'], 'A square'), question('What color is the roof?', ['Red', 'Blue', 'Green'], 'Red'), question('What is beside the house?', ['A car', 'A tree', 'A star'], 'A tree')]),
      reading('The Color Hunt', 'Ana and Ben look for colors in the classroom. Ana finds a red book. Ben finds a blue pencil. They see a yellow star on a poster. Near the window, there is a green plant. Ana writes the four colors. Ben draws the four things. They compare their work.', ['Red', 'Blue', 'Star'], [['finds', 'encuentra'], ['compare', 'comparan']], [question('What color is the book?', ['Blue', 'Red', 'Yellow'], 'Red'), question('Where is the yellow star?', ['On a desk', 'On a book', 'On a poster'], 'On a poster'), question('What does Ben do?', ['Draws the things', 'Writes the colors', 'Waters the plant'], 'Draws the things')]),
    ], sequence: ['Kim uses a blue square for a house.', 'Kim adds a red triangle roof.', 'Kim shows her picture to Ben.'],
    cloze: [['The house is a blue ____.', 'square'], ['The roof is a red ____.', 'triangle'], ['The sun is a yellow ____.', 'circle']],
  },
  'numbers-everywhere': {
    readings: [
      reading('Five Little Balls', 'Max has three red balls. May has two blue balls. They put the balls in a basket. Now there are five balls in the basket. Max takes one red ball out. Four balls stay in the basket. Max and May count them slowly. They point to each ball as they count.', ['Three', 'Two', 'Five'], [['basket', 'canasta'], ['count', 'cuentan']], [question('How many red balls does Max have at first?', ['Three', 'Two', 'Five'], 'Three'), question('How many balls do they put in the basket?', ['Four', 'Five', 'Six'], 'Five'), question('How many stay after Max takes one?', ['Two', 'Three', 'Four'], 'Four')]),
      reading('Setting the Table', 'There are four people at lunch. Ana puts four plates on the table. Ben puts four cups beside the plates. There are eight things on the table now. Mom brings the food. Dad brings water. Ana checks each place. Every person has one plate and one cup. Lunch is ready!', ['Four', 'Eight', 'One'], [['plates', 'platos'], ['cups', 'vasos']], [question('How many people are at lunch?', ['Three', 'Four', 'Eight'], 'Four'), question('How many plates and cups are on the table in all?', ['Four', 'Six', 'Eight'], 'Eight'), question('What does each person have?', ['One plate and one cup', 'Two cups', 'Two plates'], 'One plate and one cup')]),
    ], sequence: ['Max and May bring three red balls and two blue balls.', 'They put five balls in a basket.', 'Max takes one ball out.'],
    cloze: [['Max has ____ red balls.', 'three'], ['May has ____ blue balls.', 'two'], ['Together, they have ____ balls.', 'five']],
  },
  'my-amazing-body': {
    readings: [
      reading('My Senses', 'I walk in the garden with my sister. I use my eyes to see a red flower. I use my nose to smell it. A bird sings in a tree. I use my ears to hear the song. I wave my hand to my sister. We smile and walk home.', ['Eye', 'Nose', 'Ear'], [['smell', 'oler'], ['hear', 'oír']], [question('What color is the flower?', ['Yellow', 'Red', 'Blue'], 'Red'), question('What do I use to hear the bird?', ['My eyes', 'My hand', 'My ears'], 'My ears'), question('Who walks with me?', ['My sister', 'My teacher', 'My dad'], 'My sister')]),
      reading('Simon Says', 'Our teacher starts a game. “Simon says, touch your head!” We touch our heads. “Simon says, raise one arm!” We raise one arm. Then she says, “Touch your nose!” We keep still because she did not say “Simon says.” The teacher smiles. We listen carefully and play again.', ['Head', 'Arm', 'Nose'], [['raise', 'levanta'], ['keep still', 'quedarse quietos']], [question('What do the children touch first?', ['Their nose', 'Their foot', 'Their head'], 'Their head'), question('How many arms do they raise?', ['One', 'Two', 'Three'], 'One'), question('Why do they keep still at the end?', ['They are asleep', 'They did not hear “Simon says”', 'They cannot hear'], 'They did not hear “Simon says”')]),
    ], sequence: ['I see and smell a red flower.', 'I hear a bird sing.', 'I wave to my sister and we walk home.'],
    cloze: [['I see with my ____.', 'eyes'], ['I smell with my ____.', 'nose'], ['I hear with my ____.', 'ears']],
  },
  'places-i-know': {
    readings: [
      reading('Lily’s Saturday', 'Lily leaves her house with her brother. First, they go to the library. Lily reads a book about animals. Next, they visit the store and buy an apple. Last, they go to the park. They eat the apple and play. In the evening, they walk back to their house.', ['Library', 'Store', 'Park'], [['first', 'primero'], ['last', 'al final']], [question('Where do they go first?', ['To the park', 'To the library', 'To the store'], 'To the library'), question('What do they buy?', ['A book', 'A ball', 'An apple'], 'An apple'), question('Where do they play?', ['In the park', 'In the library', 'In the store'], 'In the park')]),
      reading('Our Street', 'There is a school on our street. A library is next to the school. Across the street, there is a store. My house is near the park. I walk to school with my dad. After school, we sometimes stop at the library. I choose a book and take it home.', ['School', 'House', 'Library'], [['next to', 'junto a'], ['across', 'al otro lado']], [question('What is next to the school?', ['A library', 'A beach', 'A hospital'], 'A library'), question('Who walks to school with me?', ['My mom', 'My dad', 'My sister'], 'My dad'), question('What do I take home?', ['A tree', 'A desk', 'A book'], 'A book')]),
    ], sequence: ['Lily reads at the library.', 'Lily buys an apple at the store.', 'Lily plays at the park.'],
    cloze: [['Lily reads at the ____.', 'library'], ['She buys an apple at the ____.', 'store'], ['She plays at the ____.', 'park']],
  },
  'special-celebrations': {
    readings: [
      reading('Amy’s Birthday', 'Today is Amy’s birthday. She puts three balloons near the table. Her friend Ben brings a gift. Amy opens it. It is a book about animals! Her friends sing a song. Then they eat cake and play a game. Amy says, “Thank you!” Everyone helps clean the table before going home.', ['Birthday', 'Balloon', 'Gift'], [['opens', 'abre'], ['clean', 'limpiar']], [question('How many balloons does Amy put up?', ['Two', 'Four', 'Three'], 'Three'), question('What is in the gift?', ['A book', 'A ball', 'A pencil'], 'A book'), question('What do they do before going home?', ['Go swimming', 'Clean the table', 'Buy a cake'], 'Clean the table')]),
      reading('A Class Celebration', 'Our class has a reading celebration. Everyone brings a favorite book. Ana makes a paper star. Ben draws colorful balloons on a poster. We take turns reading one page. Then we clap for each reader. There are no gifts today. Our special treat is sharing stories with our friends.', ['Party', 'Balloon', 'Book'], [['take turns', 'tomar turnos'], ['clap', 'aplaudir']], [question('What does everyone bring?', ['A gift', 'A book', 'A cake'], 'A book'), question('What does Ana make?', ['A paper star', 'A poster', 'A balloon'], 'A paper star'), question('Are there gifts at this celebration?', ['Yes, one', 'Yes, three', 'No'], 'No')]),
    ], sequence: ['Amy puts balloons near the table.', 'Amy opens Ben’s gift.', 'Everyone cleans the table before going home.'],
    cloze: [['Today is Amy’s ____.', 'birthday'], ['Ben brings a ____.', 'gift'], ['The children eat ____.', 'cake']],
  },
};

export function lineWords(book, second = false) {
  return book.vocab.slice(second ? 4 : 0, second ? 8 : 4);
}
export function lineChoices(words) {
  return words.length === 3 ? [words[1], words[2], words[0]] : [words[2], words[0], words[3], words[1]];
}
