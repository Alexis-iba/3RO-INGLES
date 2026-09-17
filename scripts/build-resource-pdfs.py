from pathlib import Path
import json, io, subprocess
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
def jsdata(name):
    text=(ROOT/name).read_text(encoding='utf-8')
    return json.loads(text[text.index('=')+1:].strip().rstrip(';'))
art=jsdata('lib/activity-art.js')
colors=jsdata('lib/color-resources.js')
books=json.loads(subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm');const s=fs.readFileSync('lib/data.js','utf8').replace(/^import .*;$/gm,'').replace(/export /g,'');process.stdout.write(JSON.stringify(vm.runInNewContext('const WORKBOOK_PAGES=[];'+s+';BOOKS').map(b=>({title:b.title,vocab:b.vocab}))));"],cwd=ROOT).decode('utf-8'))
animals={'Tiger':'Tigre','Bear':'Oso','Zebra':'Cebra','Giraffe':'Jirafa','Horse':'Caballo','Sheep':'Oveja','Duck':'Pato','Frog':'Rana'}
groups=[]
used=set()
for book in books:
    entries=[]
    for v in book['vocab']:
        word=v['word']
        if word in art and word not in used:
            entries.append(dict(word=word,label=art[word]['alt'],image='/activity-images/'+art[word]['file']))
            used.add(word)
    if entries: groups.append((book['title'],entries))
groups.append(('More animals',[dict(word=w,label=l,image=f'/resources-images/animals-song-2/{w.lower()}.png') for w,l in animals.items()]))
groups.append(('All colors',colors))
remaining=[dict(word=w,label=a['alt'],image='/activity-images/'+a['file']) for w,a in art.items() if w not in used]
if remaining: groups.append(('More vocabulary',remaining))
ones=['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
tens=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']
def number(n):
    if n<20:return ones[n]
    if n==100:return 'One hundred'
    return tens[n//10]+('-'+ones[n%10].lower() if n%10 else '')
groups.append(('Numbers 1 to 100',[dict(word=number(n),label=str(n),number=n) for n in range(1,101)]))
cache={}
def picture(c,item,x,y,w,h):
    if 'number' in item:
        c.setFillColor(HexColor('#1675b9'));c.setFont('Helvetica-Bold',min(h*.65,64));c.drawCentredString(x+w/2,y+h*.28,str(item['number']));return
    src=ROOT/('public'+item['image'])
    if str(src) not in cache:
        with Image.open(src) as im:
            im=im.convert('RGB');im.thumbnail((1100,1100));b=io.BytesIO();im.save(b,format='JPEG',quality=88);b.seek(0);cache[str(src)]=ImageReader(b)
    c.drawImage(cache[str(src)],x,y,w,h,preserveAspectRatio=True,anchor='c')

W,H=900,600
NAVY='#12355b'
PALETTE=['#147ac0','#ab438a','#22866a']
def text(c,t,x,y,size=12,width=310,color=NAVY):
    c.setFillColor(HexColor(color))
    while c.stringWidth(t,'Helvetica-Bold',size)>width: size-=.5
    c.setFont('Helvetica-Bold',size);c.drawCentredString(x,y,t)
def box(c,x,y,w,h,fill='#ffffff',stroke='#c7dfec',dash=False):
    c.setFillColor(HexColor(fill));c.setStrokeColor(HexColor(stroke));c.setDash(3,3) if dash else c.setDash()
    c.roundRect(x,y,w,h,10,fill=1,stroke=1);c.setDash()
def base(c,kind,topic,left,right,page):
    c.drawImage(str(ROOT/'public/resources-images/printable-book-frame.png'),0,0,W,H)
    accent=PALETTE[['flashcards','posters','worksheets'].index(kind)]
    for x,title in [(78,left),(477,right)]:
        box(c,x,125,345,292)
        box(c,x,423,345,30,accent,accent)
        text(c,title,x+172.5,433,15,325,'#ffffff')
    text(c,topic,250,397,12)
    text(c,{'flashcards':'Recorta y juega','posters':'Mira, aprende y recuerda','worksheets':'Nombre: ____________________'}[kind],650,397,12)
    box(c,335,38,230,21)
    text(c,f'EnglishKids  |  {kind.title()}  |  {page}',450,45,9,220)
def finish(c): c.showPage()
def card(c,item,x,y,w=152,h=118,label=True,dash=False):
    box(c,x,y,w,h,'#f8fcff',dash=dash)
    picture(c,item,x+8,y+29,w-16,h-37)
    if label:text(c,item['word'],x+w/2,y+11,12,w-10)
def grid(c,items,labels=True,dash=False):
    for j,item in enumerate(items):
        side=j//4;k=j%4;x=(89 if side==0 else 488)+(k%2)*161;y=253-(k//2)*122
        card(c,item,x,y,label=labels,dash=dash)
out=ROOT/'public/resources-pdfs';out.mkdir(exist_ok=True)
manifest={}
for kind,title in [('flashcards','Tarjetas para jugar'),('posters','Mi atlas ilustrado'),('worksheets','Misiones de inglÃ©s')]:
    c=canvas.Canvas(str(out/f'{kind}.pdf'),pagesize=(W,H),pageCompression=1);c.setTitle(title);c.setAuthor('EnglishKids');page=0
    if kind=='flashcards':
        for topic,items in groups:
            if topic=='Numbers 1 to 100':items=[i for i in items if i['number']<=20 or i['number']%10==0]
            for start in range(0,len(items),8):
                page+=1;base(c,kind,topic,'Tarjetas de vocabulario','Recorta por la lÃ­nea punteada',page)
                grid(c,items[start:start+8],dash=True);finish(c)
    elif kind=='posters':
        for topic,items in groups:
            if topic=='All colors':
                for start in range(0,len(items),2):
                    page+=1;base(c,kind,'Colors / Colores','El mundo de los colores','Dos colores para descubrir',page)
                    for j,item in enumerate(items[start:start+2]):
                        x=89+j*399;picture(c,item,x,168,323,216);text(c,item['word']+' / '+item['label'],x+161,144,18)
                    finish(c)
            elif topic=='Numbers 1 to 100':
                for start in range(0,100,20):
                    page+=1;base(c,kind,'Numbers / NÃºmeros',f'Aprende del {start+1} al {start+20}','Cuenta y lee en voz alta',page)
                    for j,item in enumerate(items[start:start+20]):
                        x=89+(j//10)*399+(j%2)*162;y=330-((j%10)//2)*48
                        box(c,x,y,151,43,'#edf8fc');text(c,str(item['number']),x+22,y+14,20,35)
                        text(c,item['word'],x+96,y+17,10,103)
                    finish(c)
            else:
                for start in range(0,len(items),6):
                    page+=1;base(c,kind,topic,'Explora y aprende','Mi pequeÃ±o diccionario',page)
                    for j,item in enumerate(items[start:start+6]):
                        x=89+(j//3)*399;y=296-(j%3)*81
                        picture(c,item,x,y,92,74);text(c,item['word'],x+214,y+43,18,216)
                        text(c,item['label'].split(':')[0],x+214,y+21,10,216)
                    finish(c)
    else:
        for gi,(topic,items) in enumerate(groups):
            if topic=='Numbers 1 to 100':continue
            for start in range(0,len(items),4):
                batch=items[start:start+4];mode=(gi+start//4)%3;page+=1
                prompt=['Une cada imagen con su palabra.','Completa las letras que faltan.','Escribe el nombre en inglÃ©s.'][mode]
                base(c,kind,topic,'MisiÃ³n '+str(page),prompt,page)
                for j,item in enumerate(batch):
                    y=319-j*61;picture(c,item,96,y,75,56)
                    text(c,str(j+1),190,y+23,14,25)
                    if mode==0:
                        text(c,batch[(j+1)%len(batch)]['word'],650,y+23,17,260)
                        c.setStrokeColor(HexColor('#147ac0'));c.circle(222,y+26,3);c.circle(499,y+26,3)
                    elif mode==1:
                        word=' '.join('_' if ch.lower() in 'aeiou' else ch for ch in item['word'])
                        text(c,word,650,y+25,17,295)
                        c.setStrokeColor(HexColor('#a5bac9'));c.line(505,y+9,794,y+9)
                    else:
                        c.setStrokeColor(HexColor('#a5bac9'));c.line(502,y+18,797,y+18)
                        text(c,item['label'].split(':')[0],310,y+23,10,180)
                finish(c)
        for offset in range(0,100,20):
            page+=1;base(c,kind,'Numbers / NÃºmeros','Completa las secuencias','Escribe el resultado en inglÃ©s',page)
            for j in range(4):
                n=offset+j*4+1;y=342-j*55
                text(c,f'{n},  ___,  {n+2},  ___',250,y,20)
                text(c,f'{n} + 1 = __________________',650,y,15)
            finish(c)
        page+=1;base(c,kind,'Count / Cuenta','Cuenta los animales','Escribe la cantidad en inglÃ©s',page)
        animal=dict(word='Duck',image='/resources-images/animals-song-2/duck.png')
        for j in range(4):
            y=324-j*61
            for n in range(j+2):picture(c,animal,91+n*56,y,50,50)
            c.setStrokeColor(HexColor('#9bb3c9'));c.line(500,y+20,795,y+20)
        finish(c)
    c.save();manifest[kind]={'pages':page,'url':f'/resources-pdfs/{kind}.pdf','description':{'flashcards':'Tarjetas recortables para practicar y jugar.','posters':'Atlas visual por temas, colores y nÃºmeros del 1 al 100.','worksheets':'Une, completa, escribe, cuenta y resuelve secuencias.'}[kind]}
    print(kind,page,'pages')
(ROOT/'lib/printable-resources.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
