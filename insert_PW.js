const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into PW ("id","maker_id","model","power","efficiency","price") values ("1","12","SIGNATURE 1300 PLATINUM","1300","Platina","45980");`,
  `insert into PW ("id","maker_id","model","power","efficiency","price") values ("2","13","Hydro PTM PRO 1200W","1200","Platina","31920");`,
  `insert into PW ("id","maker_id","model","power","efficiency","price") values ("3","14","PRIME 1000W Gold","1000","Gold","30930");`,
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