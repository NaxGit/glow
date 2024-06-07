const dBase = 'GoThink';

(
	async () =>
{
	let open = indexedDB.open(dBase, 1);
		open.onerror =  (e) => { console.log('onerror');};
		open.onsuccess =  (e) => { console.log('onsuccess');};
		open.onupgradeneeded = (e) =>
			{
			let link = e.target.result;

			let group = link.createObjectStore('group', { keyPath: 'Group' });
			let sales = link.createObjectStore('sales', { keyPath: 'Stamp' });
			let stock = link.createObjectStore('stock', { keyPath: 'SKU' });

				sales.createIndex('Shift', 'Shift', { unique: false });
				sales.createIndex('Syinc', 'Syinc', { unique: false });
				stock.createIndex('Place', 'Place', { unique: false });
				stock.createIndex('Group', 'Group', { unique: false });
			}
}
)
();

 let preLoad = localStorage.getItem('Pload'); // localStorage.removeItem('Pload');
if (!preLoad) {
	localStorage.setItem('Pload', 1);
	localStorage.setItem('Views', 1);
	localStorage.setItem('Shift', 1);
	location.reload();
}
const lsViews = parseInt(localStorage.getItem('Views'));
const lsShift = parseInt(localStorage.getItem('Shift'));

if ('serviceWorker' in navigator) {navigator.serviceWorker.register('./Worker.js', { scope: '/TQ/' }).then().catch();}