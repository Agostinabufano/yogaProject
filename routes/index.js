var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1');
var path = require("path");
var fs = require("fs");
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var credentials = { name: "agostina", pass: "123" }

router.use('/yoga/admin', function (req, res, next) {
  next()
  // if (credentials.name === req.query.name && credentials.pass === req.query.pass) {
  //   res.locals.user = req.query;
  //   next()
  // } else {
  //   res.sendFile(path.resolve(__dirname + "/../public/login.html"))
  // }
})

router.post('/yoga/admin/save', function (req, res, next) {
  const asana = req.body;
  console.log(asana);
  saveData(asana);
  res.send()
});

function createId() {
  var id = uuidv1();
  return id
}

function read() {
  let data = fs.readFileSync("data/data.json");
  data = JSON.parse(data);
  return data;
}

function saveData(pose) {
  var data = read();
  var asana = {
    name: pose.name,
    englishName: pose.englishName,
    img: pose.img,
    difficulty: pose.difficulty,
    benefits: pose.benefits,
    contraindications: pose.contraindications,
    instructions: pose.instructions,
    introduction: pose.introduction,
    id: createId()
  }
  data.poses.push(asana);
  fs.writeFile("data/data.json", JSON.stringify(data));
}

router.get('/yoga/admin', function (req, res, next) {
  res.sendFile(path.resolve(__dirname + "/../public/admin.html"));
});

router.get('/yoga/beginner', function (req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/levels.html'))
})

router.get('/yoga/intermediate', function (req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/levels.html'))
})

router.get('/yoga/advanced', function (req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/levels.html'))
})

router.get('/yoga/home', function (req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'))
})

router.get('/yoga/api/beginner', function (req, res, next) {
  res.send(filteredAsanas("beginner"))
})

router.get('/yoga/api/intermediate', function (req, res, next) {
  res.send(filteredAsanas("intermediate"))
})

router.get('/yoga/api/advanced', function (req, res, next) {
  res.send(filteredAsanas("advanced"))
})

function filteredAsanas(difficulty) {
  var response = [];
  var poses = read().poses
  for (var i = 0; i < poses.length; i++) {
    if (difficulty == poses[i].difficulty) {
      response.push(poses[i])
    }
  }
  return response
}

router.get('/yoga/agostinabufano.com', function (req, res, next) {
  res.redirect('http://agostinabufano.com')
})

router.use("/yoga", express.static('public'));

module.exports = router;
