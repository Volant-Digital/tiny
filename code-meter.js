// window.addEventListener('load', function () {

total = (document.querySelector('html').outerHTML.length);

Styles = 0;
document.querySelectorAll('style').forEach(el => {
    Styles = el.outerHTML.length + Styles;
});
Scripts = 0
document.querySelectorAll('script').forEach(el => {
    Scripts = el.outerHTML.length + Scripts;
});
SVGs = 0
document.querySelectorAll('svg').forEach(el => {
    SVGs = el.outerHTML.length + SVGs;
});

HEAD = document.querySelector('head').outerHTML.length;

function calc(value) {
    return '/HTML: ' + Math.round(value / total * 100) + ' % | ';
}

console.group("<--- Volant.digital Code meter");
console.log('Total: ' + total + ' bytes');

console.log('<HEAD>: ' + HEAD + ' Bytes | CSS: ' + Styles + ' Bytes | ' + 'Scripts: ' + Scripts + ' Bytes | ' + 'SVGs: ' + SVGs + ' Bytes');

console.log ('HEAD' + calc(HEAD), 'CSS' + calc(Styles), 'Scripts' + calc(Scripts), 'SVGs' + calc(SVGs));
console.groupEnd();
// });

