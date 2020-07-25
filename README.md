# 餐廳清單
使用Node.js、Express、Handlebars製作的餐廳清單頁面，可管理專屬於自己的餐廳清單。

## 網站功能
- 點選餐廳可以查看餐廳的電話、地址、敘述等詳細資料。
- 點選地址標示會連到該間餐廳的google地圖。
- 可以用名稱搜尋想找的餐廳。
- 點擊我的餐單清單可以回到首頁。
- 可以新增餐廳。
- 可以修改餐廳資訊。
- 可以刪除不要的餐廳。

## 專案畫面
![image](https://github.com/jolinhappy/restaurant_list_new/blob/master/project_screenshot.png)

## 安裝步驟
1.開啟終端機，並clone此專案。
<br>```git clone https://github.com/jolinhappy/restaurant_list_new.git```

2.進入專案資料。
<br>```cd new_restaurant_list```

3.在進入專案資料夾的狀態下安裝npm
<br>```npm install```

4.安裝nodemon
<br>```npm install nodemon```

5.啟動程式
<br>```npm run dev```
<br>*成功啟動後，終端機會顯示 Express is listening on localhost:3000

6.連結專案網址
<br>在瀏覽器上輸入 localhost:3000 進入專案網頁

## 環境建置與需求
- Node.js: v10.15.0
- Express: v4.17.1
- Express-Handlebars: v5.1.0
- Body-parser: v1.19.0
- mongoose: v5.9.25
