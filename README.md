# RESTful_API
* 共用的 Key-Value 列表系統 
* 使用 PostgreSQL，但在那邊應該不能執行，因為我是設定成 localhost 且 我把帳號密碼都拿掉了
* 分兩個區塊，一個是負責處理 Header name 。另外一個是負責處理 Page 相關的
* 前面最一開始預設的是 ： https://localhost:3000
* DataBase 裡面的 Scheme ：
    * header
        * ![](https://i.imgur.com/Qtwcdoi.png)
        * header : header 的名稱
        * page_key : 指向屬於這個 header 第一個 Page 的 id
        * final : 指向屬於這個 header 最後一個 Page 的 id
    * page
        * ![](https://i.imgur.com/mVXvd9L.png)
        * ID : 
            * 產生方式：文章內容+Header name 拿去做 md5
        * articel : 文章內容，及 value
        * next : 指向下一個 page
        * timeStamp : 哪時候被創立的
        * previous : 指向前一個 page
* ![Go 版本](https://github.com/joec1368/Restful-API-GO)
# 可以使用的 API :
* header
    * GetHeader
        * method : GET
        * usage : /header/GetHead/{header}
        * body : no
        * return : 
        ```{json}
        [
             {
                "ID": ,
                "Page_key": ,
                "Final":
             }
       ]
        ```
    * AddHeader
        * method : POST
        * usage : /header
        * body : 
        ```{json}
        [
             {
                "name":
             },
             {
                "name":
             },
             ...
       ]
        ```
        * return : 
        ```{json}
        {
            "succeed" : []
            "fail" : []
        }
        ```
     * GetAllHeader
        * method : GET
        * usage : /header/
        * body : no
        * return : 
        ```{json}
        [
            {
                "ID": ,
                "Page_key": ,
                "Final":
            },
            ...
        ]
        ```
     * ClearAllPageData
        * method : DELETE
        * usage : /header/clear
        * body : 
        * return : 
        ```{json}
        {
            "succeed" : []
            "fail" : []
        }
        ```
     * ClearAllHeaderAndPage
        * method : DELETE
        * usage : /header/clearAll
        * body : no
        * return : 
        ```{json}
        {
            "succeed" : []
            "fail" : []
        }
        ```
     * ChangeHeaderName
        * method : PUT
        * usage : /header/{header}
        * body : 
        ```{json}
        {
              "newName":
        }
        ```
        * return : "change header name succeed"
     * DeleteHeader
        * method : DELETE
        * usage : /header/{header}
        * body : no
        * return : "delete header succeed"
* PAGE
     * GetPage
        * method : POST
        * usage : /page/getPage
        * body : 
        ```{json}
        {
            "id":
        }
        ```
        * return : 
        ```{json}
        [
            {
                  "value":
            },
            {
                 "id": 
            }
        ]
        ```
     * AddPage
        * method : POST
        * usage : /page/{header}
        * body : 
        ```{json}
        [
             {
                "page":
             },
             {
                "page":
             },
             ...
       ]
        ```
        * return : 
        ```{json}
        {
            "succeed" : []
            "fail" : []
        }
        ```
     * UpdatePageArticle
        * method : PUT
        * usage : /page/{header}
        * body : 
        ```{json}
        {
            "originPage": ,
            "newPage":
        }
        ```
        * return : 
        ```{json}
        {
            "succeed" : []
            "fail" : []
        }
        ```
     * DeletePage
        * method : DELETE
        * usage : /page/{header}
        * body : 
        ```{json}
        {
            "page":"11"
        }
        ```
        * return : 
        ```{json}
        {
            "succeed" : []
            "fail" : []
        }
        ```
