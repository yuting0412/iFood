var page = 1; //在第幾頁
var pageResCount = 10; // 一頁有幾間餐廳
var allResResult; // 整個縣市的所有餐廳
var resResult; // 符合選項的餐廳資料
var townResult; // 符合鄉鎮市區的餐廳
var specialResult; //符合特殊需求的餐廳
var specialChoose; // 全部的特殊需求
var namePath; // 路徑
var allTownshipLen; // 整個縣市有多少鄉鎮市區
function getRes(allRes, allTownship){ //只有一開始會進來
  townResult = allRes;
  allResResult = allRes;
  namePath = allRes[0]['NamePath'].split("/"); // 放上面的 namePath
  specialResult = [];
  specialChoose = [];
  reloadPage();
}

function reloadPage(){
  if (namePath.length == 3){
    townResult = JSON.parse(JSON.stringify(allResResult)); 
  }
  if (specialChoose.length > 0){
    resResult = resAndSpecial();
  }else{
    resResult = townResult;
  }
  reloadNamePath();
  htmlStr = ""; // 放餐廳
  if (resResult.length - pageResCount*(page-1) > 10){
    pageRes = 10;
  }else{
    pageRes = resResult.length - pageResCount*(page-1);
  }
  for (let i = 0; i < pageRes; i++){
    htmlStr +=`
    <div class="command-item">
    <div class="left-comment-item-content">
      <div class="photo-block">
        <img src="/images/exRes/exRes.jpg" class="main-photo">
        <div class="other-photo-block">
          <img src="/images/exRes/exRes(2).png" class="other-photo">
          <img src="/images/exRes/exRes(3).png" class="other-photo">
          <img src="/images/exRes/exRes(4).png" class="other-photo">
          <img src="/images/exRes/exRes(5).png" class="other-photo">
        </div>
      </div>
      <div class="res-info">
        <div class="res-info-text" id = "resName`;
    htmlStr += ((page-1)*pageResCount + i);
    htmlStr += '">';
    htmlStr += ((page-1)*pageResCount + i + 1);
    htmlStr += ". "
    htmlStr += resResult[(page-1)*pageResCount + i]['resName'];
    htmlStr += `
    </div>
    <img src="/images/exRes/star.png" class="res-info-star">`;
    if (resResult[(page-1)*pageResCount + i]['cuisine'] != "None" || resResult[(page-1)*pageResCount + i]['meal'] != "None" || resResult[(page-1)*pageResCount + i]['style'] != "None"){
      htmlStr += `<div class="res-info-tag" id = "resCuisine`;
      htmlStr += ((page-1)*pageResCount + i);
      htmlStr += '">';
      if (resResult[(page-1)*pageResCount + i]['cuisine'] != "None"){
        htmlStr += resResult[(page-1)*pageResCount + i]['cuisine'];
      }if (resResult[(page-1)*pageResCount + i]['meal'] != "None"){
        htmlStr += resResult[(page-1)*pageResCount + i]['meal'];
      }if (resResult[(page-1)*pageResCount + i]['style'] != "None"){
        htmlStr += resResult[(page-1)*pageResCount + i]['style'];
      }
      htmlStr += `</div>`;
    }
    htmlStr += `
    <div class="res-info-addr-block">
      <img src="/images/addr2.png" class="res-info-addr">
      <div class="res-info-addr-text" id = "resAddr`;
    htmlStr += ((page-1)*pageResCount + i);
    htmlStr += '">';
    htmlStr += resResult[(page-1)*pageResCount + i]['addr'];
    htmlStr += `
    </div>
    </div>`
    if (resResult[(page-1)*pageResCount + i]['stayTime'] != 'None'){ // 停留時間
      htmlStr += `
          <div class="stay-time-block">
            <img src="/images/time.png" class="res-info-time">
              <div class="stay-time-text">訪客通常會在此停留 `;
      htmlStr += resResult[(page-1)*pageResCount + i]['stayTime'];
      htmlStr += `
          </div>
          </div>`;
    }
    htmlStr += `
    <div class="history-text-block">
      <div>過去1天內有26個人瀏覽</div>
      <div>20個人推薦❤</div>
    </div>
  </div>
</div>
<div class="right-comment-item-content">
  <div class="num-tag-block">
    <img src="/images/numTag.png" class="num-tag">
    <div class="num-text" id = "resScore">4.0`;
    // htmlStr += ((page-1)*pageResCount + i);
    // htmlStr += '">';
    // htmlStr += resResult[(page-1)*pageResCount + i]['score'];
    htmlStr += `
    </div>
    </div>
    <div class="comment-block" id = "resComment`;
    htmlStr += ((page-1)*pageResCount + i);
    htmlStr += '"><div>20則評論';
    // htmlStr += `
    // ">
    // <div>很讚</div>
    // <div>`;
    // htmlStr += resResult[(page-1)*pageResCount + i]['comment'];
    htmlStr += `
    </div>
      </div>
      <div class="time-tag">
        <div class="discount-block">
          <div class="discount-block-text">優惠方案</div>
        </div>
        <div class="bustime-block">
          <div class="bustime-block-text">營業中</div>
        </div>
      </div>
      <div class="cost-block">
        <div class="cost-text">平均消費金額</div>
        <div class="cost-text-num">NT $150</div>
      </div>
    </div>
  </div>`;
  }
  $('#res').html(htmlStr);
  pageNum(); // 放頁碼
}

