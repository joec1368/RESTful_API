import pageModule from '../modules/page.module';
import headerModule from '../modules/header.module';

const headerGet = (req, res) => {
  headerModule.getALLHeader().then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); }); 
};

const headerGetCertain = (req, res) => {
  const name = req.params.name;
  headerModule.getCertainHeader(name).then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); }); 
}

const headerPost = (req, res) => {
  const insertValues = req.body;
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  returnO["unrelated"] = [];
  const list = [];
  if (Array.isArray(insertValues)) {
    insertValues.forEach(function(insertValues) {
      if(insertValues.hasOwnProperty('name')){
        list.push(headerModule.createHeader(insertValues));
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
    headerModule.createHeader(insertValues).then((result) => {
      returnO["succeed"].push(result);
      res.send(returnO);
    }).catch((err) => { 
      returnO["fail"].push(i["reason"]["detail"]);
      res.send(returnO); 
    }); 
  }
};

const headerPut = (req, res) => {
  const name = req.params.name;
  const id = req.body.newName;
  headerModule.modifyHeaderID(name, id).then((result) => {
    return res.send(result);
  }).catch((err) => { return res.send(err); }); 
};

function headerID(name,id){
  headerModule.modifyHeaderID(name, id).then((result) => {
    return true;
  }).catch((err) => { return false }); 
}

/* Header  DELETE 刪除 */
const headerDelete = (req, res) => {
  const name = req.params.name;
  headerModule.deleteHeader(name).then((result) => {
    res.send(result); 
  }).catch((err) => { return res.send(err); }); 
};

const clearAll = (req, res) => {
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  headerModule.getALLHeader().then((result) => {
    
    let list = []
    result.forEach((i) => {
      list.push(headerModule.modifyHeaderPageID(i["user"].trim(),null));
      list.push(headerModule.modifyHeaderFinal(i["user"].trim(),null));
    }) 
    list.push(pageModule.clearData());
    Promise.allSettled(list).then(values => {
      values.forEach(function(i){
        if(i["status"] == 'rejected'){
          returnO["fail"].push(i);
        }else{
          returnO["succeed"].push(i);
        }
      });
      res.send(returnO);
    });
  }).catch((err) => { return res.send(err); }); 
}

const clearHeaderPage = (req,res) => {
  let list = []
  list.push(pageModule.clearData());
  list.push(headerModule.clearAllHeader());
  Promise.allSettled(list).then(values => {
    values.forEach(function(i){
      if(i["status"] == 'rejected'){
        returnO["fail"].push(i);
      }else{
        returnO["succeed"].push(i);
      }
    });
    res.send(returnO);
  });
}

const test = (req, res) => {
  res.send('測試');
};

export default {
  headerGet,
  headerGetCertain,
  headerPost,
  headerPut,
  headerID,
  headerDelete,
  clearHeaderPage,
  clearAll,
  test
};
