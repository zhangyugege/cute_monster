/**
 * Created by Administrator on 2015/6/9.
 */

game.FlySpeed=10;
game.Bound={
    LEFT:0,
    RIGHT:800,
    UP:440,
    DOWN:0
};

game.bubbleD=20;
var Bubble=cc.Sprite.extend({

    radius:0,
    isMoving:false,
    iscollide:false,
    iswin:false,
    ctor:function(){
        var pic=res.s_bubble;
        this._super(pic);
    },
    setfly:function(){
        this.isMoving=true;
    },
    update: function() {

        var size=cc.director.getWinSize();
        if(this.isMoving)
        {
            var bStop=false;
            var dx=game.FlySpeed * Math.cos(this.radius);
            var dy=game.FlySpeed * Math.sin(this.radius);

            //边缘判断

            var radius1=Math.atan2(350,200);
            var radius2=Math.atan2(-350,200)
            //var y1=this.x*1.75-450;
            //var y2=this.x*(-350/200)+1125;
            //右飞
            if(this.y+dy>=this.x*1.75){
                console.log("left");

                //方向改变
               this.radius=this.radius-radius1;//-(1.75);
               // this.setRadius(this.x,this.y,size.width/2,size.height/2+100);
                 dx=game.FlySpeed * Math.cos(this.radius);
                 dy=game.FlySpeed * Math.sin(this.radius);
            }
            //左飞
            else if(this.y+dy>=this.x*(-350/200)+1560){
                //this.setRadius(this.x,this.y,size.width/2,size.height/2+100);
                this.radius=this.radius-radius2;
                dx=game.FlySpeed * Math.cos(this.radius);
                dy=game.FlySpeed * Math.sin(this.radius);
            }


            //到顶
            if(this.y>=game.Bound.UP  || (this.isMoving==true && this.y<game.Bound.DOWN))
            {
                this.stopFly();
                this.removeFromParent(true);
             //   console.log("ops");
                game.coldingdown=false;
                game.isSetradius=false;
                this.unscheduleUpdate();
                return bStop;
            }

            this.x+=dx;
            this.y+=dy;

            return bStop;



        }

    },
    setxy:function(x,y)
    {
        this.x=x;
        this.y=y;


    },
    setRadius: function (x1, y1, x2, y2) {

        this.radius=Math.atan2(y2-y1,x2-x1);


    },
    stopFly:function(){
        this.isMoving=false;
    },
    setfall: function () {

     //   console.log("fallllllllll");
        this.scheduleUpdate();
       this.radius=2*Math.PI-this.radius;
      //  this.radius=Math.PI;
    },
    setbingo:function(){

        var size=cc.director.getWinSize();
        var x=size.width/2;
        var y=size.height/2+100;

    //    this.x=x;
     //   this.y=y;
        this.stopFly();
    //    console.log("dead now");
        //this.delayTime(1);
        this.removeFromParent(true);
        game.coldingdown=false;
        game.isSetradius=false;
        this.unscheduleUpdate();
        
        
        console.log("bingo");


    }


});