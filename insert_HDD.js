const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into HDD ("id","maker_id","model","capacity","price") values ("1","17","ST8000DM004","8000GB","13482");`,
  `insert into HDD ("id","maker_id","model","capacity","price") values ("2","17","ST1000DM003","1000GB","4970");`,
  `insert into HDD ("id","maker_id","model","capacity","price") values ("3","17","WD1003FBYX-01Y7B0","1000GB","6280");`,
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