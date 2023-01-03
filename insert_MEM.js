const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into MEM
("id","maker_id","model","standard","clock","price") values ("1","7","DOMINATOR PLATINUM ","DDR4","3000MHz","11800");`,
  `insert into MEM ("id","maker_id","model","standard","clock","price") values ("2","8","KVR","DDR4","3200MHz","14800");`,
  `insert into MEM ("id","maker_id","model","standard","clock","price") values ("3","9","KATANA","3200MHz","DDR4","15190");`,
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