const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
var objectId = require('mongodb').ObjectId;
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  });

mongClient.connect(url,{useNewUrlParser:true},(err,db)=>{
    if(err) throw err
    // 数据库
    var cy = db.db('cy');
    // 内容
    var wb = cy.collection('wb');


        // 发布内容
        app.post('/add',(req,res)=>{
            wb.insert(req.body);
            res.send('1')
        })

        // 修改内容
        app.post('/update',(req,res)=>{
            wb.updateOne({'_id':objectId(req.body._id)},{$set:{...req.body,'_id':objectId(req.body._id)}})
        })

        // 查看内容
        app.get('/list',(req,res)=>{
            let list = [];
            wb.find().forEach((i)=>{
                list.unshift(i)
            },(err)=>{
                if(err) throw err;
                res.send(list)
            })
        })

        // 查看指定内容
        app.post('/select', (req,res)=>{
            var body = [];
            var num = -1;
            var num1 = 0;
            var data = [];
            wb.find().forEach((i)=>{
                body.push(i)
                num++
                if(objectId(i._id) == req.body._id) {
                    data.push(i)
                    data[1]=(body[num - 1])
                    num1++
                }
                if(num1 == 2){
                    num1++
                    data[2]=(body[num])
                }
                if(num1 == 1){
                    num1++
                }
            },()=>{
                res.send(data)
            })
        })

        // 删除内容
        app.post('/del',(req,res)=>{
            wb.deleteOne({'_id':objectId(req.body._id)})
            res.send('1')
        })




    // 时间轴
    var timeDb = cy.collection('time');

    // 获取时间轴列表
    app.get('/timeList',(req,res)=>{
        let list = []
        timeDb.find().forEach((i)=>{
            list.push(i);
        },(err)=>{
            if(err) throw err;
            res.send(list)
        })
    })

    // 发送时间轴
    app.post('/timeAdd',(req,res)=>{
        timeDb.insert(req.body)
        res.send('1')
    })


    // 修改时间轴
    app.post('/timeUpdate',(req,res)=>{
        timeDb.updateOne({'_id':objectId(req.body._id)},{$set:{'title':req.body.title}})
        res.send('1')
    })


    // 删除时间轴
    app.post('/timeDel',(req,res)=>{
        timeDb.deleteOne({'_id':objectId(req.body._id)})
        res.send('1')
    })



    // 获取留言表
    var msgDb = cy.collection('msg');


    // 获取留言
    app.get('/listMsg',(req,res)=>{
        let body = []
        msgDb.find().forEach((i)=>{
            body.push(i)
        },()=>{
            res.send(body)
        })
    })

    // 添加留言
    app.post('/addMsg',(req,res)=>{
        msgDb.insert(req.body)
        res.send('1')
    })

    app.get('/',(req,res)=>{
        res.send('1')
    })

    // 回复留言
    app.post('/updateMsg',(req,res)=>{
        msgDb.updateOne({'_id':objectId(req.body._id)},{$addToSet:{hf:req.body}})
        res.send('1')
    })

})

app.listen(8888, (err,a) => {
    if(err) throw err;
    console.log(a)
})