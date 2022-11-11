const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select id, maker_id, model, grade, socket, price from MB;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.maker_id + ' : ' + data.model + ' : ' + data.grade + ' : ' + data.socket + ' : ' + data.price);
		}
	});
});
