var rebind_items = function() {
  $("span.item-delete").click(function() {
    var yes = confirm("really delete this item?");
    if (yes) {
      var id = $(this)
        .parent()
        .parent()
        .find(".id")
        .html();
      $.ajax({
        url: "/admin/api/delete/",
        data: { item_id: id },
        dataType: "json",
        type: "POST",
        success: function(result) {
          console.log(result);
          reload_items();
        }
      });
    }
  });
};

var reload_items = function() {
  $.ajax({
    url: "/admin/api/list",
    dataType: "json",
    success: function(result) {
      $("#itemlist").html(
        ejs.render($("#item-tpl-listitem").html(), {
          items: result,
          urlbase: location.origin + "/"
        })
      );
      rebind_items();
    }
  });
};

$(document).ready(function() {
  reload_items();
  // auto refresh site every 10 secs
  setInterval(function() {
    reload_items();
  }, 10000);
});
