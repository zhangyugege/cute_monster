/**
 * Created by Administrator on 2015/6/11.
 */
var pauseScene=cc.Scene.extend(
    {
        ctor: function () {

            this._super();


            var size=cc.director.getWinSize();
            if(game.result==false)
            {
                //游戏失败
                console.log("lose");
                var bg=new cc.Sprite(res.s_gameover);
                var tryagainItem;
                tryagainItem = new cc.MenuItemImage(
                    res.s_nexttry,
                    res.s_nexttry2,
                    function () {

                        cc.director.runScene(new StartScene());

                    }
                );


                tryagainItem.attr(
                    {
                        x:size.width/2,
                        y:size.height/2-50,
                        anchorX:0.5,
                        anchorY:0.5


                    }
                );

                tryagainItem.setScale(1);
                var menu = new cc.Menu(tryagainItem);
                menu.x=0;
                menu.y=0;
                this.addChild(menu,1);


            }
            else
            {
                //游戏成功


                var bg=new cc.Sprite(res.s_gamewin);

                var nextlevelItem;
                nextlevelItem = new cc.MenuItemImage(
                    res.s_nextlevel,
                    res.s_nextlevel2,
                    function () {

                        game.level++;
                        cc.director.runScene(new StartScene());

                    }
                );


                nextlevelItem.attr(
                    {
                        x:size.width/2+100,
                        y:size.height/2-50,
                        anchorX:0.5,
                        anchorY:0.5


                    }
                );

                nextlevelItem.setScale(0.8);

                var tryagainItem;
                tryagainItem = new cc.MenuItemImage(
                    res.s_nexttry,
                    res.s_nexttry2,
                    function () {

                        cc.director.runScene(new StartScene());

                    }
                );


                tryagainItem.attr(
                    {
                        x:size.width/2-100,
                        y:size.height/2-50,
                        anchorX:0.5,
                        anchorY:0.5


                    }
                );

                tryagainItem.setScale(0.8);
                var menu = new cc.Menu(tryagainItem,nextlevelItem);
                menu.x=0;
                menu.y=0;
                this.addChild(menu,1);

            }
            bg.setPosition(size.width/2,size.height/2);
            this.addChild(bg,0);

        }



    }
);