/**
 * Created by Acer_haitao on 2018/4/5.
 */
(function(global){
    //定义播放器代码
    var __INFO__={
      plug:"DNmusicPlay",
        version:"1.0.1",
        autho:"haitao",
    };
    var defaults = {
        audioUrl:"",
        nodeID:"",
        boxStyle:"",
        playbuttonSrc:"",
        stopbuttonSrc:"",
        htmls:`<audio autoplay loop style="width: 0px">
        <source src="" type="audio/mpeg">
        </audio>
        <span class=""></span>
        <select style="vert-align: top">
        </select>`,
        html:`<audio autoplay loop style="width: 0px">
        <source src="" type="audio/mpeg">
        </audio>
        <a style="width:24px;height:24px;"></a>
        <select style="vert-align: top">
        </select>`,
    };
    var  PlugCode = function(options){
        var settings = Object.assign({},defaults,options);
        var audioDOM = document.getElementById(settings.nodeID);//获取节点
        if (!audioDOM) audioDOM = document.body;//用户没传nodeid
        //创建div节点
        var audioBox = document.createElement("div");
        audioBox.id = "dnmusiccontrol";
        audioBox.style ="opacity:1;overflow:hidden;position:absolute;"+settings.boxStyle;//指定位置
        audioBox.innerHTML = settings.htmls;
        audioDOM.appendChild(audioBox);//将整个盒子插入

        //寻找元素
        var audioButton = audioBox.querySelectorAll("span")[0];//查找a元素 返回的不是节点
        var audioList = audioBox.querySelectorAll("select")[0];
        var audioTag = audioBox.querySelectorAll("audio")[0];

        //pic
       // if(settings.buttonSrc) audioButton.style.backgroundImage="url("+settings.buttonSrc+")";

        if(settings.playbuttonSrc) audioButton.className=settings.playbuttonSrc;
        //初始化防止第一次播放暂停
        audioButton.state = true;

        var _urlType = toString.apply(settings.audioUrl);
        console.log(_urlType);
        if (_urlType =='[object Object]'){
            var _temp = [];//====>[{},{}]
            _temp.push(settings.audioUrl);//字符串转数组
            settings.audioUrl=_temp;
        }
        if (!settings.audioUrl.length){
            //没传值
            console.log("legth:"+settings.audioUrl.length)
            console.log(__INFO__.plug +"无音乐资源，请添加audioUrl:")
            return;
        }

        if (typeof settings.audioUrl == 'object'){
            //判断是数组
            console.log("数组对象自动播放")
            audioTag.src = settings.audioUrl[0].source;
            for (var i = 0;i < settings.audioUrl.length; i++){
                var _option = new Option(settings.audioUrl[i].title,settings.audioUrl[i].source)
                audioList.add(_option);
            }
        }else {
            audioTag.src = settings.audioUrl;
            audioList.style.display = "none";//列表隐藏
        }
        //点击
        var audioFN={
            play:function(url){
                if(url) audioTag.src = url;
                audioTag.play();
                audioButton.className=settings.playbuttonSrc;
            },
            stop:function(){
                audioTag.pause();
                audioButton.className=settings.stopbuttonSrc;
            },
        };
        //按钮绑定shijian http://www.cnblogs.com/mrdoor/p/5560775.html
        var _device =(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        var clickEvtName = _device ? "touchstart":"mousedown"

        audioButton.addEventListener(clickEvtName,function(e){
            console.log(e.type)
            console.log(this.state)
            if (this.state){
                this.state = false;
                audioFN.stop();
            }else {
                this.state = true;
                audioFN.play();
            }
        });
        audioList.addEventListener("change",function(){//切歌
            var musicName = this.options[this.selectedIndex].value;//去列表里面的值
            audioFN.play(musicName);
            audioButton.state = true;
        });
    };
    //微信
    if(navigator.userAgent.toLowerCase().match(/micromessenger/i)){
        document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
            WeixinJSBridge.invoke("getNetworkType",{},function(e){
                audioFN.play();
            })
        })
    }
    global.DNmusicPlay = PlugCode;
})(typeof window !== "undefined" ? window :this);//闭包