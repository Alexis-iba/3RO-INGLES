export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickOptions(pool, correct, count) {
  const others = pool.filter((v) => v.word !== correct.word);
  const wrong = shuffle(others).slice(0, count - 1);
  return shuffle([correct, ...wrong]);
}
