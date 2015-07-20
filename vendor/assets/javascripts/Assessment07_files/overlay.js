$(document).ready(function(){
  html = '<div id="overlay">';
  html += '<select>';
  html += '<option>No Overlay</option>';
  html += '<option>Outline</option>';
  html += '<option>Annotated</option>';
  html += '<option>Final</option>';
  html += '</select>';
  html += '</div>';
  html += '<ul id="overlay-image">';
  html += '<li></li>';
  html += '<li></li>';
  html += '<li></li>';
  html += '<li></li>';
  html += '</ul>';

  $("body").append(html);

  var overlay = $("#overlay");
  var select = overlay.find("select");
  var ul = $("#overlay-image");

  overlay.css({
    "position": "fixed",
    "top": "5px",
    "left": "5px",
    "z-index": "1000",
    "margin": "0",
    "padding": "0",
    "width": "auto",
    "height": "auto"
  });

  select.css({
    "font-size": "10px"
  });

  ul.css({
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "min-width": "900px",
    "z-index": "900",
    "margin": "0",
    "padding": "0",
    "height": "auto",
    "list-style": "none"
  });

  ul.find("li").css({
    "display": "none",
    "width": "100%",
    "min-width": "900px",
    "height": "1300px",
    "background-repeat": "no-repeat",
    "background-position": "top center",
    "margin": "0",
    "padding": "0"
  });

  ul.find("li").eq(0).css({
    "height": "0"
  });

  ul.find("li").eq(1).css({
    "background-image": "url('design/design-outline.png')"
  });

  ul.find("li").eq(2).css({
    "background-image": "url('design/design-annotated.png')"
  });

  ul.find("li").eq(3).css({
    "background-image": "url('design/design-final.png')"
  });

  select.on("change", function(event){
    var i = $(this).find("option:selected").index();
    ul.find("li").hide();
    ul.find("li").eq(i).show();
  });
});
