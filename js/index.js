$(function () {
    let $carousel = $(".carousel");
    let $carousel_prev = $(".carousel_prev");
    let $carousel_next = $(".carousel_next");

    $carousel.carousel({
        carousel : ".carousel_content",         // 轮播图容器
        indexContainer : ".carousel_index",     // 索引容器
        prevBtn : ".carousel_prev",                // 上一个按钮
        nextBtn : ".carousel_next",                // 下一个按钮
        timing : 3000,                          // 自动切换间隔
        animateTime : 700,                      // 动画时间
        autoPlay : true,                        // 是否自动播放
        direction : "left",                     // 滚动方向
    });

    $carousel.hover(function () {
        $(".carousel_prev, .carousel_next").fadeIn(300);
    }, function () {
        $(".carousel_prev, .carousel_next").fadeOut(300);
    });

    $carousel_prev.hover(function () {
        $(this).find("img").attr("src", "./img/left2.png");
    }, function () {
        $(this).find("img").attr("src", "./img/left1.png");
    });

    $carousel_next.hover(function () {
        $(this).find("img").attr("src", "./img/right2.png");
    }, function () {
        $(this).find("img").attr("src", "./img/right1.png");
    });
})

// 实现轮播图
$.fn.carousel = function (param) {
    let carousel = param.carousel;
    let indexContainer = param.indexContainer;
    let list = $(carousel).children("li");
    let len = list.length;
    let prev = param.prevBtn;
    let next = param.nextBtn;
    let timing = param.timing;
    let animateTime = param.animateTime;
    let autoPlay = param.autoPlay;
    let timer;
    let index = 1;
    let indexList;
    let indexClassName = "checked_index";
    let action = true;
    let totalWidth = list.width() * (len + 2);
    let direction = param.direction;

    // 窗口尺寸更改事件
    $(window).resize(function () {
        totalWidth = list.width() * (len + 2);
        // 刷新页面
        window.location.reload();
    });

    // 添加索引
    for (let i = 1; i <= len; i++) {
        // 在 indexContainer 后面（内部）添加 <li></li>
        $(indexContainer).append("<li>" + i + "</li>");
    }

    // 克隆 list 第一个元素并插入 carousel 最后面，克隆 list 最后一个元素并插入 carousel 最前面，实现循环轮播
    $(carousel).width(totalWidth).append($(list[0]).clone()).prepend($(list[len - 1]).clone())
        .css("left", "-" + list.width() + "px");
    list = $(carousel).children("li");
    indexList = $(indexContainer).children("li");
    $(indexList[index - 1]).addClass(indexClassName);

    // 自动轮播
    if (autoPlay) {
        startTiming();
        $(carousel + "," + prev + "," + next + "," + indexContainer).hover(function () {
            window.clearInterval(timer);
        }, function () {
            startTiming();
        });
    }

    function startTiming() {
        switch (direction) {
            case "right":
                timer = window.setInterval("$.rightChangeImg();", timing);
                break;
            case "left":
            default:
                timer = window.setInterval("$.leftChangeImg();", timing);
        }
    }
    $.extend({
        changeIndex: function (index) {
            $(indexList).removeClass(indexClassName);
            $(indexList[index]).addClass(indexClassName);
        }
    });
    $.extend({
        leftChangeImg: function () {
            action = false;
            if (index === len) {
                index = 0;
                $(carousel).stop(true, true).css("left", "0px");
            }
            ++index;
            $(carousel).stop(true, true).animate({left: "-=" + list.width() + "px"}, animateTime);
            setTimeout(function () {
                if (index === len) {
                    index = 0;
                    $(carousel).stop(true, true).css("left", "0px");
                }
                action = true;
            }, animateTime);
            $.changeIndex(index - 1);
        }
    });
    $.extend({
        rightChangeImg: function () {
            const left = totalWidth - list.width() * 2;
            action = false;
            if (index === 0) {
                index = len;
                $(carousel).stop(true, true).css("left", "-" + left + "px");
            }
            --index;
            $(carousel).stop(true, true).animate({left: "+=" + list.width() + "px"}, animateTime);
            setTimeout(function () {
                if (index === 0) {
                    index = len;
                    $(carousel).stop(true, true).css("left", "-" + left + "px");
                }
                action = true;
            }, animateTime);
            if (index === 0) {
                $.changeIndex(len - 1);
            } else {
                $.changeIndex(index - 1);
            }
        }
    });

    // 下一个按钮点击事件
    $(next).on("click", function () {
        const nowLeft = Math.abs(parseInt($(carousel).css("left")));
        const left = totalWidth - list.width() * 2;
        if (action) {
            if (nowLeft === left) {
                index = 0;
                $(carousel).stop(true, true).css("left", "0px");
            }
            $.leftChangeImg();
        }
    });

    // 上一个按钮点击事件
    $(prev).on("click", function () {
        const nowLeft = Math.abs(parseInt($(carousel).css("left")));
        const left = totalWidth - list.width() * 2;
        if (action) {
            if (nowLeft === 0) {
                index = len;
                $(carousel).stop(true, true).css("left", "-" + left + "px");
            }
            $.rightChangeImg();
        }
    });

    // 索引点击事件
    indexList.on("click", function () {
        let left;
        const no = $(this).index() + 1;
        if (action) {
            if (no > index) {
                $.changeIndex(no - 1);
                action = false;
                left = (no - index) * list.width();
                index = no;
                $(carousel).stop(true, true).animate({left: "-=" + left + "px"}, animateTime);
                setTimeout(function () {
                    action = true;
                }, animateTime);
            } else if (no < index) {
                $.changeIndex(no - 1);
                action = false;
                left = (index - no) * list.width();
                index = no;
                $(carousel).stop(true, true).animate({left: "+=" + left + "px"}, animateTime);
                setTimeout(function () {
                    action = true;
                }, animateTime);
            }
        }
    });
}