import WorkbookLeaf from './WorkbookLeaf';
import { WORKBOOK_PAGES } from '@/lib/workbooks';

export default function WorkbookSpread({ book, page, miniature = false, print = false, answers = {}, onAnswer = () => {} }) {
  return <div className={`open-book${miniature ? ' miniature-book' : ''}${print ? ' print-book' : ''}`}>
    {[page * 2, page * 2 + 1].filter(index => index < WORKBOOK_PAGES.length).map(index =>
      <WorkbookLeaf key={index} book={book} index={index} miniature={miniature} print={print} answers={answers} onAnswer={onAnswer} />
    )}
  </div>;
}
