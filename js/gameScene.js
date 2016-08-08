/**
 * Created by Administrator on 2015/3/12.
 */

var game=game||{};//命名空间



game.Role_Pos={x:152,y:70};
game.Bound={
    LEFT:0,
    RIGHT:300,
    UP:477,
    DOWN:70//77
};
game.Role_Wid=145;
game.Role_Hei=60;
game.Fruit_RoundD=24;
game.Fruit_Pos1={x:0,y:152+100};
game.Fruit_Pos2={x:0,y:152+200};
game.Fruit_speed=1;
game.EndB={x:300,y:150};
game.MAX=50;
game.Bomb_Pos={x:200,y:477};
game.Bomb_RoundD=38;
game.Bomb_speed=1;
game.blood=100;

var GameScene = cc.Scene.extend({

    FruitArr:[],
    role:null,
    num:0,
    sp:null,
    spblood:null,
    label:null,
    level:null,
    levelnum:0,
    Bomb:null,
    blood:100,
    begin:true,



    ctor:function(){

        this._super();

       this.createLocation();
        this.addRole();
        this.addEventListener();
        this.scheduleUpdate();
        this.addOneFruit(1);
       // this.addBomb();
        this.schedule(this.addFruits, 0.3,  cc.REPEAT_FOREVER,1);
     //   this.schedule(this.addFruits2, 0.5,  cc.REPEAT_FOREVER,1);
        this.schedule(this.addBomb, 2,  cc.REPEAT_FOREVER,1);







    },
    addBomb: function () {
       if(this.Bomb==null)
       {
      //  alert("!!");
            this.Bomb=new Bomb();
            this.Bomb.x=this.role.x;
            this.Bomb.y=game.Bomb_Pos.y;
            this.addChild(this.Bomb);

            this.Bomb.runAction(cc.moveTo(game.Bomb_speed,{x:this.Bomb.x,y:0}));

        //var Bomb=new Bomb();
        //Bomb.x=this.role.x;
        //Bomb.y=game.Bomb_Pos.y;
        //this.addChild(Bomb);




      //  var Bomb = cc.Sprite.create(res.BOMB);
      //  Bomb.setPosition(this.role.x, game.Bomb_Pos.y);
      //  this.addChild(Bomb, 0);
        }
        //Bomb.runAction(cc.moveTo(1,{x:Bomb.x,y:0}));
    },



    onEnter: function () {
        this._super();


    },
    onExit:function(){
        this.unscheduleUpdate();
    },
    addFruits2:function(){

        var random=parseInt(Math.random()*5);

        this.addOneFruit(random);
        //alert("true");
    },
    addFruits:function(){
        this.addFruits2();
        var random=parseInt(Math.random()*5);

        this.addOneFruit(random);
    },
    knockFruit:function(){
        for(var i=0;i<this.FruitArr.length;i++) {
            var fruit = this.FruitArr[i];
            if (fruit)
            {
                var size = cc.director.getWinSize();
                if (fruit.x >= size.width - 15|| fruit.y <= 10) {
                    fruit.removeFromParent(true);
                    this.FruitArr[i] = 0;
                }

                var k=( Math.pow((fruit.y-this.role.y),2)) <= Math.pow(game.Fruit_RoundD/2,2);
                var p=((fruit.x<this.role.x+game.Role_Wid*0.37)  &&  (fruit.x>this.role.x-game.Role_Wid*0.37));
                if(k&&p&&fruit.isMoving){
                    fruit.isMoving=false;
                    cc.audioEngine.playEffect("UI_buttonstart.ogg", false);
                    var bezier = [cc.p(size.width-10, size.height / 2), cc.p(size.width-10,size.height / 2), cc.p(size.width-10,size.height / 2)];
                    var bezierTo = new cc.BezierTo(1, bezier);
                    fruit.runAction(bezierTo);
                    this.num++;
                    var string=(String)(this.num);
                    this.label.string=string;
                    if(this.num<=game.MAX)
                    {
                        this.sp.setScaleY(this.num/game.MAX);
                    }
                    else if(this.num>game.MAX){
                        cc.audioEngine.playEffect("levelup.ogg", false);
                        this.sp.setScaleY(0);
                        this.num=0;
                        this.levelnum++;
                        var string=(String)(this.levelnum);
                        this.level.string=string;
                        game.MAX+=50;
                        this.spblood.setScaleX(1);
                        game.Bomb_speed-=0.2;
                        game.Fruit_speed-=0.2;
                        this.blood=game.MAX;

                    }

                }
            }


        }

    },
    knockBomb: function () {
        if(this.Bomb)
        {
            var k=( Math.pow((this.Bomb.y-this.role.y),2)) <= Math.pow(game.Bomb_RoundD/2,2);
            var p=((this.Bomb.x<this.role.x+game.Role_Wid/2)  &&  (this.Bomb.x>this.role.x-game.Role_Wid/2));
            if(p&&k&&this.Bomb.isMoving){
                cc.audioEngine.playEffect("A_falsemove.ogg", false);
                this.Bomb.isMoving=false;
                this.blood-=10;
                this.spblood.setScaleX(this.blood/game.MAX);
                this.Bomb.removeFromParent(true);
                this.Bomb=null;
            }
            if(this.Bomb)
            {
                if(this.Bomb.y<=4){
                    this.Bomb.removeFromParent(true);
                    this.Bomb=null;
                }
                if(this.blood<=0&&this.begin){

                    cc.audioEngine.playEffect("fail.ogg", false);
                    alert("gameOver");
                    this.begin=false;
                    cc.director.runScene(new GameScene());
                }
            }

        }


    },
    update:function(dt){


        this.knockFruit();
      this.knockBomb();


    },

    addEventListener: function () {
        var that=this;
        var eventListener=cc.EventListener.create({

            event : cc.EventListener.MOUSE,

            onMouseMove : function(event){

                var pos =event.getLocation();
                that.onMouseMove(pos);
            },
            onMouseDown : function(event){
                var pos =event.getLocation();
                that.onMouseDown(pos);
            }

        });
        cc.eventManager.addListener(eventListener,this);
    },

    onMouseMove: function (pos) {

        //game.Distance=game.Shoot_Pos.y,pos.x-game.Shoot_Pos.x;
        var radius=Math.atan2(pos.y-game.Role_Pos.y,pos.x-game.Role_Pos.x);
        var dis;
        if(pos.x>game.Bound.RIGHT-game.Role_Wid/2){
            dis=game.Bound.RIGHT-game.Role_Wid/2;
        }else if(pos.x<game.Bound.LEFT+game.Role_Wid/2){
            dis=game.Bound.LEFT+game.Role_Wid/2;
        }
        else
        {
            dis=pos.x
        }
        this.role.x=dis;
      //  cc.log(pos.x);
    },
    onMouseDown: function (pos) {

        this.addOneFruit(1);

        },
    createLocation:function(){


        cc.audioEngine.playEffect("V_ready.ogg", false);
        var size = cc.director.getWinSize();
        var sprite = cc.Sprite.create(res.Play_BG);
        sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(sprite, 0);

        this.spblood = cc.Sprite.create(res.BLOOD);
        this.spblood.setPosition(cc.p(0,15));
        this.addChild(this.spblood);
        this.spblood.anchorX=0;
        this.spblood.setScaleX(1);
        //进度条
        this.sp = cc.Sprite.create(res.PRO);
        this.sp.setPosition(size.width-18, size.height / 2-20-70);
        this.addChild(this.sp, 0);
        this.sp.anchorY=0;
        this.sp.setScaleY(0);


       //分数
        this.label = cc.LabelTTF.create("0 ", "Arial", 40);
        this.label.setPosition(cc.p(size.width/2,size.height-100));
        this.label.setString("0");
        this.addChild(this.label);
        //关卡
        var l = cc.LabelTTF.create("level", "Arial", 30);
        l.setPosition(cc.p(size.width/2-20,size.height-100-50));
        this.addChild(l);

        this.level = cc.LabelTTF.create("0", "Arial", 30);
        this.level.setPosition(cc.p(size.width/2+25,size.height-100-50));
        this.level.setString("0");
        this.addChild(this.level);




        //alert("yes");


    },


    addRole:function(){
        this.role=new Role();
        this.role.x=game.Role_Pos.x;
        this.role.y=game.Role_Pos.y;
        this.role.anchorY=0.3437;
        this.addChild(this.role);

    },

    addOneFruit:function(type){
        var random=parseInt(Math.random()*2);
        var fruit=new Fruit(type);
        fruit.x=game.Fruit_Pos1.x;
        if(random==1){
            fruit.y=game.Fruit_Pos1.y ;
        }else
        {
            fruit.y=game.Fruit_Pos2.y ;
            fruit.highbock=2;
        }
        this.addChild(fruit);
        this.FruitArr.push(fruit);
        fruit.runAction(cc.moveTo(game.Fruit_speed,{x:50+Math.random()*150,y:0}));


    }



});
