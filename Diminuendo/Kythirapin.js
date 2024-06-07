document.addEventListener
(
	'DOMContentLoaded', async () =>
{
	const ONPage = localStorage.getItem('Page') || './Diminuendo/zoneindex.js';

	const jspage = await fetch(ONPage);
	if (jspage.ok)
	{
	const jscode = await jspage.text();
	const script = document.createElement('script');
	script.textContent = jscode;
	document.body.appendChild(script);
	document.dispatchEvent(new Event('Blast'));
	// document.addEventListener('Blast', () => {console.log('Custom script loaded event triggered');});
	}

if (ONPage === './Diminuendo/zoneindex.js')
{
	document.getElementById('iJava').classList.add('Galaxy');
}

if (ONPage === './Diminuendo/zonelogue.js') {
	document.getElementById('iJava').classList.add('Vendor');
	document.getElementById('Catalogue').style.display = 'block';
}

if (ONPage === './Diminuendo/logSales.js') {
	document.getElementById('iJava').classList.add('logSales');
	document.getElementById('Book').remove();
	document.getElementById('library').classList.add('logStats');
}
if (ONPage === './Diminuendo/logStock.js') {
	document.getElementById('iJava').classList.add('logStock');
	document.getElementById('Book').remove();
	document.getElementById('library').classList.add('logStats');
}



}
);





document.addEventListener
(
	'DOMContentLoaded', () =>
{
	document.getElementById('iJava').style.paddingTop = document.getElementById('Delta').offsetHeight + 'px';

document.getElementById('deltahome').addEventListener('click', () => { location.href = "./index.html"; });
document.getElementById('deltamenu').addEventListener('click', () => { document.getElementById('links').classList.toggle('show');});

document.getElementById('links').addEventListener
(
	'click', ({target}) =>
{
	let icon = target.id;
	if (icon === 'iconShops') {localStorage.setItem('Page', './Diminuendo/zoneindex.js');}
	if (icon === 'iconLouge') {localStorage.setItem('Page', './Diminuendo/zonelogue.js');}
	if (icon === 'iconSales') {localStorage.setItem('Page', './Diminuendo/logSales.js');}
	if (icon === 'iconStock') {localStorage.setItem('Page', './Diminuendo/logStock.js');}
	window.location.reload(true);
}
);

document.getElementById("searchbar").addEventListener
(
	'input', () =>
{
	const findInput = document.getElementById("searchbar").value.toLowerCase();
	const divFilter = document.getElementsByClassName('JSfind');

	for (let i = 0; i < divFilter.length; i++)
	{
		if (!divFilter[i].innerHTML.toLowerCase().includes(findInput))
		{divFilter[i].style.display = "none";}
		else
		{divFilter[i].style.display = "grid";}
	}
}
);

document.getElementById("cometsbtn").addEventListener
(
	'click', async function(e)
{



    const idata = await new Dexie(dBase).open();
    const Sales = await idata.table("sales").toArray();

    let totalSell = 0;
    Sales.forEach(item => totalSell += item.Sell);
    let totalCost = 0;
    Sales.forEach(item => totalCost += item.Cost);
    let profit = totalSell - totalCost;

    document.getElementById("cometSales").textContent = totalSell;
    document.getElementById("cometFaida").textContent = profit;
    document.getElementById("cometShift").textContent = lsShift;

	document.getElementById('comet').classList.toggle('show');
	document.getElementById("cometsbtn").classList.toggle('high');
}
);

}
);



// fn ]

function fnViews() {
	let current = parseInt(localStorage.getItem('Views'));
	let affirm = confirm(`Do you want to change icon view?`);
	if (affirm) {
		let change = current === 0 ? 1 : 0;
		localStorage.setItem('Views', change);
		alert(`Icon view has been changed.`);
		location.reload();
	}
}

function fnShift() {
	let current = parseInt(localStorage.getItem('Shift'));
	let affirm = confirm(`The current shift is ${current}. Do you want to change it?`);
	if (affirm) {
		current++;
		localStorage.setItem('Shift', current);
		alert(`Shift has been changed to ${current}`);
		location.reload();
	}
}

window.onload = function() {
	document.getElementById("myMenu").classList.remove("hidden");
	document.getElementById("myMenu").classList.add("show");
}