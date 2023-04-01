var md5 = require('md5');
import pageModule from '../modules/page.module';
import headerModule from '../modules/header.module';
function print(text){
  res.status(200).send((text).toString());
}


const pageGet = (req, res) => {
  const id = req.body.id;
  pageModule.getData(id).then((result) => {
    res.send(result); 
  }).catch((err) => { return res.send(err); }); 
};

const pageUpdate = (req,res) => {
  const insertValues = req.body;
  const user = req.params.name;
  const originPage = req.body.originPage;
  const newPage = req.body.newPage;
  const originPageID = md5(originPage + user);
  const newPageID = md5(newPage + user);
  const array = []
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  if(newPage == null || originPage == null || user == null){
    res.send("error input");
  }
  pageModule.updatePageAndSet(user).then((result) => {
    if(result.rowCount == 0 ){
      res.send("user error");
    }else{
      let head = result.rows[0].article_key.trim();
      let final = result.rows[0].final.trim();
      let list = []
      list.push(pageModule.modifyPage(originPageID,newPageID,newPage));
      if(head == originPageID && final == originPageID){
        list.push(headerModule.modifyHeaderPageID(user,newPageID));
        list.push(headerModule.modifyHeaderFinal(user,newPageID))
      }
      else if(head === originPageID){
        // res.send("equal head " + head + " origin : " + originPageID);
        list.push(headerModule.modifyHeaderPageID(user,newPageID))
        list.push(pageModule.modifyPagePre(originPageID,newPageID));
      }else if(final === originPageID){
        // res.send("equal , final " + head + " origin : " + originPageID);
        list.push(headerModule.modifyHeaderFinal(user,newPageID))
        list.push(pageModule.modifyPageNext(originPageID,newPageID));
      }else{
        // res.send("no equal , head " + head + " origin : " + originPageID + "");
        list.push(pageModule.modifyPageNext(originPageID,newPageID));
        list.push(pageModule.modifyPagePre(originPageID,newPageID));
      }
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
  }).catch((err) => { return res.send(err); }); 

}


const pagePost = (req, res) => {
  const user = req.params.name;
  const insertValues = req.body;
  const array = []
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  let count = 0

  insertValues.forEach(function(i){
    if(!i.hasOwnProperty('user')){
      i.id = md5(i.page + user)
      array[count] = i 
      count += 1 
    }
  });
  
  pageModule.updatePageAndSet(user).then((result) => {
    if(result.rowCount == 0 ){
      res.send("user error");
    }else{
      let head = result.rows[0].page_key;
      let final = result.rows[0].final;
      let list = []
      if(head == null){
        list.push(headerModule.modifyHeaderPageID(user,array[0].id));
      }
      list.push(headerModule.modifyHeaderFinal(user,array[ array.length - 1].id));  
      for(let i = 0 ; i < array.length - 1 ; i++){
        array[i].next = array[i+1].id;
      }
      for(let i = 1 ; i < array.length ; i++){
        array[i].pre = array[i-1].id; 
      }
      if(final != null){
        list.push(pageModule.modifyPageNext(final,array[0].id));
      }
      array[0].pre = final;
      array[ array.length - 1].next = null;
      array.forEach(function(i) {
        list.push(pageModule.createData(i));
      });
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
  }).catch((err) => { return res.send(err); }); 
}

const pageDelete = (req,res) => {
  const user = req.params.name;
  const page = req.body.page;
  const pageID = md5(page + user);
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  if(page == null || user == null){
    res.send("error input");
  }
  const list = []
  const info = 0
  let head,final;
  pageModule.updatePageAndSet(user)
    .then(function(result){
      head = result.rows[0].article_key.trim();
      final = result.rows[0].final.trim();
      return pageModule.getDataAllInfo(pageID);
    })
    .then((result) => {
      if(head == pageID && final == pageID){
        list.push(headerModule.modifyHeaderPageID(user,null));
        list.push(headerModule.modifyHeaderFinal(user,null));
      }
      else if(head == pageID){
        list.push(headerModule.modifyHeaderPageID(user,result["next"]));
        list.push(pageModule.modifyPagePre(pageID,result["previous"]));
      }else if(final == pageID){
        list.push(headerModule.modifyHeaderFinal(user,result["previous"]))
        list.push(pageModule.modifyPageNext(pageID,null));
      }else{
        list.push(pageModule.modifyPageNext(pageID,result["next"]));
        list.push(pageModule.modifyPagePre(pageID,result["previous"]));
      }
      list.push(pageModule.deleteData(pageID));
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
    // })
  }).catch((err) => { return res.send(err); }); 

}

const test = (req, res) => {
  res.send('測試');
};




export default {
  test,
  pageGet,
  pagePost,
  pageUpdate,
  pageDelete
};
