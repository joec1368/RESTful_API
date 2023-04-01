
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
      const payload = [
        {
          "value":results.rows[0].article.trim()
        },
        {
          "id":""
        }
      ];
      if(results.rows[0].next != null){
        payload[1].id = results.rows[0].next.trim();
      }else{
        payload[1].id = null;
      }
      
      resolve(payload)
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
        [input.id,input.page,input.next,input.pre], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
      }
      resolve("insert " + input.id + " succed");
    });
  });
};

/* Post */
const updatePageAndSet = (input) => {//id,page,next
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

/* Page PUT 修改 */
const modifyPageNext = (id, next) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "article" SET "next" = $2 WHERE "next" = $1',
        [id, next], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change " + id +" next succeed");
    });
  });
};

/* Page PUT 修改 */
const modifyPagePre = (id, pre) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE "article" SET "previous" = $2 WHERE "previous" = $1',
        [id, pre], (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("change " + id +" previous succeed");
    });
  });
};

/* Page PUT 修改 */
const modifyPage = (id,newID ,article) => {
    return new Promise((resolve, reject) => {
      pool.query(' UPDATE "article" SET "ID" = $1, "article" = $2 WHERE "ID" = $3',
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

const clearData = (id) => {
  return new Promise((resolve, reject) => {
      pool.query('TRUNCATE TABLE "article"',
         (error, results) => {
      if (error) {
        console.error('SQL error: ', error);
        reject(error);
    }
    resolve("clear succeed");
    });
  });
};

export default {
  getData,
  createData,
  updatePageAndSet,
  modifyPageNext,
  modifyPagePre,
  modifyPage,
  getDataAllInfo,
  clearData,
  deleteData
};
