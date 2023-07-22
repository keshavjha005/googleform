/**
 * @author Apalis
 * @version 0.9
 */

new BlurredBackground();

function BlurredBackground() {
  var baseColor = "#3264c8";
  var color1 = "";
  var color2 = "";
  var color3 = "";

  $(function constructor() {
    $('#generator').center();

    $("#blurredBackground").css("filter", "blur(" + $("#blur_amount").val() + "px)");
    $("#blurredBackground").css("-webkit-filter", "blur(" + $("#blur_amount").val() + "px)");

    $('body').wrapInner('<div id="contentContainer"></div>')
      .prepend('<div id="blurredBackgroundContainer"></div>');

    $('#blurredBackgroundContainer').prepend('<div id="blurredBackground"></div>');

    $('#blurredBackground').append('<div class="colorBlur1 color-blur"></div>')
      .append('<div class="colorBlur2 color-blur"></div>')
      .append('<div class="colorBlur3 color-blur"></div>');

    randomise();
    eventHandlers();
    generateScript();

  });

  jQuery.fn.gradient = function(color1, gradientType, alpha) {
    this.css('background', color1);

    var gradientProperties = (gradientType == "linear") ? Math.floor((Math.random() * 100) + 1) + "deg, " : "at 50% 50%, ";

    var W3C = gradientType + "-gradient(" + gradientProperties + color1 + " 0%, " + shader(color1, Math.floor((Math.random() * 100) + 1), alpha) + " 100%)";

    this.css('background', W3C);

    return this;
  };

  jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
      $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
      $(window).scrollLeft()) + "px");
    return this;
  };

  function randomise() {
    baseColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    color1 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    color2 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    color3 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    setCSS();
  }

  function setCSS() {
    var min = -100;
    var max = 100;

    $('.baseColorBox').css('background-color', baseColor);
    $('.color1Box').css('background-color', color1);
    $('.color2Box').css('background-color', color2);
    $('.color3Box').css('background-color', color3);

    $('#blurredBackground').gradient(baseColor, "linear", 1);

    $('.colorBlur1').css({
      "top": Math.floor(Math.random() * (max - min + 1) + min) + "%",
      "left": Math.floor(Math.random() * (max - min + 1) + min) + "%"
    }).gradient(color1, "radial", Math.floor((Math.random() * 2) + 1), 0.5);

    $('.colorBlur2').css({
      "top": Math.floor(Math.random() * (max - min + 1) + min) + "%",
      "left": Math.floor(Math.random() * (max - min + 1) + min) + "%"

    }).gradient(shader(color2, Math.floor(Math.random() * (30 - (-30) + 1) + (-30)), 0.4), "radial", Math.floor((Math.random() * 2) + 1), 0.7);

    $('.colorBlur3').css({
      "top": Math.floor(Math.random() * (max - min + 1) + min) + "%",
      "left": Math.floor(Math.random() * (max - min + 1) + min) + "%"
    }).gradient(shader(color3, Math.floor(Math.random() * (30 - (-30) + 1) + (-30)), 0.4), "radial", Math.floor((Math.random() * 2) + 1), 0.7);
  }

  function shader(color, percentage, alpha, toHex) {
    color = color.substring(0, 1) != "#" ? "#" : "" + color;
    color = color.length == 4 ? "#" + color.substring(1, 2) + color.substring(1, 2) + color.substring(2, 3) + color.substring(2, 3) + color.substring(3, 4) + color.substring(3, 4) : color;

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    if (percentage > 0) {
      R = R + (R * (percentage / 100)) > 255 ? 255 : R + (R * (percentage / 100));
      G = G + (G * (percentage / 100)) > 255 ? 255 : G + (G * (percentage / 100));
      B = B + (B * (percentage / 100)) > 255 ? 255 : B + (B * (percentage / 100));
    } else {
      R = R + (R * (percentage / 100)) < 0 ? 0 : R + (R * (percentage / 100));
      G = G + (G * (percentage / 100)) < 0 ? 0 : G + (G * (percentage / 100));
      B = B + (B * (percentage / 100)) < 0 ? 0 : B + (B * (percentage / 100));
    }

    function changeToHex(decimal) {
      var hex = parseInt(decimal, 10).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    if (toHex) {
      return "#" + changeToHex(R) + changeToHex(G) + changeToHex(B);
    } else {
      return "rgba(" + Math.round(R) + "," + Math.round(G) + "," + Math.round(B) + "," + alpha + ")";
    }
  }

  function eventHandlers() {
    $('.baseColorBox').colpick({
      colorScheme: 'dark',
      layout: 'rgbhex',
      color: baseColor,
      onChange: function(hsb, hex, rgb, el) {
        baseColor = '#' + hex;
        $(el).css('background-color', baseColor);
        setCSS();
      },
      onSubmit: function(hsb, hex, rgb, el) {
        baseColor = '#' + hex;
        $(el).css('background-color', baseColor);
        setCSS();
        $(el).colpickHide();
      }
    });

    $('.color1Box').colpick({
      colorScheme: 'dark',
      layout: 'rgbhex',
      color: color1,
      onChange: function(hsb, hex, rgb, el) {
        color1 = '#' + hex;
        $(el).css('background-color', color1);
        setCSS();
      },
      onSubmit: function(hsb, hex, rgb, el) {
        color1 = '#' + hex;
        $(el).css('background-color', color1);
        setCSS();
        $(el).colpickHide();
      }
    });

    $('.color2Box').colpick({
      colorScheme: 'dark',
      layout: 'rgbhex',
      color: color2,
      onChange: function(hsb, hex, rgb, el) {
        color2 = '#' + hex;
        $(el).css('background-color', color2);
        setCSS();
      },
      onSubmit: function(hsb, hex, rgb, el) {
        color2 = '#' + hex;
        $(el).css('background-color', color2);
        setCSS();
        $(el).colpickHide();
      }
    });

    $('.color3Box').colpick({
      colorScheme: 'dark',
      layout: 'rgbhex',
      color: color3,
      onChange: function(hsb, hex, rgb, el) {
        color3 = '#' + hex;
        $(el).css('background-color', color3);
        setCSS();
      },
      onSubmit: function(hsb, hex, rgb, el) {
        color3 = '#' + hex;
        $(el).css('background-color', color3);
        setCSS();
        $(el).colpickHide();
      }
    });

    $("#refresh").click(function(evt) {
      setCSS();
      generateScript();
    });

    $("#randomise").click(function(evt) {
      randomise();
      generateScript();
    });

    $("#blur_amount").change(function(evt) {
      console.log($(this).val());
      $("#blurredBackground").css("filter", "blur(" + $(this).val() + "px)");
      $("#blurredBackground").css("-webkit-filter", "blur(" + $(this).val() + "px)");

      generateScript();
    });

    $('#copy_code').on('click', function(event) {
      var textarea = $('#codeOutput');
      textarea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Unfortunately the copy process was unsuccessful.');
      }
    });
  }

  function generateScript() {
    var generatedScript;
    $.get("css/backgroundStyles.css", function(data) {
      console.log(JSON.stringify(data));
    });

    generatedScript = '<style type="text/css">' + "\n";

    generatedScript += "#blurredBackgroundContainer{position:absolute;top:0;left:0;width:100%;height:100%;display:block;overflow:hidden}#blurredBackground{position:absolute;top:-5%;left:-5%;display:block;min-width:110%;min-height:110%;filter:blur(" + $('#blur_amount').val() + "px);-webkit-filter:blur(" + $('#blur_amount').val() + "px)}#contentContainer{position:absolute;top:0;left:0;width:100%;height:100%;display:block;overflow:scroll}.color-blur{width:200%;height:150%;display:block;position:absolute;border-radius:50%}" + "\n";

    generatedScript +=
      '</style>' +
      '\n' +
      '<script type="text/javascript">' + "\n" +
      '   window.onload = function(){' + "\n" +
      '      var contentContainer = document.createElement("div");' + "\n" +
      '      var blurredBackgroundContainer = document.createElement("div");' + "\n" +
      '      var blurredBackground = document.createElement("div");' + "\n" +
      '      var colorBlur1 = document.createElement("div");' + "\n" +
      '      var colorBlur2 = document.createElement("div");' + "\n" +
      '      var colorBlur3 = document.createElement("div");' + "\n" +
      '\n' +
      '      contentContainer.setAttribute("id","contentContainer");' + "\n" +
      '      blurredBackground.setAttribute("id","blurredBackground");' + "\n" +
      '      blurredBackgroundContainer.setAttribute("id","blurredBackgroundContainer");' + "\n" +
      '      colorBlur1.setAttribute("class","colorBlur1 color-blur");' + "\n" +
      '      colorBlur2.setAttribute("class","colorBlur1 color-blur");' + "\n" +
      '      colorBlur3.setAttribute("class","colorBlur1 color-blur");' + "\n" +
      '      document.body.appendChild(contentContainer);' + "\n" +
      '      while(document.body.firstChild !== contentContainer)' + "\n" +
      '      {' + "\n" +
      '          contentContainer.appendChild(document.body.firstChild);' + "\n" +
      '      }' + "\n" +
      '      document.body.insertBefore(blurredBackgroundContainer, document.body.firstChild);' + "\n" +
      '      blurredBackgroundContainer.appendChild(blurredBackground);' + "\n" +
      '      blurredBackground.appendChild(colorBlur1);' + "\n" +
      '      blurredBackground.appendChild(colorBlur2);' + "\n" +
      '      blurredBackground.appendChild(colorBlur3);' + "\n" +
      '\n' +
      '      blurredBackground.setAttribute("style", "' + $('#blurredBackground').attr("style") + '");' + "\n" +
      '      colorBlur1.setAttribute("style", "' + $('.colorBlur1').attr("style") + '");' + "\n" +
      '      colorBlur2.setAttribute("style", "' + $('.colorBlur2').attr("style") + '");' + "\n" +
      '      colorBlur3.setAttribute("style", "' + $('.colorBlur3').attr("style") + '");' + "\n" +
      "   }" + "\n" +
      "</scr" + "ipt>";

    $('#codeOutput').val(generatedScript);
  }

}