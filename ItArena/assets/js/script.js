(function($) {
    "use strict";
    let pageData = document.querySelector(".footer-copy__data");
    pageData.innerText = (new Date).getFullYear();
    $("img").on("dragstart", (function(event) {
        event.preventDefault();
    }));
    $(window).on("scroll touchmove", (function() {
        $("body").toggleClass("scroll", $(document).scrollTop() > 0);
    }));
    let scrollOffset = 0;
    (window.passVarsToHtml = function() {
        let headerHt = document.querySelector(".header").offsetHeight;
        scrollOffset = headerHt;
        document.documentElement.style.setProperty("--headerHt", `${headerHt}px`);
    })();
    function windowWidth() {
        return window.innerWidth;
    }
    const debounce = (func, delay) => {
        let inDebounce;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(context, args), delay);
        };
    };
    function handleWindowResize() {
        menuHandle();
        passVarsToHtml();
        changesDependsOnWindowSize();
    }
    window.onresize = debounce(handleWindowResize, 200);
    document.addEventListener("keydown", (function(event) {
        const key = event.key;
        if (key === "Escape" && document.querySelector("body").classList.contains("quick-srch-opened")) {
            mainSearch();
        }
    }));
    changesDependsOnWindowSize();
    function transformSvgPicToInlineSvg(root) {
        jQuery(".svgInline").each((function() {
            var $img = jQuery(this);
            var imgID = $img.attr("id");
            var imgClass = $img.attr("class");
            var imgURL = $img.attr("src");
            jQuery.get(imgURL, (function(data) {
                var $svg = jQuery(data).find("svg");
                if (typeof imgID !== "undefined") {
                    $svg = $svg.attr("id", imgID);
                }
                if (typeof imgClass !== "undefined") {
                    $svg = $svg.attr("class", imgClass + " replaced-svg");
                }
                $svg = $svg.attr("width", "1em");
                $svg = $svg.attr("height", "1em");
                $svg = $svg.removeAttr("xmlns:a");
                $img.replaceWith($svg);
            }), "xml");
        }));
    }
    transformSvgPicToInlineSvg()
    /**
 	*  @preserve MENU
	*/;
    function menuHandle() {
        var body = document.querySelector("body"), menu = document.querySelector(".header-main"), menuElems = $(".header-nav a"), menuBtn = $(".menu-opener"), otherElems = $(".appear-when-menu-is-opened"), breakpoint = 990;
        var menuToggle = gsap.timeline({
            paused: true,
            reversed: true,
            duration: .1,
            onComplete: function() {},
            onReverseComplete: function() {
                body.classList.remove("menu-opened");
            }
        });
        menuBtn.off("click");
        gsap.set(menu, {
            y: 0
        });
        body.classList.remove("menu-opened");
        if (windowWidth() < breakpoint) {
            gsap.set(menu, {
                y: "-100%"
            });
            gsap.set(menuElems, {
                scale: 0,
                y: "-30"
            });
        } else {
            gsap.set(menuElems, {
                scale: 1,
                y: 0
            });
        }
        if (windowWidth() < 575) {
            gsap.set(otherElems, {
                opacity: 0
            });
        }
        menuToggle.to(menu, {
            y: "0%",
            ease: Power1.easeOut
        }).to(menuElems, {
            scale: 1,
            y: 0,
            duration: .05,
            stagger: .05,
            ease: Power1.easeOut
        }).to(otherElems, {
            display: "block"
        }).to(otherElems, {
            opacity: 1,
            duration: .001,
            stagger: .05,
            ease: Power1.easeOut
        });
        function menuHandle__anim() {
            if ($("body").hasClass("menu-opened")) {
                menuToggle.reverse();
            } else {
                body.classList.add("menu-opened");
                menuToggle.play();
            }
        }
        menuBtn.click(() => {
            menuHandle__anim();
            navigator.vibrate(100);
        });
    }
    menuHandle();
    /**
 	*   @preserve  Search
	*/    function mainSearch(action) {
        if ($("body").hasClass("quick-srch-opened")) {
            $("body").removeClass("quick-srch-opened");
        } else {
            $("body").addClass("quick-srch-opened");
            setTimeout((function() {
                $(".main-search__ctrl").focus();
            }), 1500);
        }
    }
    function handleScroll() {
        let pos = window.scrollY;
        document.documentElement.style.setProperty("--scroll-y", `${pos}px`);
    }
    handleScroll();
    window.addEventListener("scroll", debounce(handleScroll, 200));
    window.addEventListener("scroll", debounce(passVarsToHtml, 200));
    $(".site-srch-btn").click((function(e) {
        mainSearch();
    }))
    /** 
	*  @preserve Text fit
	*/;
    if ($(".fit").length > 0) {
        var fitties = fitty(".fit", {
            minSize: 12,
            maxSize: 50
        });
    }
    /** 
	*  @preserve Sliders
	*/    var mobSlider = undefined;
    var uniSlider = document.querySelectorAll(".uniSlider .swiper");
    var uniSliderCollectInstances = [];
    if ($(".uniSlider").length > 0) {
        uniSlider.forEach((function(s, i) {
            let next = s.parentElement.querySelector(".uniSlider__btn--next");
            let prev = s.parentElement.querySelector(".uniSlider__btn--prev");
            let sldr = new Swiper(s, {
                slidesPerView: "auto",
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                on: {
                    slideChange: function(swp) {
                        transformSvgPicToInlineSvg(swp);
                    }
                }
            });
            uniSliderCollectInstances.push(sldr);
        }));
    }
    function changesDependsOnWindowSize() {
        if (windowWidth() < 768) {
            if ($(".mobSlider .swiper").length > 0 && mobSlider == undefined) {
                mobSlider = new Swiper(".mobSlider .swiper", {
                    slidesPerView: "auto",
                    navigation: {
                        nextEl: ".mobSlider__btn--next",
                        prevEl: ".mobSlider__btn--prev"
                    }
                });
            }
        } else {
            if (mobSlider) {
                mobSlider.destroy(true, true);
                mobSlider = undefined;
            }
        }
    }
    /** 
	*  @preserve announcementTape
	*/    if ($(".announcementTape").length > 0) {
        const boxes = gsap.utils.toArray(".announcementTapeLst__el");
        const loop = horizontalLoop(boxes, {
            paused: true,
            repeat: -1
        });
        loop.play();
        function horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({
                repeat: config.repeat,
                paused: config.paused,
                defaults: {
                    ease: "none"
                },
                onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
            }), length = items.length, startX = items[0].offsetLeft, times = [], widths = [], xPercents = [], curIndex = 0, pixelsPerSecond = (config.speed || 1) * 100, snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), totalWidth, curX, distanceToStart, distanceToLoop, item, i;
            gsap.set(items, {
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, {
                x: 0
            });
            totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, {
                    xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
                    duration: distanceToLoop / pixelsPerSecond
                }, 0).fromTo(item, {
                    xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
                }, {
                    xPercent: xPercents[i],
                    duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                    immediateRender: false
                }, distanceToLoop / pixelsPerSecond).add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length);
                let newIndex = gsap.utils.wrap(0, length, index), time = times[newIndex];
                if (time > tl.time() !== index > curIndex) {
                    vars.modifiers = {
                        time: gsap.utils.wrap(0, tl.duration())
                    };
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex + 1, vars);
            tl.previous = vars => toIndex(curIndex - 1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true);
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            return tl;
        }
    }
    /** 
	* @preserve animation
	*/    (function() {
        if ($(".visual").length > 0) {
            var visl = gsap.timeline({
                duration: 1,
                ease: Power1.easeIn,
                delay: 0
            });
            visl.from(".visual__wrapper", {
                opacity: 0,
                webkitFilter: "blur(20px)",
                scale: 1.2,
                duration: 1
            }).from(".visual .visual-head", {
                opacity: 0,
                y: 100
            }).from(".visual .visual-info", {
                opacity: 0,
                y: 20
            });
        }
        $(".statBlock-val").each((function(index, element) {
            var count = $(this), zero = {
                val: 0
            }, num = count.data("number"), split = (num + "").split("."), decimals = split.length > 1 ? split[1].length : 0;
            let time = `${index}000`;
            setTimeout(() => {
                gsap.from(count, {
                    opacity: 0
                });
                gsap.to(zero, {
                    val: num,
                    duration: 2,
                    stagger: 1,
                    scrollTrigger: ".stat",
                    onUpdate: function() {
                        count.text(zero.val.toFixed(decimals));
                    }
                });
            }, +time);
        }));
    })();
})(jQuery);