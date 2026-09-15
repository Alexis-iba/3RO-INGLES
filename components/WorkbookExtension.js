"use client";

import { useState } from 'react';
import Image from 'next/image';
import ActivityImage from './activities/ActivityImage';
import { WORKBOOK_READING, lineWords, lineChoices } from '@/lib/workbook-reading';
import { galleryImages } from '@/lib/workbook-gallery';

export function ReadingChoices({ book, readingIndex, page, answers, onAnswer, print, miniature }) {
  const [reviewed, setReviewed] = useState(false);
  const { questions, title } = WORKBOOK_READING[book.id].readings[readingIndex];
  const score = questions.filter((q, i) => answers[`${page}-q${i}`] === q.answer).length;
  return <div className="reading-questions">
    <p className="reading-reference">{title} · Read page {readingIndex ? 15 : 11} again.<small>Vuelve a la lectura si necesitas ayuda.</small></p>
    {questions.map((q, i) => <fieldset className="reading-question" key={q.text}>
      <legend>{i + 1}. {q.text}</legend>
      {q.options.map(option => print || miniature ? <span className="printed-choice" key={option}>{answers[`${page}-q${i}`] === option ? '●' : '○'} {option}</span> : <label key={option}><input type="radio" name={`${book.id}-${page}-q${i}`} value={option} checked={answers[`${page}-q${i}`] === option} onChange={() => { onAnswer(`${page}-q${i}`, option); setReviewed(false); }} />{option}</label>)}
    </fieldset>)}
    {!print && !miniature && <><button className="worksheet-review" onClick={() => setReviewed(true)} type="button">Revisar respuestas</button>{reviewed && <p className="exercise-feedback" role="status">{score === questions.length ? '¡Muy bien! Todas son correctas.' : `${score} de ${questions.length} correctas. Vuelve a leer e inténtalo otra vez.`}</p>}</>}
  </div>;
}

export function JoinLines({ book, page, second, answers, onAnswer, print, miniature }) {
  const [selected, setSelected] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const words = lineWords(book, second);
  const choices = lineChoices(words);
  function connect(right) {
    if (selected === null) return;
    words.forEach((_, i) => { if (i !== selected && answers[`${page}-line${i}`] === String(right)) onAnswer(`${page}-line${i}`, ''); });
    onAnswer(`${page}-line${selected}`, String(right));
    setSelected(null);
    setReviewed(false);
  }
  const score = words.filter((word, i) => choices[Number(answers[`${page}-line${i}`])]?.word === word.word && answers[`${page}-line${i}`] !== undefined && answers[`${page}-line${i}`] !== '').length;
  return <div className="join-exercise">
    <p className="join-hint">{print || miniature ? 'Draw one line from each picture to its word.' : 'Toca una imagen y después su palabra para unirlas.'}</p>
    <div className="join-board" style={{ '--join-rows': words.length }}>
      <svg className="join-lines" viewBox={`0 0 100 ${words.length * 25}`} preserveAspectRatio="none" aria-hidden="true">
        {words.map((_, i) => { const value = answers[`${page}-line${i}`]; if (value === undefined || value === '') return null; return <line key={i} x1="33" y1={i * 25 + 12.5} x2="67" y2={Number(value) * 25 + 12.5} stroke={['#db397d', '#257aca', '#328c51', '#aa6a05'][i]} strokeWidth=".8" />; })}
      </svg>
      <div className="join-column">{words.map((word, i) => {
        const content = <><ActivityImage word={word.word} sizes="200px" loading="eager" /><span className="join-dot" aria-hidden="true">●</span></>;
        return print || miniature ? <div className="join-picture" key={word.word}>{content}</div> : <button type="button" className={`join-picture${selected === i ? ' selected-picture' : ''}`} key={word.word} onClick={() => { setSelected(i); setReviewed(false); }} aria-pressed={selected === i} aria-label={`Seleccionar imagen ${i + 1} para unir`}>{content}</button>;
      })}</div>
      <div className="join-column">{choices.map((word, i) => print || miniature ? <div className="join-word" key={word.word}><span className="join-dot">●</span>{word.word}</div> : <button type="button" className="join-word" key={word.word} onClick={() => connect(i)} disabled={selected === null} aria-label={`Unir con ${word.word}`}><span className="join-dot" aria-hidden="true">●</span>{word.word}</button>)}</div>
    </div>
    {!print && !miniature && <><div className="join-actions"><button className="worksheet-review" type="button" onClick={() => setReviewed(true)}>Revisar uniones</button><button className="worksheet-review" type="button" onClick={() => { words.forEach((_, i) => onAnswer(`${page}-line${i}`, '')); setSelected(null); setReviewed(false); }}>Borrar líneas</button></div>{reviewed && <p className="exercise-feedback" role="status">{score} de {words.length} uniones correctas.{score < words.length ? ' Revisa el diccionario y vuelve a intentar.' : ' ¡Muy bien!'}</p>}</>}
  </div>;
}

