var page = 1; //在第幾頁
var pageResCount = 10; // 一頁有幾間餐廳
var allResResult; // 整個縣市的所有餐廳
var resResult; // 符合選項的選項的餐廳資料
var namePath; // 路徑
var allTownshipLen; // 整個縣市有多少鄉鎮市區
function getRes(allRes, allTownship){ //只有一開始會進來
  resResult = allRes;
  allResResult = allRes;
  namePath = allRes[0]['NamePath'].split("/"); // 放上面的 namePath
  reloadPage();
}

function reloadPage(){
  if (namePath.length == 3){
    resResult = JSON.parse(JSON.stringify(allResResult)); 
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
    if (resResult[(page-1)*pageResCount + i]['cuisine'] != "None" && resResult[(page-1)*pageResCount + i]['cuisine'] != null && resResult[(page-1)*pageResCount + i]['meal'] != "None" && resResult[(page-1)*pageResCount + i]['meal'] != null){
      htmlStr += `<div class="res-info-tag" id = "resCuisine`;
      htmlStr += ((page-1)*pageResCount + i);
      htmlStr += '">';
      if (resResult[(page-1)*pageResCount + i]['cuisine'] != "None" && resResult[(page-1)*pageResCount + i]['cuisine'] != null){
        htmlStr += resResult[(page-1)*pageResCount + i]['cuisine'];
      }else{
        htmlStr += resResult[(page-1)*pageResCount + i]['meal'];
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
  $('#res').html(htmlStr); //下面放頁碼
  pageStr = ` 
  <div class = "col-2 border text-center" id = "backPage" onclick="backPage()">上一頁</div>
  <div class = "col-1"></div>
  <div class = "col-1 border text-center" id="pageNum_1" onclick="goToPage(this.id)">1</div>` //第一頁頁碼
  var totalPage = Math.ceil(resResult.length/pageResCount);
  if (totalPage < 6){ // 小於 6 頁
    for (let i = 2; i < totalPage+1; i++){
      pageStr += `<div class = "col-1 border text-center" id="pageNum_`;
      pageStr += i;
      pageStr += `" onclick="goToPage(this.id)">`;
      pageStr += i;
      pageStr += `</div>`;
    }
    for (let i = totalPage+1; i < 7; i++){
      pageStr += '<div class = "col-1"></div>'
    }
  }else if (totalPage == 6){ // 如果等於 6 頁
    for (let i = 2; i < 7; i++){
      pageStr += `<div class = "col-1 border text-center" id="pageNum_`;
      pageStr += i;
      pageStr += `" onclick="goToPage(this.id)">`;
      pageStr += i;
      pageStr += `</div>`;
    }
  }else if (totalPage > 6){ // 超過 6 頁
    if (page <= 3){
      pageStr += `
      <div class = "col-1 border text-center" id="pageNum_2" onclick="goToPage(this.id)">2</div>
      <div class = "col-1 border text-center" id="pageNum_3" onclick="goToPage(this.id)">3</div>
      <div class = "col-1 border text-center" id="pageNum_4" onclick="goToPage(this.id)">4</div>
      <div class = "col-1 border text-center">...</div>`;
    }else if ((totalPage - page) > 3){
      pageStr += `<div class = "col-1 border text-center">...</div>`
      for (let i = page; i < page + 2; i++){
        pageStr += `<div class = "col-1 border text-center" id="pageNum_`;
        pageStr += i;
        pageStr += `" onclick="goToPage(this.id)">`;
        pageStr += i;
        pageStr += `</div>`;
      }
      pageStr += `<div class = "col-1 border text-center">...</div>`
    }else{
      pageStr += `<div class = "col-1 border text-center">...</div>`
      for (let i = totalPage-3; i < totalPage; i++){
        pageStr += `<div class = "col-1 border text-center" id="pageNum_`;
        pageStr += i;
        pageStr += `" onclick="goToPage(this.id)">`;
        pageStr += i;
        pageStr += `</div>`;
      }
    }
    pageStr += `<div class = "col-1 border text-center" id="pageNum_`; // 最後一頁頁碼
    pageStr += totalPage;
    pageStr += `" onclick="goToPage(this.id)">`;
    pageStr += totalPage;
  }
  pageStr += `
  </div>
  <div class = "col-1"></div>
  <div class = "col-2 border text-center" id = "nextPage" onclick="nextPage()">下一頁</div>
  </div>`
  $('#pageNum').html(pageStr);
  if (page == 1){ 
    $(`#backPage`).css("color", "Gainsboro");
  }
  if (page == totalPage){
    $(`#nextPage`).css("color", "Gainsboro");
  }
  $(`#pageNum_${page}`).css("background-color", "black"); // 更改頁碼顏色
  $(`#pageNum_${page}`).css("color", "white");
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

function townshipCheck(id) {
    $.ajax({
      method: 'GET',
      contentType: 'application/json',
      url: '/getTownshipRes',
      data: { method: 'getTownshipRes',cName : id},
      success: function (result) {
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
            for (let i = 0 ; i < result.length; i++){ // 把餐廳從 resResult 移除
              for (let j = 0 ; j < resResult.length; j++){
                if (result[i].resName == resResult[j].resName){
                  resResult.splice(j,1);
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
            resResult = JSON.parse(JSON.stringify(result)); 
          }else{
            for (let i = 0 ; i < result.length; i++){ // 餐廳加入 resResult
              resResult.push(result[i]);
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

function backPage(){ //前一頁
  if (page == 1){
    return;
  }
  page -= 1;
  reloadPage();
  for (let i = 0; i < 5; i++){
    $(`#pageNum_${i}`).css("background-color", "white");
    $(`#pageNum_${i}`).css("color", "black");
  }
  $(`#pageNum_${page}`).css("background-color", "black");
  $(`#pageNum_${page}`).css("color", "white");
}

function nextPage(){ //下一頁
  if (page == Math.ceil(resResult.length/pageResCount)){
    return;
  }
  page += 1;
  reloadPage();
  for (let i = 0; i < 5; i++){
    $(`#pageNum_${i}`).css("background-color", "white");
    $(`#pageNum_${i}`).css("color", "black");
  }
  $(`#pageNum_${page}`).css("background-color", "black");
  $(`#pageNum_${page}`).css("color", "white");
}

function goToPage(p){ //跳到某頁
  p = p.replace("pageNum_","");
  page = parseInt(p);
  reloadPage()
  for (let i = 0; i < 5; i++){
    $(`#pageNum_${i}`).css("background-color", "white");
    $(`#pageNum_${i}`).css("color", "black");
  }
  $(`#pageNum_${page}`).css("background-color", "black");
  $(`#pageNum_${page}`).css("color", "white");
}