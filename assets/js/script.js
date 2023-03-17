// nav animation
var className = "header-anim";
var scrollTrigger = 300;

window.onscroll = function() {
  if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
    document.getElementsByTagName("header")[0].classList.add(className);
    document.getElementById("logo").style.width = "60%";
    document.getElementById("scroll-to-top").style.visibility = "visible";
    document.getElementById("scroll-to-top").style.opacity = "1";
  } else {
    document.getElementsByTagName("header")[0].classList.remove(className);
    document.getElementById("logo").style.width = "100%";
    document.getElementById("scroll-to-top").style.visibility = "hidden";
    document.getElementById("scroll-to-top").style.opacity = "0";
  }
};

// scroll to top
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// typewriter effect
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

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

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 2px solid #ffffff2b; animation: caret 1s steps(1) infinite; }";
        document.body.appendChild(css);
    };
// pointer
document.addEventListener("DOMContentLoaded", function () {
    
var cursor = document.querySelector('#cursor');
var cursorCircle = cursor.querySelector('.cursor-circle');

var mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
var pos = { x: 0, y: 0 }; // cursor's coordinates
var speed = 0.3; // between 0 and 1

var updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
    
window.addEventListener('mousemove', updateCoordinates);

function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  var maxSqueeze = 0.15;
  var accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

var updateCursor = () => {
  var diffX = Math.round(mouse.x - pos.x);
  var diffY = Math.round(mouse.y - pos.y);
  
  pos.x += diffX * speed;
  pos.y += diffY * speed;
  
  var angle = getAngle(diffX, diffY);
  var squeeze = getSqueeze(diffX, diffY);
  
  var scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
  var rotate = 'rotate(' + angle +'deg)';
  var translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

var cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
  curosrModifier.addEventListener('mouseenter', function() {
    var className = this.getAttribute('cursor-class');
    cursor.classList.add(className);
  });
  
  curosrModifier.addEventListener('mouseleave', function() {
    var className = this.getAttribute('cursor-class');
    cursor.classList.remove(className);
  });
});
    
});