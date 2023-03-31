import articleModule from '../modules/test.module';

const userGet = (req, res) => {
  articleModule.getALLUser().then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); }); 
};

const userPost = (req, res) => {
  const insertValues = req.body;
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  returnO["unrelated"] = [];
  const list = [];
  if (Array.isArray(insertValues)) {
    insertValues.forEach(function(insertValues) {
      if(insertValues.hasOwnProperty('name')){
        list.push(articleModule.createUser(insertValues));
      }
      else{
        returnO["unrelated"].push(insertValues);
      }
    });
    Promise.allSettled(list).then(values => {
      values.forEach(function(i){
        if(i["status"] == 'rejected'){
          returnO["fail"].push(i["reason"]["detail"]);
        }else{
          returnO["succeed"].push(i);
        }
      });
      res.send(returnO);
    });
  }
  else if(!req.body.hasOwnProperty('name')){
    returnO["unrelated"].push(req.body)
    res.send(returnO);
  }else{
    articleModule.createUser(insertValues).then((result) => {
      returnO["succeed"].push(result);
      res.send(returnO);
    }).catch((err) => { 
      returnO["fail"].push(i["reason"]["detail"]);
      res.send(returnO); 
    }); 
  }
};

const userPut = (req, res) => {
  const name = req.params.name;
  const id = req.body.user_id;
  articleModule.modifyUserID(name, id).then((result) => {
    return res.send(result);
  }).catch((err) => { return res.send(err); }); 
};

function userID(name,id){
  articleModule.modifyUserID(name, id).then((result) => {
    return true;
  }).catch((err) => { return false }); 
}

/* Article  DELETE 刪除 */
const userDelete = (req, res) => {
  const name = req.params.name;
  articleModule.deleteUser(name).then((result) => {
    res.send(result); 
  }).catch((err) => { return res.send(err); }); 
};

const test = (req, res) => {
  res.send('測試');
};

export default {
  userGet,
  userPost,
  userPut,
  userID,
  userDelete,
  test
};
