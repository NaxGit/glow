

document.getElementById('Shelf').addEventListener
(
	'click', ({target}) =>
{
    document.getElementById('Book').remove();

	let script = document.createElement('script');
		script.id = 'book';
		script.src = './library/' + target.textContent + '.js';
		script.onload = () => { generator(Shelf);};

	document.getElementById("library").append(script);
}
);


function generator(shelve)
{
	document.getElementById("iJava").innerHTML = "";

	let fragment = document.createDocumentFragment();

	shelve.forEach
	(
		(i) =>
		{
			let card = document.createElement('div');
				card.id = i.SKU;
				card.className = 'JSfind';
				card.onclick = function(){ Select(this,i) };

			let icon = document.createElement("img");
				icon.src = "./files/" + moi + "/" + i.iIcon;
				icon.onerror = function () {this.src = "./files/zero.png";};

			let name = document.createElement("div");
				name.textContent = i.iName;

				card.append(icon, name);	fragment.append(card);
		}
	);
	document.getElementById("iJava").append(fragment);
}

let idata;

(
    async () =>
    {
        idata = await new Dexie(dBase).open();
    }
)();

const product = { Place: 1 };
const newItem = { Place: 1 };


console.log('Am a Gooloingagn');

let formerdiv = 0;
let oldQtys = 0;

async function Select(e,i) {

    oldQtys = 0;

    await idata.table('stock').where('SKU').equals(i.SKU).toArray().then
    (
        (SKU) =>
            {
            SKU.forEach
            (
            (Q) =>
            {
                document.getElementById("costInput").placeholder = 'Current Cost price Ksh. ' + Q.Cost;
                document.getElementById("sellInput").placeholder = 'Current Selling price Ksh. ' + Q.Sell;
                document.getElementById("qtysInput").placeholder = 'Quantity in Stock : ' + Q.Qtys;
                oldQtys = Q.Qtys;
            }
            )
            }
    );




    if (formerdiv !== 0) {formerdiv.classList.remove("catalogueHigh");}

    e.classList.add("catalogueHigh"); formerdiv = e;

    document.getElementById("costInput").value = "";
    document.getElementById("sellInput").value = "";
    document.getElementById("qtysInput").value = "";

    document.getElementById(e.id).insertAdjacentElement('afterend', document.getElementById("CATinput"));

    product.SKU = i.SKU;
    product.iIcon = "./files/" + moi + "/" + i.iIcon;
    product.iName = i.iName;
    product.Group = moi;
}

function cat6Punch() {
    let cost = document.getElementById("costInput").value;
    let sell = document.getElementById("sellInput").value;
    let qtys = document.getElementById("qtysInput").value;

    let QTYs =Number(qtys) + Number(oldQtys);

    if (cost !== '' && sell !== '' && qtys !== '')
    {punch(cost,sell,QTYs)}
    else
    {alert("Please fill in all fields");}
}
async function punch(c,s,q) {

    product.Cost = Number(c);
    product.Sell = Number(s);
    product.Qtys = Number(q);
    stockItem(product)
}
async function stockItem(product) {
    try {
        await idata.table("stock").put(product);
        groupData(product.Group, product.iIcon);
    } catch (error) {
        console.error("Error in stockItem:", error);
    }
}
async function groupData(G, I) {
    try {
        await idata.table("group").put({ Group: G, iName: G, iIcon: I });
        document.getElementById("cloak").append(document.getElementById("CATinput"));
    } catch (error) {
        console.error("Error in groupData:", error);
    }
}


document.getElementById("nItem").addEventListener
(
	'input', () =>
{
	newItem.iName = document.getElementById("niName").value;
	newItem.Cost = Number(document.getElementById("nCost").value);
	newItem.Sell = Number(document.getElementById("nSell").value);
	newItem.Qtys = Number(document.getElementById("nQtys").value);
	



	
	newItem.iIcon = '';
	// newItem.iName = i.iName;
	newItem.Group = 'Special';

	console.log(newItem);


	// <input type="text" id="nCost">
	// <input type="text" id="nGroup">
	// <input type="text" id="nPlace">
	// <input type="text" id="nQtys">
	// <input type="text" id="nSKU">
	// <input type="text" id="nSell">
	// <input type="text" id="niIcon">
	// <input type="text" id="niName">

});

async function findItemWithBiggestSku()
{
await idata.table('stock').where('Group').equals('Special').toArray()
.then
(
SKUs =>
{
let provisional = SKUs.length === 0 ? 1 : SKUs.reduce((oldest, current) => {return (current.SKU > oldest.SKU) ? current : oldest;}); return provisional;
}
)
.then
(
Last =>
{
let available; if (isNaN(Last)) {available = Number(Last.SKU) + 1;} else {available = 1;}; userGen(available)
}
);
}

  

function userGen(SKU) {
	console.log(SKU + 'finafinalo');

    newItem.SKU = SKU;

let request = window.indexedDB.open(dBase);

request.onerror = (event) => {
  console.error('Error opening database:', event.target.error);
};

request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction('stock', 'readwrite');
  const objectStore = transaction.objectStore('stock');


  // Add the data to the object store
  const addRequest = objectStore.add(newItem);

  addRequest.onsuccess = (event) => {
    console.log('Data added successfully!');
  };

  addRequest.onerror = (event) => {
    console.error('Error adding data:', event.target.error);
  };

  // Close the connection when the transaction is complete
  transaction.oncomplete = () => {
    db.close();
  };
};

}