(
	async () =>
{
	let idata = await new Dexie(dBase).open();
	await idata.table('sales').toArray()
	.then((data) => {salesLog(data)});
}
)();

let Sales = 0;
let Faida = 0;

function salesLog(data)
{

	let fragment = document.createDocumentFragment();

	data.forEach
	(
		(i) =>
		{
			Faida = Faida + (i.Sell - i.Cost);
			Sales = Sales + i.Sell;

		let row = document.createElement("div");
			row.className = 'JSfind';

		let time = document.createElement("div");
			time.textContent = i.Place
		let name = document.createElement("div");
			name.textContent = i.iName;
		let sell = document.createElement("div");
			sell.textContent = i.Sell;

		row.append(time, name, sell);	fragment.append(row);
		}
	);
	document.getElementById("iJava").append(fragment);
	statsLog();
}

function statsLog() {
	let sales = document.createElement("div");
		sales.innerHTML = `<div>Sales </div><div>${Sales}</div>`;
	let faida = document.createElement("div");
		faida.innerHTML = `<div>Faida </div><div>${Faida}</div>`;

	document.getElementById("library").append(sales, faida);
}