/**
 * Created by Administrator on 2015/3/12.
 */
var game=game||{};//命名空间
window.onload = function(){
    cc.game.onStart = function(){

        cc.LoaderScene.preload(["g_resources"], function () {

            cc.director.runScene(new GameScene());
        }, this);
    };
    cc.audioEngine.playMusic("bgm_game.ogg",true);
    cc.game.run("gameCanvas");
};

