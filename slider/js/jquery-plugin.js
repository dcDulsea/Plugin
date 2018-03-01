if(!window.jQuery){
    throw new Error("plugin.js插件库依赖于JQuery")
}

//轮播广告插件函数
jQuery.fn.carousel = function () {
    var interval = 3000;//每隔多久轮换一张
    var duration = 500;//每次轮换动画持续时间
    var $sliderList = this.children("div");//所有的slider组成的类数组对象
    var $pageNum = this.find("li");//所有的按钮组成的类数组对象
    var current = 0;//当前显示的广告序号
    var next = 1;//下次要显示的广告序号
    //开启一个定时器,每隔interval时长启动一次广告轮换
    setInterval(function () {
        //让当前显示的广告向左滑动,滑出去后删除.active
        $sliderList.eq(current).animate({
            left:"-100%"
        },duration,function () {
            $(this).removeClass("active");
            $pageNum.eq(current-1).removeClass("active");
            $pageNum.eq(next-1).addClass("active");
            console.log(current-1)
            console.log(next-1)
        });
        //让即将要显示的下一张广告添加.active,出现在最右侧,启动动画慢慢向左滑动
        $sliderList.eq(next).addClass("active").css("left","100%").animate({
            left : "0"
        },duration);
        //修改current和next的值
        current = next;
        next++;
        if(next>=$sliderList.length){
            next = 0;
        }
    },interval);
};

//按键和页签式轮播广告插件函数
jQuery.fn.carouselButton = function () {
    var duration = 500;//每次轮换动画持续时间
    var $sliderList = this.children("div");//所有的slider组成的类数组对象
    var $pageNum = $(".pagination").find("li");//所有的按钮组成的类数组对象
    //点击下一张按钮
    $("#btn-next").click(function () {
        var num = parseFloat($("div.active").attr("data-num"));
        console.log(num);
        var current = num;//当前显示的广告序号
        var next = num+1;//下次要显示的广告序号
        if(next === $sliderList.length){
            next = 0;
            current = 4;
        };
        //将当前slider向左移
        $sliderList.eq(current).animate({
            left : "-100%"
        },duration,function () {
            $(this).removeClass("active");
            console.log($pageNum.eq(current));
            $pageNum.eq(current).removeClass("active");
            $pageNum.eq(next).addClass("active");
        });
        console.log(next);
        console.log($sliderList[current]);
        // 将下一张slider出现在右边,添加.active,启动动画向左滑动;
        $sliderList.eq(next).css("left","100%").addClass("active").animate({
            left:"0"
        },duration);
        console.log($sliderList[next]);
    });
    //点击上一张按钮
    $("#btn-prev").click(function () {
        var num = parseFloat($("div.active").attr("data-num"));
        console.log(num);
        var current = num;//当前显示的广告序号
        var prev = num-1;//前一张的广告序号
        if(prev < 0){
            prev = num + 4;
        };
        $sliderList.eq(current).animate({
            left:"100%"
        },duration,function () {
            $(this).removeClass("active");
        });
        console.log($sliderList[current]);
        $sliderList.eq(prev).css("left","-100%").addClass("active").animate({
            left:"0"
        },duration,function () {
            console.log($pageNum.eq(current));
            $pageNum.eq(current).removeClass("active");
            $pageNum.eq(prev).addClass("active");
        });
        console.log(prev);
        console.log($sliderList[prev]);
    });
    //点击页码按钮实现广告的切换
    $(".pagination li").click(function () {
        var click = parseFloat($(this).attr("data-li"));
        console.log($sliderList[click]);
        var current = parseFloat($("#slider div.active").attr("data-num"));
        console.log($sliderList[current]);
        //将当前点击的按钮加上.active,再将有.active的兄弟li去除.active
        $(this).addClass("active").siblings().removeClass("active");
        //判断点击的广告序号的位置
        if(click > current) {
            //将当前显示的广告向左移,移除当前广告的.active
            $($sliderList[current]).animate({
                left: "-100%"
            }, duration, function () {
                $(this).removeClass("active");
            });
            //将点击的序号所对应的广告放置在右侧,加上.active,启动动画向左滑
            $($sliderList[click]).css("left","100%").addClass("active").animate({
                left:"0%"
            },duration);
        }else{
            //将当前显示广告向右移,移除当前广告的.active
            $($sliderList[current]).animate({
                left: "100%"
            }, duration, function () {
                $(this).removeClass("active");
            });
            //将点击的序号所对应的广告放置在左侧,加上.active,启动动画向右滑
            $($sliderList[click]).css("left","-100%").addClass("active").animate({
                left:"0%"
            },duration);
        };
    });
};