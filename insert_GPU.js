const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into GPU
("id","maker_id","model","chipmaker","price") values ("1","10","GeForce RTX™ 3070 GamingPro","NVIDIA","52980");`,
 `insert into GPU
("id","maker_id","model","chipmaker","price") values ("2","11","RTX 3060 Ti Twin Edge OC LHR","NVIDIA","50980");`,
  `insert into GPU
("id","maker_id","model","chipmaker","price") values ("3","6","RTX2060 Super Gaming X","NVIDIA","45078");`,
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