export default function WorkbookExtension({ book, index, answers, onAnswer, print, miniature, field }) {
  const extra = WORKBOOK_READING[book.id];
  if (index === 10 || index === 14) {
    const reading = extra.readings[index === 10 ? 0 : 1];
    return <div className="guided-reading"><h3>{reading.title}</h3><div className="reading-pictures">{reading.pictures.map(word => <ActivityImage key={word} word={word} loading="eager" sizes="200px" />)}</div><p className="reading-text">{reading.text}</p><div className="reading-glossary"><b>Word help / Ayuda</b>{reading.glossary.map(([en, es]) => <span key={en}>{en} = {es}</span>)}</div><p className="worksheet-tip">Read again. Tell someone what happened.<br/>Lee otra vez y cuenta lo que pasó.</p></div>;
  }
  if (index === 11 || index === 15) return <ReadingChoices key={index} book={book} readingIndex={index === 11 ? 0 : 1} page={index} answers={answers} onAnswer={onAnswer} print={print} miniature={miniature} />;
  if (index === 12 || index === 13) return <JoinLines key={index} book={book} page={index} second={index === 13} answers={answers} onAnswer={onAnswer} print={print} miniature={miniature} />;
  if (index === 16) return <><p className="reading-reference">{extra.readings[0].title} · Page 11</p><div className="letter-bank">1. First / Primero · 2. Next / Después · 3. Last / Al final</div><div className="sequence-tasks">{[2, 0, 1].map((position, i) => <div key={position}>{field(`order${i}`, `Orden de la oración ${i + 1}`)}<p>{extra.sequence[position]}</p></div>)}</div><p className="worksheet-tip">Tell the story using first, next and last.<br/>Cuenta la historia usando primero, después y al final.</p></>;
  if (index === 17) return <><p className="reading-reference">{extra.readings[0].title} · Page 11</p><div className="letter-bank">{[...extra.cloze.map(([, answer]) => answer)].sort().map(word => <span key={word}>{word}</span>)}</div><div className="cloze-tasks">{extra.cloze.map(([sentence], i) => <div key={sentence}><p>{i + 1}. {sentence}</p>{field(`cloze${i}`, `Completar oración ${i + 1}`, true)}</div>)}</div></>;
  if (index === 18 || index === 19) {
    const pictures = galleryImages(book, index === 19);
    return <div className={`picture-exploration gallery-count-${pictures.length}`}>
      {pictures.map((src, i) => <div className="exploration-card" key={src}><Image src={src} width={900} height={600} sizes="500px" loading="eager" className="exploration-image" alt={`Ilustración ${i + 1} para observar y describir`} /><label><span>I can see… / Puedo ver…</span>{field(`picture${i}`, `Imagen ${i + 1}: escribe una palabra en inglés`, true)}</label></div>)}
      {pictures.length < 3 && <p className="worksheet-tip">Choose a word from page 1. Say a sentence.<br/>Elige una palabra de la página 1 y di una oración.</p>}
      {pictures.length === 1 && <><div className="sentence-frame">I can see a ____. / Puedo ver un(a) ____.</div>{field('sentence', 'Escribe tu oración sobre la imagen', true)}<p className="worksheet-tip">Draw one thing from the picture. Label it in English.</p><div className="drawing-space"><small>Dibuja algo de la imagen y escribe su nombre en inglés.</small></div></>}
    </div>;
  }
  return null;
}

export function ExtendedAnswers({ book }) {
  const extra = WORKBOOK_READING[book.id];
  return <><p><b>Páginas 12 y 16:</b> {extra.readings.map((reading, i) => `Lectura ${i + 2}: ${reading.questions.map((q, j) => `${j + 1}. ${q.answer}`).join(' / ')}`).join(' · ')}</p><p><b>Páginas 13 y 14:</b> une cada imagen con la palabra correspondiente; todas las parejas están en el diccionario de la página 1.</p><p><b>Página 17:</b> de arriba hacia abajo: 3, 1, 2.</p><p><b>Página 18:</b> {extra.cloze.map(([, word], i) => `${i + 1}. ${word}`).join(' · ')}</p><p><b>Páginas 19 y 20:</b> respuestas personales. Acepta palabras y oraciones sencillas que describan algo visible en la ilustración. Ayuda con vocabulario nuevo.</p></>;
}
