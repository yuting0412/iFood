function show() {
  document.getElementsByClassName('pill-dropdown-title').style.display = 'none';
}

$("#hslider").slider({
  min: 0,
  max: 3000,
  step: 100,
  range: true,
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

// $("#hsliderInput_L").change(function () {
//   var value = this.value.substring(1);
//   console.log(value);
//   $("#hslider").slider("value", parseInt(value));
// });
function dropdownStar(star) {
  for (var i = 0; i < star.length; i++) {
    let htmlStr = '<li class="checkbox keep-open dropdown-item"><label><input type="checkbox" id="';
    htmlStr += star[i]['CName'];
    htmlStr += '">&nbsp';
    htmlStr += star[i]['CName'];
    htmlStr += '星</label></li>';
    $('#star').append(htmlStr);
  }
}

function dropdownTown(town) {
  for (var i = 0; i < town.length; i++) {
    let htmlStr = '<li class="checkbox keep-open dropdown-item"><label><input type="checkbox" onclick="townCheck(this.id)" id="';
    htmlStr += town[i]['CName'];
    htmlStr += '">&nbsp';
    htmlStr += town[i]['CName'];
    htmlStr += '</label></li>';
    $('#town').append(htmlStr);
  }
}

function dropdownSpecial(special, name) { //其他需求
  let htmlStr = '<p class = "m-3">';
  htmlStr += name
  htmlStr += '</p><div class = "pl-4 pr-4 row">'
  for (var i = 0; i < special.length; i++) {
    htmlStr += '<label class="form-check-label col-4"><input class="form-check-input" type="checkbox" id="';
    htmlStr += special[i]['CName'];
    htmlStr += '">';
    htmlStr += special[i]['CName'];
    htmlStr += '</label>';
    if (i % 3 == 2) {
      htmlStr += '</li></div>';
      htmlStr += '<div class = "pl-4 pr-4 row">';
    }
  }
  htmlStr += '<hr>';
  $('#moreChoose').append(htmlStr);
}

// function setInputVal(id) {
//   $('#toGetScore').val(id);
//   $('#resultList').submit();
// }

// function _init(gotResult) {
//   for (let i = 0; i < gotResult.length; i++) {
//     let htmlStr = '<div class="row m-2"><div class="tbl-item col-md-4 btn btn-secondary" id="';
//     htmlStr += gotResult[i]._id;
//     htmlStr += '" onclick="setInputVal(id)">';
//     htmlStr += gotResult[i].author + ' - ' + gotResult[i].name;
//     htmlStr += '</div></div>';
//     $('#resultList').append(htmlStr);
//   }
// }