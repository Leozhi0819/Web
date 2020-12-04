$(function () {
    let $carousel = $(".carousel");
    let $carousel_prev = $(".carousel_prev");
    let $carousel_next = $(".carousel_next");

    $carousel.carousel({
        carousel : ".carousel_content",         // 轮播图容器
        indexContainer : ".carousel_index",     // 索引容器
        prev : ".carousel_prev",                // 上一个按钮
        next : ".carousel_next",                // 下一个按钮
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