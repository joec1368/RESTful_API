
import config from '../../config/config';
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.pgUserName,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPass,
  port: config.pgPort
})

/* Get */
const getData = (id) => {
  return new Promise((resolve, reject) => {
      pool.query(' SELECT * FROM "article" where "ID"=$1',[id]
        , (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
      }
      resolve(results.rows[0].article + " " + results.rows[0].next)
    });
  });
};

const getDataAllInfo = (id) => {
  return new Promise((resolve, reject) => {
      pool.query(' SELECT * FROM "article" where "ID"=$1',[id]
        , (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
      }
      resolve(results.rows[0])
    });
  });
};


/* Post */
const createData = (input) => {//id,article,next
  return new Promise((resolve, reject) => {
      pool.query(' INSERT INTO "article" ("ID", "article","next","previous") VALUES ($1, $2,$3,$4)', 
        [input.id,input.article,input.next,input.pre], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
      }
      resolve("insert " + input.id + " succed");
    });
  });
};

/* Post */
const updateArticleAndSet = (input) => {//id,article,next
  return new Promise((resolve, reject) => {
      pool.query(' SELECT * FROM "user" where "user"=$1', 
        [input], (error, results) => {
          console.error("temp");
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
      }
      resolve(results);
    });
  });
};

/* Article PUT 修改 */
const modifyArticleNext = (id, next) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "article" SET "next" = $2 WHERE "ID" = $1',
        [id, next], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change " + id +" next succeed");
    });
  });
};

/* Article PUT 修改 */
const modifyArticlePre = (id, pre) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "article" SET "previous" = $2 WHERE "ID" = $1',
        [id, pre], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change " + id +" previous succeed");
    });
  });
};

/* Article PUT 修改 */
const modifyArticle = (id,newID ,article) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "article" SET "ID" = $1, "article" = $2 WHERE "ID" = $3',
      // pool.query('UPDATE "article" SET ("ID", "article") VALUES ($1, $2) WHERE "ID" = $3',
        [newID, article,id], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change " + id +" succeed");
    });
  });
};

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
      pool.query('DELETE FROM "article" WHERE "ID" = $1', [id],
         (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("delete " + id +" succeed");
    });
  });
};

export default {
  getData,
  createData,
  updateArticleAndSet,
  modifyArticleNext,
  modifyArticlePre,
  modifyArticle,
  getDataAllInfo,
  deleteData
};
