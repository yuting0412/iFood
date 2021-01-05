var page = 1;
var pageResCount = 10;
var resResult; // 符合選項的選項的餐廳資料
$.ajax({ //進入頁面就自動執行
    method: 'GET',
    contentType: 'application/json',
    url: '/getCityRes',
    data: { method: 'getRes',cName : '埔里鎮'},
    success: function (result) {
      resResult = result
      reloadPage();
    }, error: function (result) {
      console.log(result);
    }
  })
function reloadPage(){
  let htmlStr = "";
  if (Object.keys(resResult).length - pageResCount*(page-1) > 10){
    pageRes = 10;
  }else{
    pageRes = Object.keys(resResult).length - pageResCount*(page-1);
  }
  console.log(pageRes);
  for (var i = 0; i < pageRes; i++){
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
  $('#res').html(htmlStr);
  pageStr = `
  <div class = "col-2 border text-center" id = "backPage" onclick="backPage()">上一頁</div>
  <div class = "col-1"></div>
  <div class = "col-1 border text-center" id="pageNum_1" onclick="goToPage(this.id)">1</div>` //第一頁頁碼
  var totalPage = Math.ceil(Object.keys(resResult).length/pageResCount);
  if (totalPage < 6){ // 如果少於 6 頁
    for (var i = 1; i < 7; i++){
      pageStr += `<div class = "col-1 border text-center" id="pageNum_`;
      pageStr += i;
      pageStr += `" onclick="goToPage(this.id)">`;
      pageStr += i;
      pageStr += `</div>`;
    }
  }else{
    if (page <= 3){
      pageStr += `
      <div class = "col-1 border text-center" id="pageNum_2" onclick="goToPage(this.id)">2</div>
      <div class = "col-1 border text-center" id="pageNum_3" onclick="goToPage(this.id)">3</div>
      <div class = "col-1 border text-center" id="pageNum_4" onclick="goToPage(this.id)">4</div>
      <div class = "col-1 border text-center">...</div>`;
    }else if ((totalPage - page) > 3){
      pageStr += `<div class = "col-1 border text-center">...</div>`
      for (var i = page; i < page + 2; i++){
        pageStr += `<div class = "col-1 border text-center" id="pageNum_`;
        pageStr += i;
        pageStr += `" onclick="goToPage(this.id)">`;
        pageStr += i;
        pageStr += `</div>`;
      }
      pageStr += `<div class = "col-1 border text-center">...</div>`
    }else{
      pageStr += `<div class = "col-1 border text-center">...</div>`
      for (var i = totalPage-3; i < totalPage; i++){
        pageStr += `<div class = "col-1 border text-center" id="pageNum_`;
        pageStr += i;
        pageStr += `" onclick="goToPage(this.id)">`;
        pageStr += i;
        pageStr += `</div>`;
      }
    }
  }
  pageStr += `<div class = "col-1 border text-center" id="pageNum_`; // 最後一頁頁碼
  pageStr += totalPage;
  pageStr += `" onclick="goToPage(this.id)">`;
  pageStr += totalPage;
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
  $(`#pageNum_${page}`).css("background-color", "black");
  $(`#pageNum_${page}`).css("color", "white");
}
function townCheck(id) {
    // console.log(id);
    $.ajax({
      method: 'GET',
      contentType: 'application/json',
      url: '/getCityRes',
      data: { method: 'getRes',cName : id},
      success: function (result) {
        console.log(resResult);
        console.log(result);
        Object.assign(resResult, result);
        console.log(resResult);
        page = 1;
        reloadPage();
      }, error: function (result) {
        console.log(result);
      }
    })
  }

function backPage(){
  if (page == 1){
    return;
  }
  page -= 1;
  reloadPage()
  for (var i = 0; i < 5; i++){
    $(`#pageNum_${i}`).css("background-color", "white");
    $(`#pageNum_${i}`).css("color", "black");
  }
  $(`#pageNum_${page}`).css("background-color", "black");
  $(`#pageNum_${page}`).css("color", "white");
}

function nextPage(){
  if (Math.ceil(Object.keys(resResult).length/pageResCount)){
    return;
  }
  page += 1;
  reloadPage()
  for (var i = 0; i < 5; i++){
    $(`#pageNum_${i}`).css("background-color", "white");
    $(`#pageNum_${i}`).css("color", "black");
  }
  $(`#pageNum_${page}`).css("background-color", "black");
  $(`#pageNum_${page}`).css("color", "white");
}

function goToPage(p){
  p = p.replace("pageNum_","");
  page = parseInt(p);
  reloadPage()
  for (var i = 0; i < 5; i++){
    $(`#pageNum_${i}`).css("background-color", "white");
    $(`#pageNum_${i}`).css("color", "black");
  }
  $(`#pageNum_${page}`).css("background-color", "black");
  $(`#pageNum_${page}`).css("color", "white");
}