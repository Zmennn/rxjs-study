import { debounceTime, fromEvent, map, Observable } from "rxjs";

// const search$ = new Observable(observer => {
//     console.log('start obs');
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     console.log('finish obs');

// });

// console.log('start subs');
// search$.subscribe(value=>console.log(value))
// console.log('finish subs');

// console.log('start subs2');
// search$.subscribe(value=>console.log(value+'--2'))
// console.log('finish subs2');





const search$ = new Observable<Event>(observer => {
   
    const input = document.getElementById('search');
    const stop=document.getElementById('stop');

    if (!input||!stop) {
        observer.error('err-all destroy');
        return
    }

    const onSearch=(event: Event | undefined): void => {
        observer.next(event);
        console.log("333");
        checkSubscription();
    }

    const onStop = () => {
        observer.complete();
        clear()  
    }

    const checkSubscription = () => {
        if (observer.closed) {
            clear() 
        }
    }

    

    input.addEventListener('input', onSearch);
     stop.addEventListener('click', onStop);

    const clear = () => {
        input.removeEventListener('input', onSearch);
        stop.removeEventListener('click', onStop);
    }

});


// const input = document.getElementById('search');
// const search$:Observable<Event> = fromEvent<Event>(

//     (input as HTMLInputElement),'input'
// )


const subscribe=search$
    .pipe(
        map((event)=>{return (event.target as HTMLInputElement).value}),
        debounceTime(500)
    )
    .subscribe({
    next: value => { console.log(value) },
    error: err => { console.log(err) },
    complete:()=>console.log("it's a trap")
    })

setTimeout(() => {
    console.log("unsubscribe");
    subscribe.unsubscribe()
}, 5000)



// search$.subscribe({
//     next: value => { console.log(value) },
//     error: err => { console.log(err) },


// })
