let idata;

(
    async () =>
    {
        idata = await new Dexie(dBase).open();

        if (lsViews === 1) {const stockAry = await idata.table("stock").toArray(); icons(stockAry, 1);}
        if (lsViews === 0) {const groupAry = await idata.table("group").toArray(); icons(groupAry, 0);}
    }
)();

window.onload = function() {
	document.getElementById("myMenu").classList.add("show");
  }
  

function icons(Ary, n)
{
	document.getElementById("iJava").innerHTML = "";

	let fragment = document.createDocumentFragment();

	Ary.forEach
	(
		(Q) =>
		{
			let card = document.createElement("div");
				card.className = 'JSfind';
				card.onclick = function () {if (n === 1) {dialogFlash(Q);} else {getGroup(Q.iName);}};

			let icon = document.createElement("img");
				icon.src = Q.iIcon;
				icon.onerror = function () {this.src = "./files/zero.png";};

			let name = document.createElement("div");
				name.textContent = Q.iName;

				card.append(icon, name);	fragment.append(card);
		}
	);
	document.getElementById("iJava").append(fragment);
}

async function getGroup(groupname) {
    const tapedAry = await idata.table("stock").where('Group').equals(groupname).toArray();
    icons(tapedAry, 1);
}

document.addEventListener("DOMContentLoaded", (e) =>
{
const mpscan = document.getElementById("mpscan");
const dialog = document.getElementById('dialog');

dialog.addEventListener('click', ({target}) =>
{
	console.log(target);
    if (target.id === 'dialog')
	{
	dialog.close();
	}
	else
	{
	mpscan.play();
	navigator.vibrate(300);
	dialog.classList.add('glid');
	}
});
dialog.addEventListener('transitionend', () =>
{
	dialog.close();
	dialog.classList.remove('glid');
});
dialog.addEventListener('close', () => { dialog.innerHTML = ""; });

});

function dialogFlash(e)
{
	let icon = document.createElement('img');
		icon.src = e.iIcon;
		icon.onerror = function () {this.src = "./files/zero.png";};

	let name = document.createElement('div');
		name.className = 'title';
		name.textContent = e.iName;

	let sell = document.createElement('div');
		sell.className = 'price';
		sell.textContent = 'Ksh ' + e.Sell + '.oo';

        dialog.append(icon, name, sell);
        dialog.showModal();

        dialog.onclick = function () { makeSale(e); };
}

async function makeSale(P) {
    const ilink = await new Dexie(dBase).open();

    P.Qtys = 1;
    P.Stamp = Date.now();
    P.Shift = lsShift;
	P.Place = new Date(Date.now()).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'});

    P.Prof = P.Sell - P.Cost;

    
    await ilink.table("sales").add(P);

    const item = await ilink.table("stock").where('SKU').equals(P.SKU).first();

    if (item) {
        item.Qtys--;
        await ilink.table("stock").put(item);
    }
}