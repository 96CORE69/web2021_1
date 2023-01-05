const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into SSD ("id","maker_id","model","capacity","price") values ("1","19","P5","500GB","11280");`,
  `insert into SSD ("id","maker_id","model","capacity","price") values ("2","8","KC3000","1000GB","15838");`,
  `insert into SSD ("id","maker_id","model","capacity","price") values ("3","8","A2000","500GB","4291");`,
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