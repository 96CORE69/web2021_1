const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 都道府県, 人口 from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})
app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})


app.get("/CPU", (req, res) => {
    //console.log(req.query.pop);    // ①
    let sql = "select id, maker_id, model, grade, socket, price from CPU;";
  
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('CPU', {data:data});
        })
    })
})

app.get("/DELETE", (req, res) => {
    //console.log(req.query.pop);    // ①
    let sql = "select id, maker_id, model, grade, socket, price from CPU;";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('CPU', {data:data});
        })
    })
})


app.get("/MB1", (req, res) => {
    //console.log(req.query.pop);    // ①

    let data_CPU;
    //console.log(sql);    // ②
    db.serialize( () => {
        let sql = "select * from CPU where" + '"' + req.query.CPU_ID + '"' + "= id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_CPU = data;
        });
        sql = "select id, maker_id, model, grade, socket, price from MB;";
      //console.log(sql);    // ②
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('MB1', {data:data, data_CPU:data_CPU});
        })
    })
})

app.get("/MEM", (req, res) => {
    //console.log(req.query.pop);    // ①
    let data_CPU;
    let data_MB;
    //console.log(sql);    // ②
    db.serialize( () => {
        let sql = "select * from CPU where " + '"' + req.query.CPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_CPU = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MB where " + '"' + req.query.MB_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MB = data;
        }); 
        sql = "select id, maker_id, model, standard, clock, price from MEM;";
      //console.log(sql);    // ②
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('MEM', {data:data, data_CPU:data_CPU, data_MB:data_MB});
        })
    })
})

app.get("/GPU", (req, res) => {
    //console.log(req.query.pop);    // ①
    let data_CPU;
    let data_MB;
    let data_MEM;
    //console.log(sql);    // ②
    db.serialize( () => {
        let sql = "select * from CPU where " + '"' + req.query.CPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_CPU = data;
        });
      });
      db.serialize( () => {
        let sql = "select * from MB where " + '"' + req.query.MB_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MB = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MEM where " + '"' + req.query.MEM_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MEM = data;
        }); 
        sql = "select id, maker_id, model, chipmaker, price from GPU;";
      //console.log(sql);    // ②
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('GPU', {data:data, data_CPU:data_CPU, data_MB:data_MB, data_MEM:data_MEM});
        })
    })
})

app.get("/COOLER", (req, res) => {
    //console.log(req.query.pop);    // ①
    let data_CPU;
    let data_MB;
    let data_MEM;
    let data_GPU;
    //console.log(sql);    // ②
    db.serialize( () => {
        let sql = "select * from CPU where " + '"' + req.query.CPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_CPU = data;
        });
      });
      db.serialize( () => {
        let sql = "select * from MB where " + '"' + req.query.MB_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MB = data;
        });
      });
      db.serialize( () => {
        let sql = "select * from MEM where " + '"' + req.query.MEM_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MEM = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from GPU where " + '"' + req.query.GPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_GPU = data;
        }); 
        sql = "select id, maker_id, model, method, price from COOLER;";
      //console.log(sql);    // ②
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('COOLER', {data:data, data_CPU:data_CPU, data_MB:data_MB, data_MEM:data_MEM, data_GPU:data_GPU});
        })
    })
})


app.get("/PW", (req, res) => {
    //console.log(req.query.pop);    // ①
    let data_CPU;
    let data_MB;
    let data_MEM;
    let data_GPU;
    let data_COOLER;
    //console.log(sql);    // ②
    db.serialize( () => {
        let sql = "select * from CPU where " + '"' + req.query.CPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_CPU = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MB where " + '"' + req.query.MB_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MB = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MEM where " + '"' + req.query.MEM_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MEM = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from GPU where " + '"' + req.query.GPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_GPU = data;
        }); 
    db.serialize( () => {
        let sql = "select * from COOLER where " + '"' + req.query.COOLER_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_COOLER = data;
        });
      });
        sql = "select id, maker_id, model, power, efficiency, price from PW;";
      //console.log(sql);    // ②
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('PW', {data:data, data_CPU:data_CPU, data_MB:data_MB, data_MEM:data_MEM, data_GPU:data_GPU, data_COOLER:data_COOLER});
        })
    })
})

app.get("/HDD", (req, res) => {
    //console.log(req.query.pop);    // ①
    let data_CPU;
    let data_MB;
    let data_MEM;
    let data_GPU;
    let data_COOLER;
    let data_PW;
    //console.log(sql);    // ②
    db.serialize( () => {
        let sql = "select * from CPU where " + '"' + req.query.CPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_CPU = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MB where " + '"' + req.query.MB_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MB = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MEM where " + '"' + req.query.MEM_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MEM = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from GPU where " + '"' + req.query.GPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_GPU = data;
        }); 
    db.serialize( () => {
        let sql = "select * from COOLER where " + '"' + req.query.COOLER_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_COOLER = data;
        });
      });
        db.serialize( () => {
        let sql = "select * from PW where " + '"' + req.query.PW_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_PW = data;
        });
      });
        sql = "select id, maker_id, model, capacity, price from HDD;";
      //console.log(sql);    // ②
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('HDD', {data:data, data_CPU:data_CPU, data_MB:data_MB, data_MEM:data_MEM, data_GPU:data_GPU, data_COOLER:data_COOLER, data_PW:data_PW});
        })
    })
})

app.get("/SSD", (req, res) => {
    //console.log(req.query.pop);    // ①
    let data_CPU;
    let data_MB;
    let data_MEM;
    let data_GPU;
    let data_COOLER;
    let data_PW;
    let data_HDD;
    //console.log(sql);    // ②
    db.serialize( () => {
        let sql = "select * from CPU where " + '"' + req.query.CPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_CPU = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MB where " + '"' + req.query.MB_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MB = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from MEM where " + '"' + req.query.MEM_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_MEM = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from GPU where " + '"' + req.query.GPU_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_GPU = data;
        }); 
    db.serialize( () => {
        let sql = "select * from COOLER where " + '"' + req.query.COOLER_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_COOLER = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from PW where " + '"' + req.query.PW_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_PW = data;
        });
      });
    db.serialize( () => {
        let sql = "select * from HDD where " + '"' + req.query.HDD_ID + '"' + " = id;";
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            //res.render('MB1', {data:data});
          data_HDD = data;
        });
      });  
        sql = "select id, maker_id, model, capacity, price from SSD;";
      //console.log(sql);    // ②
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('SSD', {data:data, data_CPU:data_CPU, data_MB:data_MB, data_MEM:data_MEM, data_GPU:data_GPU, data_COOLER:data_COOLER, data_PW:data_PW, data_HDD:data_HDD});
        })
    })
})
app.get("/MB", (req, res) => {
    //console.log(req.query.pop);    // ①
    let sql = "select id, maker_id, model, grade, socket, price from MB;";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('MB', {data:data});
        })
    })
})


app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりませんaaa');
});

app.listen(80, () => console.log("Example app listening on port 80!"));
