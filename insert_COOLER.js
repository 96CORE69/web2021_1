const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into COOLER ("id","maker_id","model","method","price") values ("1","15","Kraken Z63","liquid","35120");`,
  `insert into COOLER ("id","maker_id","model","method","price") values ("2","12","Neptune 240","liquid","24929");`,
  `insert into COOLER ("id","maker_id","model","method","price") values ("3","16","GAMMAX  L240 v2","liquid","9650");`,
]

for( let sql of sqls ){ 
  db.serialize( () => {
	  db.run( sql, (error, row) => {
	  	if(error) {
		  	console.log('Error: ', error );
		  	return;
	  	}
	  	console.log( "データを追加しました" );
  	});
  });
}