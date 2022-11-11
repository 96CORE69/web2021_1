const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into MB ("id","maker_id","model","grade","socket","price") values ("1","3","Z690 PG Riptide","Z690","LGA1700","27584");`,
  `insert into MB
("id","maker_id","model","grade","socket","price") values ("2","4","Z370 ROG MAXIMUS X APEX","Z370","LGA1151","52386");`,
  `insert into MB ("id","maker_id","model","grade","socket","price") values ("3","5","X570 AORUS PRO","X570","AM4","16980");`,
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