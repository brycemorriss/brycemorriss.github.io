(function() {
	/* In animations (to close icon) */
if($(".feature_slider").length){
        startSlider();
    }
    
    function startSlider(){
    
    var $slider = $(".feature_slider");
    var $slides = $(".feature_slider .slide");
    var currentSlide = 0;
    var maxSlides = $slides.length-1;
    var sliderInterval = 5000;

    $slides.eq(currentSlide).addClass("show");

    $dots = $("<div />",{class:"dots"});

    $.each($slides,function(key,val){
        $dots.append(
            $("<a />",{
                href: "#",
                onclick: "return false;",
                class: "dot",
                "data-slide": key
            })
        );
    });

    $slider.append($dots);
    $dots.find(".dot[data-slide='"+currentSlide+"']").addClass("active");

    $slider.find(".dot").click(function(){
        var slideNum = $(this).attr("data-slide");
        clearInterval(slideTimer);
        currentSlide = slideNum;
        $slides.removeClass("show");
        $dots.find(".dot").removeClass("active");
        $slides.eq(currentSlide).addClass("show");
        $dots.find(".dot[data-slide='"+currentSlide+"']").addClass("active");
    });
    
    var slideTimer = window.setInterval(function(){
        if(currentSlide<maxSlides){
            currentSlide++;
        }else{
            currentSlide=0;
        }
        $slides.removeClass("show");
        $dots.find(".dot").removeClass("active");
        $slides.eq(currentSlide).addClass("show");
        $dots.find(".dot[data-slide='"+currentSlide+"']").addClass("active");
    },sliderInterval);
    
}


	var beginAC = 80,
	    endAC = 320,
	    beginB = 80,
	    endB = 320;

	function inAC(s) {
	    s.draw('80% - 240', '80%', 0.3, {
	        delay: 0.1,
	        callback: function() {
	            inAC2(s)
	        }
	    });
	}

	function inAC2(s) {
	    s.draw('100% - 545', '100% - 305', 0.6, {
	        easing: ease.ease('elastic-out', 1, 0.3)
	    });
	}

	function inB(s) {
	    s.draw(beginB - 60, endB + 60, 0.1, {
	        callback: function() {
	            inB2(s)
	        }
	    });
	}

	function inB2(s) {
	    s.draw(beginB + 120, endB - 120, 0.3, {
	        easing: ease.ease('bounce-out', 1, 0.3)
	    });
	}

	/* Out animations (to burger icon) */

	function outAC(s) {
	    s.draw('90% - 240', '90%', 0.1, {
	        easing: ease.ease('elastic-in', 1, 0.3),
	        callback: function() {
	            outAC2(s)
	        }
	    });
	}

	function outAC2(s) {
	    s.draw('20% - 240', '20%', 0.3, {
	        callback: function() {
	            outAC3(s)
	        }
	    });
	}

	function outAC3(s) {
	    s.draw(beginAC, endAC, 0.7, {
	        easing: ease.ease('elastic-out', 1, 0.3)
	    });
	}

	function outB(s) {
	    s.draw(beginB, endB, 0.7, {
	        delay: 0.1,
	        easing: ease.ease('elastic-out', 2, 0.4)
	    });
	}

	/* Awesome burger default */

	var pathA = document.getElementById('pathA'),
		pathB = document.getElementById('pathB'),
		pathC = document.getElementById('pathC'),
		segmentA = new Segment(pathA, beginAC, endAC),
		segmentB = new Segment(pathB, beginB, endB),
		segmentC = new Segment(pathC, beginAC, endAC),
		trigger = document.getElementById('menu-icon-trigger'),
		toCloseIcon = true,
		dummy = document.getElementById('dummy'),
		wrapper = document.getElementById('menu-icon-wrapper');

	wrapper.style.visibility = 'visible';

	trigger.onclick = function() {
		if (toCloseIcon) {
			inAC(segmentA);
			inB(segmentB);
			inAC(segmentC);

			dummy.className = 'dummy dummy--active';
		} else {
			outAC(segmentA);
			outB(segmentB);
			outAC(segmentC);

			dummy.className = 'dummy';
		}
		toCloseIcon = !toCloseIcon;
	};

	/* Scale functions */

	function addScale(m) {
		m.className = 'menu-icon-wrapper scaled';
	}

	function removeScale(m) {
		m.className = 'menu-icon-wrapper';
	}

	/* Awesome burger scaled */

	var pathD = document.getElementById('pathD'),
		pathE = document.getElementById('pathE'),
		pathF = document.getElementById('pathF'),
		segmentD = new Segment(pathD, beginAC, endAC),
		segmentE = new Segment(pathE, beginB, endB),
		segmentF = new Segment(pathF, beginAC, endAC),
		wrapper2 = document.getElementById('menu-icon-wrapper2'),
		trigger2 = document.getElementById('menu-icon-trigger2'),
		toCloseIcon2 = true,
		dummy2 = document.getElementById('dummy2');

	wrapper2.style.visibility = 'visible';

	trigger2.onclick = function() {
		addScale(wrapper2);
		if (toCloseIcon2) {
			inAC(segmentD);
			inB(segmentE);
			inAC(segmentF);

			dummy2.className = 'dummy dummy--active';
		} else {
			outAC(segmentD);
			outB(segmentE);
			outAC(segmentF);

			dummy2.className = 'dummy';
		}
		toCloseIcon2 = !toCloseIcon2;
		setTimeout(function() {
			removeScale(wrapper2)
		}, 450);
	};

})();
  
    