function show() {
    document.getElementsByClassName('pill-dropdown-title').style.display = 'none';
}



$("#hslider").slider({
  min: 0,
  max: 100,
  range: true,
  values: [20, 80],
  create: function(e, ui) {
    var style={"width":"20px","text-align":"center"};
    $(this).find(".ui-slider-handle").css(style);
    },
  slide: function(e, ui) {
    $("#hslider_value_L").html(ui.values[0]);
    $("#hslider_value_H").html(ui.values[1]);
    $(this).find(".ui-state-focus").html(ui.value);
    }
  });
