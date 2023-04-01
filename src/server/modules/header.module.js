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
const getALLHeader = () => {
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

const getCertainHeader = (id) => {
  return new Promise((resolve, reject) => {
      pool.query(' SELECT * FROM "user" WHERE "user" = $1',[id], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve(results.rows)
    });
  });
};

/* Post */
const createHeader = (insertValues) => {
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

/* Header PUT 修改 */
const modifyHeaderID = (name, id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "user" SET "user" = $2 WHERE "user" = $1',
        [name, id], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change header name succeed");
    });
  });
};

/* Header page_id 修改 */
const modifyHeaderPageID = (name, id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "user" SET "article_key" = $2 WHERE "user" = $1',
        [name, id], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("set page first name succeed");
    });
  });
};

/* Header PUT 修改 */
const modifyHeaderFinal = (name, id) => {
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

/* Header  DELETE 刪除 */
const deleteHeader = (name) => {
  return new Promise((resolve, reject) => {
      pool.query('DELETE FROM "user" WHERE "user" = $1', [name],
         (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("delete header succeed");
    });
  });
};

const clearAllHeader = () => {
  return new Promise((resolve, reject) => {
      pool.query('TRUNCATE TABLE "user"',
         (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("clear succeed");
    });
  });
}

export default {
  getALLHeader,
  createHeader,
  modifyHeaderID,
  deleteHeader,
  clearAllHeader,
  modifyHeaderPageID,
  getCertainHeader,
  modifyHeaderFinal
};
