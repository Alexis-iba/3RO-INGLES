import Image from 'next/image';
import { WORKBOOK_TOPICS, WORKBOOK_PAGES, exerciseWords, matchChoices, wordOptions, missingLetters } from '@/lib/workbooks';

const ART = { Lion: 'lion', Elephant: 'elephant', School: 'school', Family: 'family', Pizza: 'pizza', Apple: 'apple', Tree: 'tree', Sun: 'sun' };
const NUMBER_WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

function Picture({ item }) {
  const number = NUMBER_WORDS.indexOf(item.word) + 1;
  if (number) return <span className="counting-picture" role="img" aria-label={`${number} ${number === 1 ? "dot" : "dots"}`}>{Array.from({length:number}, (_, i) => <i key={i} />)}</span>;
  if (ART[item.word]) return <Image className="activity-picture" src={`/illustrations/${ART[item.word]}.svg`} width={90} height={90} alt={item.word} />;
  if (['Circle', 'Square', 'Triangle', 'Star'].includes(item.word)) return <svg className="activity-picture" viewBox="0 0 100 100" role="img" aria-label={item.word}>{item.word === 'Circle' ? <circle cx="50" cy="50" r="34" fill="#a684ef"/> : item.word === 'Square' ? <rect x="18" y="18" width="64" height="64" rx="3" fill="#548bdb"/> : item.word === 'Triangle' ? <path d="M50 10 92 86H8Z" fill="#ef856f"/> : <path d="m50 5 13 29 32 4-24 23 6 33-27-16-27 16 6-33L5 38l32-4Z" fill="#efc43c"/>}</svg>;
  return <span className="activity-emoji" role="img" aria-label={item.word}>{item.word === 'Head' ? '🙂' : item.emoji}</span>;
}

function Answer({ id, answers, onAnswer, miniature, label, wide = false }) {
  if (miniature) return <span className="mini-answer">_______</span>;
  return <input className={`worksheet-answer${wide ? ' wide-answer' : ''}`} value={answers[id] || ''} onChange={e => onAnswer(id, e.target.value)} aria-label={label} autoComplete="off" spellCheck={false} />;
}

