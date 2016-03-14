$(document).ready(function() {


  $("#allPinsButton").css({"background-color": "white", "color": "#000000", "border-radius": "25px"});
  $("#myPinsButton").css({"background-color": "", "color": "", "border-radius": ""});
  $("#allPins").show();
  $("#myPins").hide();
  $("#userPins").hide();



  $("#allPinsButton").on("click", function(){

    // download pins from server
    $.ajax({
      url: 'pinhead.php',
      type: 'POST',
      dataType: 'json',
      data: ({func: "getAllPins" }),
      success: function(data){
        // output to html
        var html = '';
        html += '        <div class="grid">';
        html += '          <div class="grid-sizer"></div>';

        for (var i = 0; i < data.length; i++) {
          html += '            <div class="grid-item">';
          html += '              <a href="' + data[i].pin_url + '" target="_blank"><img src="' + data[i].pin_url + '" class="child1" /></a>';
          html += '              <div class="main_text">' + data[i].pin_title + '</div>';
          html += '              <div class="main_text usery">' + data[i].user_id + '</div>';
          html += '            </div>';
        }

        html += '</div>';


        $("#allPinsButton").css({"background-color": "white", "color": "#000000", "border-radius": "25px"});
        $("#myPinsButton").css({"background-color": "", "color": "", "border-radius": ""});
        $("#allPins").show();
        $("#allPinsHtml").html(html);
        $("#myPins").hide();
        $("#userPins").hide();
        $(".child2").hide();

        $("img").error(function () {

          $(this).unbind("error").attr("src", "no_image.jpg");

          var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer'
          });

          $grid.imagesLoaded().progress( function() {
            $grid.masonry();
          });

        });


        var $grid = $('.grid').masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: '.grid-sizer'
        });

        $grid.imagesLoaded().progress( function() {
          $grid.masonry();
        });



        $('.usery').on('click', function() {
          var user_id = this.innerHTML;
          runUserPins(user_id);
        });
      }
    });
  });


  $("#myPinsButton").on("click", function(){

    $.ajax({
      url: 'pinhead.php',
      type: 'POST',
      dataType: 'json',
      data: ({func: "getMyPins" }),
      success: function(data){
        // output to html
        var html = '';
        if (document.cookie.indexOf("ezchxPinHead") >= 0) {
          html += '        <div class="row">';
          html += '          <div class="col-md-12 centery">';
          html += '            <input id="newPinTitle" class="updateBox" placeholder="enter title..."><input id="newPinUrl" class="updateBox" placeholder="enter url..."><button type="button" id="addPin" class="btn-xsm btn-primary">Add Pin</button>';
          html += '          </div>';
          html += '        </div>';
        }

        html += '        <div class="grid">';
        html += '          <div class="grid-sizer"></div>';
        for (var i = 0; i < data.length; i++) {
          html += '            <div class="grid-item parent">';
          html += '              <a href="' + data[i].pin_url + '" target="_blank"><img src="' + data[i].pin_url + '" class="child1" id="pix_' + data[i].pin_id + '" /></a>';
          html += '              <img src="red_x.png" class="child2 delPin" id="' + data[i].pin_id + '" />';
          html += '              <div class="main_text">' + data[i].pin_title + '</div>';
          html += '            </div>';
        }
        html += '        </div>';
        $("#allPinsButton").css({"background-color": "", "color": "", "border-radius": ""});
        $("#myPinsButton").css({"background-color": "white", "color": "#000000", "border-radius": "25px"});

        $("#errorMsg").html('&nbsp;');
        $("#newPinTitle").val('');
        $("#newPinUrl").val('');
        $("#allPins").hide();
        $("#userPins").hide();
        $("#myPins").show();
        $("#pinsHtml").html(html);

        $("img").error(function () {
          $(this).unbind("error").attr("src", "no_image.jpg");
        });


        var $grid = $('.grid').masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: '.grid-sizer'
        });

        $grid.imagesLoaded().progress( function() {
          $grid.masonry();
        });


        for (var j = 0; j < data.length; j++) {

          var dodo1 = "#pix_" + data[j].pin_id;
          var dodo2 = "#" + data[j].pin_id;

          $(dodo2).hide();

          $(dodo1).mouseover((function(dodo2) {
              return function() {
              $(dodo2).show();
            };
          })(dodo2));

          $(dodo2).mouseover((function(dodo2) {
              return function() {
              $(dodo2).show();
            };
          })(dodo2));

          $(dodo1).mouseout((function(dodo2) {
              return function() {
              $(dodo2).hide();
            };
          })(dodo2));

        };


        $('.delPin').on('click', function() {
          var pin_id = this.id;
          $.ajax({
            url: 'pinhead.php',
            type: 'POST',
            dataType: 'json',
            data: ({func: "deletePin",
              pin_id: pin_id }),
            success: function(data){
              $("#myPinsButton").trigger("click");
            }
          });
        });


        $('#addPin').on('click', function() {
          //$("#debug").html('hi');
          $("#errorMsg").html('&nbsp;');
          var newPinTitle = $("#newPinTitle").val();
          var newPinUrl = $("#newPinUrl").val();
          $.ajax({
            url: 'pinhead.php',
            type: 'POST',
            dataType: 'json',
            data: ({func: "addPin",
              newPinTitle: newPinTitle,
              newPinUrl: newPinUrl }),
              success: function(data){
                $("#myPinsButton").trigger("click");
            }
          });
        });
      }
    });
  });


  function runUserPins(user_id) {

    $.ajax({
      url: 'pinhead.php',
      type: 'POST',
      dataType: 'json',
      data: ({func: "getUserPins",
        user_id: user_id }),
      success: function(data){
        // output to html
        var html = '';
        html += '        <div class="grid">';
        html += '          <div class="grid-sizer"></div>';

        for (var i = 0; i < data.length; i++) {
          html += '            <div class="grid-item">';
          html += '              <a href="' + data[i].pin_url + '" target="_blank"><img src="' + data[i].pin_url + '" class="child1" /></a>';
          html += '              <div class="main_text">' + data[i].pin_title + '</div>';
          html += '            </div>';
        }

        html += '</div>';


        $("#allPinsButton").css({"background-color": "", "color": "", "border-radius": ""});
        $("#myPinsButton").css({"background-color": "", "color": "", "border-radius": ""});
        $("#allPins").hide();
        $("#myPins").hide();
        $("#userPins").show();
        $("#userPinsHtml").html(html);
        $("#userTitle").html(data[0].user_id + " Pins");

        $("img").error(function () {
          $(this).unbind("error").attr("src", "no_image.jpg");
        });

        var $grid = $('.grid').masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: '.grid-sizer'
        });

        $grid.imagesLoaded().progress( function() {
          $grid.masonry();
        });

      }
    });

  }




  if (document.cookie.indexOf("ezchxPinHead") >= 0) {
    $("#loginButton").html('<button type="button" id="logoutButton" class="btn-sm btn-danger">Logout</button>');
    $("#myPinsButton").show();
  } else {
    $("#myPinsButton").hide();
  }

  $('#logoutButton').on('click', function() {
    document.cookie = "ezchxPinHead=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    $("#loginButton").html('<a href="login.php?login=yes"><img src="http://ezchx.com/twitteroauth/sign-in-with-twitter-gray.png" /></a>');
    $("#myPinsButton").hide();
    $("#allPinsButton").trigger("click");
  });

  $("#allPinsButton").trigger("click");

  
});