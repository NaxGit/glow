(
	async () =>
{
	let idata = await new Dexie(dBase).open();
	await idata.table('stock').toArray()
	.then((data) => {salesLog(data)});
}
)();

let Stock = 0;

function salesLog(data)
{

	let fragment = document.createDocumentFragment();

	data.forEach
	(
		(i) =>
		{
			Stock = Stock + (i.Cost * i.Qtys);

		let row = document.createElement("div");
			row.className = 'JSfind';

		let name = document.createElement("div");
			name.textContent = i.iName;
		let cost = document.createElement("div");
			cost.textContent = i.Cost;
		let qtys = document.createElement("div");
			qtys.textContent = i.Qtys;

		row.append(name, cost, qtys);	fragment.append(row);
		}
	);
	document.getElementById("iJava").append(fragment);
	statsLog();
}

function statsLog() {
	let stock = document.createElement("div");
		stock.innerHTML = `<div>Stock </div><div>${Stock}</div>`;

	document.getElementById("library").append(stock);
}