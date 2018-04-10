/**
 * Created by Acer_haitao on 2018/4/5.
 */
(function(global){
    //定义播放器代码
    var __INFO__={
        plug:"DNmusicPlay",
        version:"1.0.1",
        author:"haitao",
    };
    var defaults = {
        audioUrl:"",
        nodeID:"",
        boxStyle:"",
        playbuttonSrc:"",
        stopbuttonSrc:"",
        htmls:`
        <audio autoplay loop style="width: 0px">
            <source src="" type="audio/mpeg">
        </audio>
        <span class=""></span>
        <select style="vert-align: top">
        </select>`,
        html:`
        <audio autoplay loop style="width: 0px">
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
        var _device =(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));
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