//Terminal drag and resize effect
$(function() {
    $(".kterm").not('kterm-body').draggable({ handle: ".kterm-top", containment: "body" }).resizable();
    $(".kterm").each(function(index) {
        let _this = $(this);
        _this.find('#wwidth').text(_this.width());
        _this.find('#wheight').text(_this.height());
    });
});

//Terminal Resize text update effect
$('.kterm').resize(function() {
    let _this = $(this);
    _this.find('#wwidth').text(_this.width());
    _this.find('#wheight').text(_this.height());
});


var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

//Auto Typing Effect
window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.1em solid green }";
    document.body.appendChild(css);
};


//Terminal Typing
$('.kterm-body').click(function(e) {
    e.preventDefault();
    $('.kterm-type-area .line:last-child .typing').focus();
    return false;
});

//Terminal Press Enter
$(document).on("keypress", ".kterm-type-area .line:last-child .typing", function(e) {
    // $('.kterm-type-area .line:last-child .typing').keypress(function(e) {
    let _this = $(this);
    if (e.which == 13) {
        e.preventDefault();
        // alert(_this.text());
        $(".kterm-type-area").last().append('<div class="line"> <div class="time"> [12:22:22] </div> <div class="content-type website"> Website </div> <div class="host-type"> &gt;_ </div> <div class="typing" contenteditable="true"> &nbsp;</div> </div>');
        $('.kterm-type-area .line:last-child .typing').focus();
        return false;
    }
});;