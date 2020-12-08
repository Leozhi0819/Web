$(document).ready(function(){
    let $navCheckbox = $(".nav_cb");
    let $navContent = $(".nav_content");
    let $navItems = $(".nav_items");
    let $navItem = $(".nav_item");
    let $carousel = $(".carousel");
    let $carousel_content = $(".carousel_content li, .carousel_content img");
    let originWidth = $navContent.width();
    let windowWidth = $(window).width();
    let width;
    // 设置CheckBox为未选中状态，解决页面返回时CheckBox处于选中状态的问题
    $navCheckbox.prop("checked", false);
    if (windowWidth >= 1152) {
        width = windowWidth * 0.6;
    } else {
        width = windowWidth * 0.8;
    }
    $carousel.css("height", windowWidth / 3);
    $carousel_content.css("width", windowWidth);
    $carousel_content.css("height", windowWidth / 3);
    $navItems.css("width", width);
    $navItem.css("width", (width - 80) / 6);
    $navCheckbox.click(function(){
        if ($(".nav_cb").prop("checked")) {
            expandNav(600);
        } else {
            shrinkNav(600);
        }
    });
    $(window).resize(function () {
        windowWidth = $(window).width();
        // 页面大小更改时，主页宽度
        if (windowWidth >= 1152) {
            width = windowWidth * 0.6;
        } else {
            width = windowWidth * 0.8;
        }
        $navItems.css("width", width);
        $navItem.css("width", (width - 80) / 6);
        if ($(".nav_cb").prop("checked")) {
            expandNav(0);
        }
        $carousel.css("height", windowWidth / 3);
        $carousel_content.css("width", windowWidth);
        $carousel_content.css("height", windowWidth / 3);
    });
    // 展开导航栏
    let expandNav = function (time) {
        $(".nav_content").css("width", originWidth);
        setTimeout(function () {
            $navContent.css("transition", "width " + time +"ms linear", );
            $navContent.css("width", width);
        })
    }
    // 收缩导航栏
    let shrinkNav = function (time) {
        setTimeout(function () {
            $navContent.css("transition", "width " + time +"ms linear");
            $navContent.css("width", originWidth);
        })
    }
});