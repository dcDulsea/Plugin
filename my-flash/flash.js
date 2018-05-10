/**
 **@Author: 周晨成-DC
 **/
if(!window.jQuery){
    throw new Error("plugin.js插件库依赖于JQuery")
}

//快闪插件函数
jQuery.fn.flash = function () {
    $(this).click(function () {
        const countArr = [];
        var counts = $(".word");
        for(var i=0;i<counts.length;i++){
            countArr.push(counts[i])
        };
        console.log(countArr);
        setTimeout(function () {
            $(countArr[0]).css("animation","countDown 1s ease-in")
            setTimeout(function () {
                $(countArr[0]).css("display","none")
            },1000)
        },0)
        setTimeout(function () {
            $(countArr[1]).css("animation","countDown 1s ease-in")
            setTimeout(function () {
                $(countArr[1]).css("display","none")
            },1000)
        },1000)
        setTimeout(function () {
            $(countArr[2]).css("animation","countDown 1s ease-in")
            setTimeout(function () {
                $(countArr[2]).css("display","none")
            },1000)
        },2000)

    })
}
