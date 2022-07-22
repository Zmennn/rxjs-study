import { fromEvent, switchMap,map, pairwise, takeUntil } from "rxjs";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const body=document.getElementById('body') as HTMLElement

const cx = canvas.getContext('2d') as CanvasRenderingContext2D ;

cx.lineWidth = 2;

interface Position{
    x: number,
    y:number
}

function drawLine([prev, next]: Position[]) {
    
    cx.beginPath

    cx.moveTo(prev.x, prev.y)
    cx.lineTo(next.x, next.y)
    cx.stroke()
}

const mousemove$ = fromEvent<MouseEvent>(canvas, 'mousemove');
const mousedown$ = fromEvent<MouseEvent>(body, 'mousedown');
const mouseup$ = fromEvent<MouseEvent>(body, 'mouseup');
const mouseout$ = fromEvent<MouseEvent>(canvas, 'mouseout');


const{top,left}=canvas.getBoundingClientRect()

const points$ = mousemove$.pipe(map<MouseEvent, Position>((event:MouseEvent) => {
    return{x:event.clientX-left,y:event.clientY-top}
}),pairwise()
)

mousedown$.subscribe((ev)=>{console.log(ev)})

mousedown$
    .pipe(switchMap(() => points$
        .pipe(
            takeUntil(mouseup$),
            // takeUntil(mouseout$)
    )))
    .subscribe(drawLine)




   