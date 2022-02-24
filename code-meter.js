console.group("<--- Volant.digital Code meter");
total = (document.querySelector('html').outerHTML.length);
styles = 0;
document.querySelectorAll('style').forEach(el => {
	styles = el.outerHTML.length + styles;
});
scripts = 0
document.querySelectorAll('script').forEach(el => {
	scripts = el.outerHTML.length + scripts;
});
svgs = 0
document.querySelectorAll('svg').forEach(el => {
	svgs = el.outerHTML.length + svgs;
});

console.log('HTML: ' + total + ' Bytes' + ' | ' + 'CSS: ' + styles + ' Bytes' + ' | ' + 'Scripts: ' + scripts + ' Bytes' + ' | ' + 'SVGs: ' + svgs + ' Bytes');
console.log('Styles/HTML: ' + ((styles / total) * 100).toFixed(2) + ' % | ' + 'Scripts/HTML: ' + ((scripts / total) * 100).toFixed(2) + ' %' + ' % | ' + 'SVGs/HTML: ' + ((svgs / total) * 100).toFixed(2) + ' %');
console.groupEnd();
