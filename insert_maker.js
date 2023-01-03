const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into maker ("id","name") values ("1","Intel");`,
  `insert into maker ("id","name") values ("2","AMD");`,
  `insert into maker ("id","name") values ("3","ASRock");`,
  `insert into maker ("id","name") values ("4","ROG");`,
  `insert into maker ("id","name") values ("5","AORUS");`,
  `insert into maker ("id","name") values ("6","MSI");`,
  `insert into maker ("id","name") values ("7","Corsair");`,
  `insert into maker ("id","name") values ("8","Kingston");`,
  `insert into maker ("id","name") values ("9","Antec");`,
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