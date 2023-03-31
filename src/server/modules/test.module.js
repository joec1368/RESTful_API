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
const getALLUser = () => {
  return new Promise((resolve, reject) => {
      pool.query(' SELECT * FROM "user"', (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve(results.rows)
    });
  });
};

/* Post */
const createUser = (insertValues) => {
  return new Promise((resolve, reject) => {
      pool.query(' INSERT INTO "user" ("user", "article_key") VALUES ($1, $2)', 
        [insertValues.name, insertValues.key], (error, results) => {
      if (error) {
        // console.error('SQL error: ', error);
        reject(error);
      }
    resolve("create " + insertValues.name + " succeed");
    });
  });
};

/* Article PUT 修改 */
const modifyUserID = (name, id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "user" SET "article_key" = $2 WHERE "user" = $1',
        [name, id], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change user article_key succeed");
    });
  });
};

/* Article PUT 修改 */
const modifyUserFinal = (name, id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "user" SET "final" = $2 WHERE "user" = $1',
        [name, id], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change user final succeed");
    });
  });
};

/* Article  DELETE 刪除 */
const deleteUser = (name) => {
  return new Promise((resolve, reject) => {
      pool.query('DELETE FROM "user" WHERE "user" = $1', [name],
         (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("delete succeed");
    });
  });
};


export default {
  getALLUser,
  createUser,
  modifyUserID,
  deleteUser,
  modifyUserFinal
};
