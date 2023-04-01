const { expect } = require('chai');

const supertest = require('supertest');
require('../dist/index.bundle');

const api = supertest('http://localhost:3000'); 

before((done) => {
  api.delete('/header/clearAll') 
    .expect(200)
    .end((err, res) => {
      resolve(res.body);

    });
    done();
});

describe('Header', () => {
  it('Add Header', (done) => {
    api.post('/header')
   .send([
     {
        "name":"a"
     },
     {
        "name":"b"
     },
     {
        "name":"c"
     }
   ])
   .end((err, res) => {
    if (err) {
     reject(new Error('An error occured, err: ' + err))
    }
    expect(res.body.fail.length).to.equal(0);
    done();
   })
 });

  it('Get All Header', (done) => {
    api.get('/header') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(3);
        let list = []
        list.push(res.body[0].user.trim())
        list.push(res.body[1].user.trim())
        list.push(res.body[2].user.trim())
        list.sort()
        expect(list[0]).to.equal('a');
        expect(list[1]).to.equal('b');
        expect(list[2]).to.equal('c');
        done();
      })
  });

  it('Get Head', (done) => {
    api.get('/header/GetHead/a')
      .end((err,res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        console.log(res.body);
        expect(res.body[0]).to.have.property("final")
        expect(res.body[0]).to.have.property("article_key")
        expect(res.body[0]).to.have.property("user")
        done();
      })
  })

  it('delete Header', (done) => {
    api.delete('/header/a') // 測試取得所有文章
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        api.get('/header')
          .end((err,res)=>{
            expect(res.body.length).to.equal(2);
            let list = []
            list.push(res.body[0].user.trim())
            list.push(res.body[1].user.trim())
            list.sort()
            expect(list[0]).to.equal('b');
            expect(list[1]).to.equal('c');
            done();
          })
        
      })
  });

  it('change Header name', (done) => {
    api.put('/header/b') 
      .send(
           {
              "newName":"e"
           }
        )
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        api.get('/header/')
          .end((error,result)=>{
            expect(result.body.length).to.equal(2);
            let list = []
            list.push(result.body[0].user.trim())
            list.push(result.body[1].user.trim())
            list.sort()
            expect(list[0]).to.equal('c');
            expect(list[1]).to.equal('e');
            done();
          })
        
      })
  });
});