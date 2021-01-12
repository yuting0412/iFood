const express = require('express');
var router = express.Router();
const app = express();
let sql = require("mssql");
let cors = require('cors');
const readonlyconfig = require('./dbconfig.json');
const sqlmethod = require('./sql.json');

app.use(express.json()); // post解析body

// mssql 連線
const pool = new sql.ConnectionPool(readonlyconfig);
const readonlyPoolPromise = pool.connect();
pool.on('error', err => {
    console.log('Database Connection Failed :', err); // ... error handler
})

router.use(cors());

router.get('/', function(req, res, next) {//首頁
  res.render('manPage');
})

router.get('/res', async(req, res) => { // '/'是指專案的根目錄路徑
  let formData = req.query;
  let town = { method: 'dropdownBar', cName: formData['town']} // navBar 的每個欄位
  let star = { method: 'dropdownBar', cName: '評分'}
  let cuisine = { method: 'dropdownBar', cName: '菜系、種類'}
  let special = { method: 'dropdownBar', cName: '特殊需求'}
  let allRes = {method : 'getTownRes', cName: formData['town']} // 縣市的所有餐廳
  let allTownship = { method: 'dropdownBar', cName: formData['town']} // 縣市的所有鄉鎮市區
  //http://127.0.0.1:3000/?method=selectCity&cName=南投縣
  let townResult = await runSQL(town);
  let starResult = await runSQL(star);
  let cuisineResult = await runSQL(cuisine);
  let specialResult = await runSQL(special);
  let allResResult = await runSQL(allRes);
  let allTownshipResult = await runSQL(allTownship);
  // res.json(formData['city'])
  res.render('index', { title: 'Express', town: townResult, star:starResult, special: specialResult, cuisine:cuisineResult, allRes:allResResult, allTownship:allTownshipResult});
});

// 負責接 ajax
router.get('/getTownshipRes', async(req, res) => {
  let town = req.query;
  let townRes = await runSQL(town);
  res.send(townRes);
})

router.get('/work', function(req, res, next) {
  res.render('work', { title: 'Express'});
});

const runSQL = async (allreq) => {
  let { method } = allreq;
  if (!sqlmethod[method]) {
    return { 'Status': '404', 'Message': 'File Not Found' }
  }
  let input = sqlmethod[method]['input']; // 取得參數
  sqlQuery = sqlmethod[method]['sql']; // 由json取得sqlcode

  const pool = await readonlyPoolPromise;
  const request = pool.request();
  input.map(i => request.input(i[0], sql[i[1]], allreq[i[0]]))

  const result = await request.query(sqlQuery);
  return result.recordset;
}

module.exports = router;