function reloadNamePath(){ //上面那行 namePath
  let htmlStr = "";
  for (let i = 0; i < 2; i++){
    htmlStr += namePath[i];
    htmlStr += " > ";
  }
  htmlStr += namePath[2];
  if (namePath.length == 3){ //沒有選任何地區
    htmlStr += " > ";
    htmlStr += "全部鄉鎮市區";
  }else if (namePath.length > 3){
    htmlStr += " > ";
    for (let i = 3; i < namePath.length - 1; i++){
      htmlStr += namePath[i];
      htmlStr += ", ";
    }
    htmlStr += namePath[namePath.length -1];
  }
  htmlStr += " (";
  htmlStr += resResult.length;
  htmlStr += ")"
  $('#namePath').html(htmlStr);
}

function resAndSpecial(){
  var ansRes = [];
  for (let i = 0 ; i < specialResult.length; i++){ // 檢查餐廳是否已經存在
    let flag = 0;
    for (let j = 0 ; j < townResult.length; j++){ 
      if (specialResult[i].resName == townResult[j].resName){
        flag = 1;
        break;
      }
    }
    if (flag == 1){
      ansRes.push(specialResult[i]);
    }
  }
  return ansRes;
}

function townshipCheck(id) {
    $.ajax({
      method: 'GET',
      contentType: 'application/json',
      url: '/getTownshipRes',
      data: { method: 'getTownshipRes',cName : id},
      success: function (result) { //result : 符合目前改變狀態條件的餐廳
        if ($(`#${id}`).prop("checked") == false){ // 如果沒 check
          let count = 0;
          $('#town').children().children(':checkbox').each(function(){
            if ($(this).prop("checked") == true){ //先檢查有幾個被勾起來
              count++;
            }
          });
          if (count == 0){ // 如果全部都沒被選
            namePath.splice(3);
          }else{
            for (let i = 0; i < namePath.length; i++){ // 就把這個鄉鎮市區從 namePath 移除
              if (namePath[i] == id){
                namePath.splice(i,1);
              }
            }
            for (let i = 0 ; i < result.length; i++){ // 把餐廳從 townResult 移除
              for (let j = 0 ; j < townResult.length; j++){
                if (result[i].resName == townResult[j].resName){
                  townResult.splice(j,1);
                  break;
                }
              }
            }
          }
        }else{ // 如果有 check
          let count = 0;
          let id = "";
          $('#town').children().children(':checkbox').each(function(){
            if ($(this).prop("checked") == true){ //先檢查有幾個被勾起來
              id = $(this).attr('id')
              count++;
            }
           })
          if (count == 1){ //如果只有一個
            namePath.splice(3);
            townResult = JSON.parse(JSON.stringify(result)); 
          }else{
            for (let i = 0 ; i < result.length; i++){ // 餐廳加入 townResult
              townResult.push(result[i]);
            }
          }
          namePath.push(id); // 加入namePath
        }
        page = 1;
        reloadPage();
      }, error: function (result) {
        console.log(result);
      }
    })
  }

function specialCheck(id){
  $.ajax({
    method: 'GET',
    contentType: 'application/json',
    url: '/getTownshipRes',
    data: { method: 'getTownshipRes',cName : id},
    success: function (result) { //result : 符合目前改變狀態條件的餐廳
      if ($(`#${id}`).prop("checked") == false){ // 如果沒 check
        for (let i = 0; i < specialChoose.length; i++){ // 從 specialChoose 移除
          if (specialChoose[i] == id){
            specialChoose.splice(i,1);
          }
        }
        for (let i = 0; i < specialResult.length; i++){ //目前全部符合其他要求的餐廳
          if (specialResult[i].meal.includes(id) || specialResult[i].cuisine.includes(id) || specialResult[i].style.includes(id)){ // 如果有包含取消的id
            let flag = 0;
            for (let j = 0; j < specialChoose.length; j++){
              // 如果包含其他選項
              if ( specialResult[i].meal.includes(specialChoose[j]) || specialResult[i].cuisine.includes(specialChoose[j]) || specialResult[i].style.includes(specialChoose[j])){
                flag = 1;
                break;
              }
            }
            if (flag == 0){ // 只有要移除的id
              specialResult.splice(i,1);
              i-=1; //前一個刪掉了 要往回一個
            }
          }
        }
      }else{ // 如果有 check
        specialChoose.push(id);
        for (let i = 0 ; i < result.length; i++){ // 檢查餐廳是否已經存在
          let flag = 0;
          for (let j = 0 ; j < specialResult.length; j++){ 
            if (result[i].resName == specialResult[j].resName){
              flag = 1;
              break;
            }
          }
          if (flag == 0){
            specialResult.push(result[i]);
          }
        }
      }
      console.log(specialChoose);
      page = 1;
      reloadPage();
    }, error: function (result) {
      console.log(result);
    }
  })
}
