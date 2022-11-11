const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into CPU ("id","maker_id","model","grade","socket","price") values ("1","1","12700K","i7","LGA1700","66140");`,
  `insert into CPU ("id","maker_id","model","grade","socket","price") values ("2","1","10900K","i9","LGA1200","59800");`,
  `insert into CPU ("id","maker_id","model","grade","socket","price") values ("3","1","9900K","i9","LGA1151","54980");`,
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