const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select maker.id, maker.name, CPU.model, CPU.price as 
Constitution from maker inner join CPU on maker.id=CPU.maker_id;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.name + ' : ' + data.model + ' : ' + data.Constitution );
		}
	});
});