export default function WorkbookLeaf({ book, index, miniature, answers, onAnswer }) {
  const topic = WORKBOOK_TOPICS[book.id];
  const [title, instruction, spanish] = WORKBOOK_PAGES[index];
  const words = exerciseWords(book, index);
  const field = (key, label, wide = false) => <Answer id={`${index}-${key}`} answers={answers} onAnswer={onAnswer} miniature={miniature} label={label} wide={wide} />;
  return <section className={`book-leaf workbook-leaf ${index % 2 ? 'words-leaf' : 'illustrated-leaf'}`}>
    <div className="workbook-kicker">{book.title} · {String(index + 1).padStart(2, '0')}</div>
    <h2>{title}</h2>
    <p className="workbook-instruction">{instruction}<small>{spanish}</small></p>
    {index === 0 && <div className="dictionary-grid">{book.vocab.map(w => <div key={w.word}><Picture item={w}/><strong>{w.word}</strong></div>)}</div>}
    {index === 1 && <><div className="letter-bank">{matchChoices(book).map((w,i) => <span key={w.word}><b>{String.fromCharCode(65+i)}.</b> {w.word}</span>)}</div><div className="worksheet-rows">{words.map((w,i) => <div key={w.word}><b>{i+1}.</b><Picture item={w}/>{field(i, `Página 2, imagen ${i+1}: letra`)}</div>)}</div></>}
    {index === 2 && <div className="worksheet-rows choice-rows">{words.map((w,i) => <div key={w.word}><Picture item={w}/><div className="word-options">{wordOptions(book,w,i).map(option => miniature ? <span key={option.word}>○ {option.word}</span> : <label key={option.word}><input type="radio" name={`${book.id}-choice-${i}`} checked={answers[`2-${i}`] === option.word} onChange={() => onAnswer(`2-${i}`,option.word)}/>{option.word}</label>)}</div></div>)}</div>}
    {index === 3 && <div className="worksheet-rows spelling-rows">{words.map((w,i) => <div key={w.word}><Picture item={w}/><div><p>{missingLetters(w.word)}</p>{field(i, `Página 4: completa la palabra ${i+1}`, true)}</div></div>)}</div>}
    {index === 4 && <><div className="sorting-pictures">{topic.sort.map((group,i) => <Picture key={i} item={book.vocab.find(w=>w.word===group[0])}/>)}</div><div className="letter-bank">{topic.sort.flat().slice().sort().map(w=><span key={w}>{w}</span>)}</div><div className="sorting-columns">{topic.groups.map((group,i)=><div key={group}><h4>{group}</h4>{topic.sort[i].map((_,j)=><div key={j}>{field(`${i}-${j}`, `${group}: palabra ${j+1}`,true)}</div>)}</div>)}</div></>}
    {index === 5 && <><div className="story-scene" aria-label="Ilustraciones de la historia">{topic.scene.map((emoji,i)=><span key={i}>{emoji}</span>)}</div><p className="workbook-story">{topic.story}</p><div className="story-task"><b>Word detective</b><p>Find and copy two words from the picture dictionary.</p>{field('detective1','Primera palabra de la historia',true)}{field('detective2','Segunda palabra de la historia',true)}</div></>}
    {index === 6 && <><div className="story-scene small-scene">{topic.scene.slice(0,3).map((emoji,i)=><span key={i}>{emoji}</span>)}</div><div className="true-false-rows">{topic.statements.map(([statement],i)=><div key={statement}><p>{i+1}. {statement}</p><div>{['T','F'].map(value=>miniature ? <span key={value}>○ {value} </span> : <label key={value}><input type="radio" name={`${book.id}-tf-${i}`} checked={answers[`6-${i}`]===value} onChange={()=>onAnswer(`6-${i}`,value)}/>{value}</label>)}</div></div>)}</div><p className="worksheet-tip">Fix the false sentence:</p>{field('fix','Corrige la oración falsa',true)}</>}
    {index === 7 && <><p className="creative-prompt">{topic.draw}</p><div className="drawing-space"><span>✎</span><small>My picture / Mi dibujo</small></div><p className="worksheet-tip">Write three labels for your drawing.</p>{[0,1,2].map(i=><div key={i}>{field(i,`Etiqueta ${i+1} de tu dibujo`,true)}</div>)}</>}
    {index === 8 && <><div className="speaking-scene"><span>👧</span><div>Let’s talk!<br/>Your turn!</div><span>👦</span></div><p className="creative-prompt">{topic.challenge}</p><div className="sentence-frame">{topic.frame}</div><p className="worksheet-tip">My answer / Mi respuesta</p>{[0,1,2].map(i=><div key={i}>{field(i,`Mi respuesta: línea ${i+1}`,true)}</div>)}<p className="worksheet-tip">Ask, listen and take turns.</p></>}
    {index === 9 && <><p className="worksheet-tip">1. Name these pictures.</p><div className="review-pictures">{words.slice(0,2).map((w,i)=><div key={w.word}><Picture item={w}/>{field(i,`Repaso: imagen ${i+1}`,true)}</div>)}</div><p className="worksheet-tip">2. Write a sentence with “{words[2].word}”.</p>{field('sentence','Escribe una oración de repaso',true)}<p className="worksheet-tip">3. Say four words without looking at page 1.</p><div className="self-check"><b>I can… / Puedo…</b>{['Name the pictures','Read the story','Write new words'].map((label,i)=><label key={label}>{!miniature && <input type="checkbox" checked={answers[`9-check${i}`]==='yes'} onChange={e=>onAnswer(`9-check${i}`,e.target.checked?'yes':'')}/>} {label}</label>)}</div><p className="workbook-finish">Well done! ★</p></>}
    <span className="printed-page">{index+1}</span>
  </section>;
}

export function WorkbookAnswers({book}) {
 const topic=WORKBOOK_TOPICS[book.id];
 return <details className="workbook-solutions"><summary>Respuestas para revisar al terminar</summary><p><b>Página 2:</b> {exerciseWords(book,1).map((w,i)=>`${i+1}: ${String.fromCharCode(65+matchChoices(book).findIndex(c=>c.word===w.word))}`).join(' · ')}</p><p><b>Página 3:</b> {exerciseWords(book,2).map(w=>w.word).join(' · ')}</p><p><b>Página 4:</b> {exerciseWords(book,3).map(w=>w.word).join(' · ')}</p><p><b>Página 5:</b> {topic.groups.map((g,i)=>`${g}: ${topic.sort[i].join(', ')}`).join(' / ')}</p><p><b>Página 7:</b> {topic.statements.map((s,i)=>`${i+1}: ${s[1]?'T':'F'}`).join(' · ')}</p><p><b>Página 10, imágenes:</b> {exerciseWords(book,9).slice(0,2).map(w=>w.word).join(' · ')}</p><p>Las respuestas de dibujo, conversación y escritura son personales. Revisa que correspondan a las instrucciones y al tema del libro.</p></details>;
}
