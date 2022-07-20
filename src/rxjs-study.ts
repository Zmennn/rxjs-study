import { Observable } from "rxjs";

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





const search$ = new Observable(observer => {
    console.log('start obs');
    const input = document.getElementById('search');
    input?.addEventListener('input', event => {
        observer.next(event)
    })
    console.log('finish obs');

});


search$.subscribe(value => {  console.log(value) })



search$.subscribe(value => {  console.log(value) })
