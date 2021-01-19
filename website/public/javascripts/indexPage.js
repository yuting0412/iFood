function pageNum(){ //頁面下面的頁碼
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