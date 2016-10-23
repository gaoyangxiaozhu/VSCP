var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var app = new express();

var port = process.env.PORT || 9000;

// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//camera
app.get('/camera/getFrontCameraList', function(req, res){
    data = [
        {
            id: 101,
            ip: '10.103.242.183',
            name: '242.183'
        },
        {
            id: 102,
            ip: '10.103.242.185',
            name: 'camera102'
        }
    ]
    res.send(data)
});

//video storage
app.get('/video/getFrontVideoList', function(req, res){
    console.log(req.query)

    data=[
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
        {
            name : 'ch02_000010000002230', //视频文件名
            size: '1012.34', //单位为M 保留两位小数
            startTime: '2016-01-23 11:23:34', //开始时间
            totalTime: '24.23', //结束时间
            format: 'flv' //视频格式
        },
    ]

    res.send(data)
})

app.get("/*", function(req, res) {
  return res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
