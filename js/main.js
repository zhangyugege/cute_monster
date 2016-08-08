/**
 * Created by Administrator on 2015/6/7.
 */
var game=game||{};
window.onload = function(){

  cc.game.onStart = function(){

    cc.view.adjustViewPort(true);//设置引擎矢耦可以修改游戏的viewport
      cc.view.setDesignResolutionSize(800,480,cc.ResolutionPolicy.EXACT_FIT);
      cc.LoaderScene.preload(["g_resources" ], function () {
          cc.director.runScene(new StartScene());
      },this);
  };
    cc.game.run("gameCanvas");



};