/* from: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url */
function is_valid_url(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}

var url_error = false;
var alias_error = false;
var urlbase = "";

$(document).ready(function() {
  /* url form validation */
  $("#inp-url").focusout(function() {
    var chkval = $(this).val();
    if (is_valid_url(chkval)) {
      url_error = false;
      $("#inp-url").removeClass("inp-error");
      $("#inp-url-error").css("visibility", "hidden");
    } else {
      url_error = true;
      $("#inp-url").addClass("inp-error");
      $("#inp-url-error").css("visibility", "visible");
    }
  });

  /* alias form validation exists */
  $("#inp-alias").focusout(function() {
    var chkval = $(this).val();
    if (chkval) {
      $.ajax({
        url: "/admin/api/check/" + chkval,
        dataType: "json",
        success: function(result) {
          if (result.status == "exists") {
            alias_error = true;
            $("#inp-alias").addClass("inp-error");
            $("#inp-alias-error").css("visibility", "visible");
          } else {
            alias_error = false;
            $("#inp-alias").removeClass("inp-error");
            $("#inp-alias-error").css("visibility", "hidden");
          }
        }
      });
    } else {
      alias_error = false;
      $("#inp-alias").removeClass("inp-error");
      $("#inp-alias-error").css("visibility", "hidden");
    }
  });

  /* create */
  $("#btn-create").click(function() {
    $("#inp-url").trigger("focusout");
    $("#inp-alias").trigger("focusout");
    if (url_error || alias_error) {
      console.log("Input validation error");
      return;
    }
    var req_json = {
      url: $("#inp-url").val(),
      alias: $("#inp-alias").val(),
      exp_date: $("#inp-exp").val()
    };
    $.ajax({
      url: "/admin/api/new/",
      data: req_json,
      dataType: "json",
      type: "POST",
      success: function(result) {
        var url = location.origin + "/";
        if (result.alias) {
          url += result.alias;
        } else {
          url += result.uuid;
        }

        $("#shorturl").val(url);
        $("#ok-msg").show();

        // emptly input fields
        $("#inp-url").val("");
        $("#inp-alias").val("");
        $("#inp-exp").val("");
      }
    });
  });
});
