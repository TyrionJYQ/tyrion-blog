const sqlite = require("sqlite3");
const { dbConfig } = require("./config");
var db = new sqlite.Database(dbConfig.database, err => {
  if (err) return console.log(err);
  console.log("数据库连接成功！");
});

let obj = {};
// 查询1
obj.r = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, data) => {
      console.log("开始执行数据查询处理", sql, JSON.stringify(params));
      if (err) {
        console.error("执行数据查询处理异常", err.stack);
        resolve({ erroMsg: err.stack });
      }
      // 数据库操作成功返回查询到的data值
      console.log("执行数据查询结束，结果:%s", JSON.stringify(data));
      resolve(data);
    });
  });
};
// 写入(插入、更新或删除)
obj.w = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err, data) => {
      console.log("开始执行数据写入处理", sql, JSON.stringify(params));
      if (err) {
        console.error("执行数据写入处理异常", err.stack);
        resolve({ erroMsg: err.stack });
      }

      console.log("执行数据写入成功结束");
      resolve({code: 'OK'});
    });
  });
};
// 批量执行插入、更新或删除语句
obj.execBatchSql = (sqls, params) => {
  return new Promise((resolve, reject) => {
    console.log(
      "开始执行数据写入处理,参数:",
      JSON.stringify(sqls),
      JSON.stringify(params)
    );

    var lockFn = function() {
      if (global.dblock == undefined || global.dblock == null) {
        global.dblock = { locked: false };
      }

      if (global.dblock.locked) {
        setTimeout(lockFn, 100);
      } else {
        global.dblock.locked = true;

        db.run("BEGIN");

        var hasFailed = false;
        var error = null;
        var i = 0;
        var process = function(err, rows) {
          // 判断处理是否结束
          if (i >= sqls.length || hasFailed) {
            if (!hasFailed) {
              console.log(
                "处理数据库访问请求-批量执行插入、更新或删除语句成功",
                JSON.stringify(sqls).substring(0, 500)
              );
              db.run("COMMIT");
              global.dblock.locked = false;
              resolve({});
            } else {
              console.log(
                "处理数据库访问请求-批量执行插入、更新或删除语句失败，开始回滚",
                JSON.stringify(sqls).substring(0, 500)
              );
              console.log(err);
              db.run("ROLLBACK");
              global.dblock.locked = false;
              resolve({ erroMsg: JSON.stringify(sqls).substring(0, 50) });
            }
          } else {
            db.run(sqls[i], params[i], function(err, rows) {
              if (err) {
                hasFailed = true;
                error = err;
                console.log(
                  "处理数据库访问请求-执行语句%s,参数:失败:",
                  sqls[i],
                  params[i].join(","),
                  JSON.stringify(err)
                );
              } else {
                if (params[i] == undefined || params[i] == null) {
                  params[i] = [];
                }
                console.log(
                  "处理数据库访问请求-执行语句,参数:成功",
                  sqls[i],
                  params[i].join(",")
                );
              }
              i++;
              process(err, rows);
            });
          }
        };
        process(null, null);
      }
    };
    lockFn();
  });
};

module.exports = obj;
