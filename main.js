const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./mysql.js')
const app = express()
//...
//配置解析post表单数据中间件
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
//cors中间件解决路由跨域问题
app.use(cors())



//监听 data 路由的get请求，返回响应体，里面包含 本地数据库的全部数据data
app.get('/data', (req, res) => {
    db.query('select * from orders ', (err, results) => {
        if (err) return console.log(err.message)
        res.send({
            status: 200,
            msg: 'get success',
            data: results
        })
    }) 
})

//服务器监听 insert 路由
app.post('/insert', (req, res) => {
    const body = req.body
    const order = {
        CertiCardID: body.CertiCardID,
        BookPerson: body.BookPerson,
        CertiCardName: body.CertiCardName,
        Telephone: body.Telephone,
        RoomType: body.RoomType,
        InRoomDate: body.InRoomDate,
        OutRoomDate: body.OutRoomDate,
        InPersonNum: body.InPersonNum,
        RoomNum: body.RoomNum,
        RoomPrice: body.RoomPrice,
        Discount: body.Discount,
        PrePayment: body.PrePayment,
        SpecialRequire: body.SpecialRequire,
        Pic_pay: body.Pic_pay,
        Operator: body.Operator,
        DateBook: body.DateBook,
        IsAgree: body.IsAgree
    }
    const sqlStr = 'insert into orders set ?'
    db.query(sqlStr, order, (err,results) => {
        if(err) return console.log(err.message)
        if(results.affectedRows === 1) {console.log('success')}
    }) 

    res.send({
        status: 0,
        msg: 'success',
        data: body
    })
} )

//服务器监听 select 路由 并响应出特定数据
app.get('/selectData', (req, res) => {
    const query = req.query
    const sqlStr = 'select * from orders where BookID = ?'
    db.query(sqlStr, query.BookID, (err, results) => {
        if (err) return console.log(err.message)
        res.send({
            status: 200,
            msg: 'get success',
            data: results
        })
    })
})

//服务器监听 delete 路由
app.post('/delete', (req, res) => {
    const body = req.body
    const sqlStr = 'delete from orders where BookID =?'
        db.query(sqlStr, body.BookID, (err, results) => {
        if(err) return console.log(err.message)
        if(results.affectedRows === 1 ) { console.log('success') }
})
})

//服务器监听 update 路由
app.post('/update', (req, res) => {
    const body = req.body
    const sqlStr = 'update orders set ' + req.body.key + ' = ? where BookID = ?'
    db.query(sqlStr, [ body.value, body.BookID], (err,results) => {
        if(err) return console.log(err.message)
        if(results.affectedRows === 1) console.log('update success')
    })
})
 


//...
app.listen(80, () =>{
    console.log('run 80 server')
})