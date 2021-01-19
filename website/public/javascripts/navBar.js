$("#hslider").slider({
  min: 0,
  max: 3000,
  step: 100,
  range: true, //變成兩個
  values: [500, 2000],
  create: function (e, ui) { //滑桿元件建立時觸發
    var style = { "width": "15px", "text-align": "center" }; //
    $(this).find(".ui-slider-handle").css(style);
  },
  slide: function (event, ui) {
    $("#hsliderInput_L").val(ui.values[0]);
    $("#hsliderInput_H").val(ui.values[1]);
  },
});

$("#hsliderInput_L").change(function () {
  var value = this.value;
  // $("#hslider").slider("values", $(this).val());
});

function dropdownStar(star) { // star
  for (let i = 0; i < star.length; i++) {
    let htmlStr = '<li class="checkbox keep-open dropdown-item"><label><input type="checkbox" id="';
    htmlStr += star[i]['CName'];
    htmlStr += '">&nbsp';
    htmlStr += star[i]['CName'];
    htmlStr += '星</label></li>';
    $('#star').append(htmlStr);
  }
}

function dropdownTown(town) { // 鄉鎮市區
  let htmlStr = `<div class = "row cleanAll"><label class="col-6 pr-1 pl-3">鄉鎮市區</label>
            <botton class="col text-primary text-right cleanAll" type="botton" onclick="cleanAll(this)">清除全部</botton></div>`;
  $('#town').append(htmlStr);
  for (let i = 0; i < town.length; i++) {
    let htmlStr ='<label class="col"><input type="checkbox" onchange="townshipCheck(this.id)" id="';
    htmlStr += town[i]['CName'];
    htmlStr += '">&nbsp';
    htmlStr += town[i]['CName'];
    htmlStr += '</label>';
    $('#town').append(htmlStr);
  }
}

function dropdownSpecial(special, name) { //顯示全部
  let htmlStr = "";
  htmlStr += '<div id = "';
  htmlStr += name;
  htmlStr += '"><div class = "mt-2 mb-1 row"><label class="col-6 pr-1 pl-3">';
  htmlStr += name;
  htmlStr += '</label><botton class="col text-primary text-right cleanAll" type="botton" onclick="cleanAll(this)">清除全部</botton></div>';
  htmlStr += '<div class = "pl-4 pr-4 row">'
  for (let i = 0; i < special.length; i++) {
    htmlStr += '<label class="form-check-label col-4"><input class="form-check-input" type="checkbox" onchange="specialCheck(this.id)" id="';
    htmlStr += special[i]['CName'];
    htmlStr += '">';
    htmlStr += special[i]['CName'];
    htmlStr += '</label>';
    if (i % 3 == 2 || i == special.length-1) { //3個滿了要換行 或是 剛好最後一個
      htmlStr += '</div>';
      if (i != special.length-1){
        htmlStr += '<div class = "pl-4 pr-4 row">';
      }
    }
  }
  htmlStr += '<hr></div>'; 
  $('#moreChoose').append(htmlStr);
}

function cleanAll(my){ // 清除全部
  let parentId = my.parentNode.parentNode.id;
  if (parentId == "town"){
    $(`#${parentId}`).children().children(':checkbox').each(function(){
      $(this).prop("checked",false);//把所有的核方框的 property 都取消勾選
      townshipCheck($(this).attr('id')); // 找到 checkbox 的 id (鄉鎮市區), 然後移除餐廳
     })
  }else{
    $(`#${parentId}`).children().children().children(':checkbox').each(function(){
      $(this).prop("checked",false);//把所有的核方框的 property 都取消勾選
      specialCheck($(this).attr('id')); // 找到 checkbox 的 id (鄉鎮市區), 然後移除餐廳
     })
  }
}