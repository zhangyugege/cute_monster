/**
 * Created by Administrator on 2015/6/7.
 */

game.coldingdown=false;
game.isSetradius=false;
game.result=true;
game.scalepercent=0.6;
game.level=1;
game.maxblood=700;
game.checkCircleCollision=function(p1,p2,r1,r2){
    var r = Math.pow((p2.x-p1.x),2)+Math.pow((p2.y-p1.y),2)<=Math.pow((r2+r1),2);
    return r;
};
var StartScene = cc.Scene.extend(
    {

        logo_x:null,
        logo_y:null,
        logo:null,
        dx:7,
        handbegin:null,
        movebeganx:0,
        movebegany:0,
        bomb:null,
        iscollide:false,
        progressratemax:game.maxblood-game.level*50,
        progressrate:game.maxblood-game.level*50,
        progress:null,
        startflag:false,
        pre:null,
        ctor: function () {
            this._super();
            this.scheduleUpdate();
            this.init();
			this.ready();
            this.addbg();
            this.addlogo();
            this.addProgress();
            this.addEventListener();
            this.addpreview();
            this.progressratemax=game.maxblood-Math.abs(game.level%10)*50;
            this.progressrate=game.maxblood-Math.abs(game.level%10)*50;
            if(this.progressrate<=150)
            {
                this.progressratemax=game.maxblood-Math.abs(game.level%10)*10;
                this.progressrate=game.maxblood-Math.abs(game.level%10)*10;
            }
            else if(this.progressrate<=90)
            {
                this.progressratemax=game.maxblood-Math.abs(game.level%5);
                this.progressrate=game.maxblood-Math.abs(game.level%5);
            }
            this.dx=7+game.level;
            console.log(game.level+" "+this.progressratemax+" "+this.dx);

            game.result=true;




        },
        addpreview:function(){
            
            
            if(game.level==1)
            {
                var size=cc.director.getWinSize();
                this.pre=new cc.Sprite(res.s_preview);
                this.pre.setPosition(size.width/2,size.height/2-22);
                this.addChild(this.pre,200);
                this.pre.setScale(0.7);
            
            
            }
        
            
        
        },
        ready:function(){
        	if(game.level==1)
            {
            	this.startflag=false;
            }
            else
                this.startflag=true;
        
        },
        start:function(){
            this.startflag=true;
            if(this.pre)this.pre.removeFromParent(true);
            
            
        },
        addProgress:function(){

            var size=cc.director.getWinSize();
            this.progress=new cc.Sprite(res.s_progress);
            this.progress._setAnchorX(0);
            this.progress.setPosition(size.width/2-142,size.height/2+216);
            this.progress.setScale(0.7);
            this.addChild(this.progress);






        },
        onExit:function(){
            this.unscheduleUpdate();
        },

        update : function ( dt ) {
            
            
            if(this.startflag==true)
            {
            
            
            	
                if(this.progressrate>0)
                {
                    this.progressrate--;
                    this.progress.setScaleX(this.progressrate/this.progressratemax*0.7);
                }
                else if (this.progressrate<=0)
                {
                    this.gameover();
    
                }
    
                this.logo.x+=this.dx;
                if(this.logo.x>=570 ||this.logo.x<=230 )
                {
    
                    this.dx=-this.dx;
                }
    
    
                 if(this.bubble)
                 {
    
                     this.bubble.update();
                     if(this.bubble.isMoving)this.isCollision();
    
                 }
    
    
    
                if(this.bomb)
                {
                    this.bomb.x=this.logo.x+(357/2)*game.scalepercent;
                    this.bomb.y=this.logo.y+(123/2)*game.scalepercent
    
    
    
                }
                
            
            }



        },
        gameover:function(){


            game.result=false;
            cc.director.runScene(new pauseScene());


        },
        gamewin: function () {
            cc.director.runScene(new pauseScene());
        },
        isCollision:function(){

            var size=cc.director.getWinSize();
            if(this.bubble && this.bubble.iscollide==false) {
                this.bubble.iscollide = true;
                var l = this.bubble.x + 21 > this.logo.x - (350 / 2) * game.scalepercent;
                var r = this.bubble.x - 21 < this.logo.x + (350 / 2) * game.scalepercent;
                var t = this.bubble.y + 21 > this.logo.y - (150 / 2) * game.scalepercent;
                var b = this.bubble.y - 21 < this.logo.y + (150 / 2) * game.scalepercent;

                if (r && l && t && b) {

                    this.addbomb(this.logo.x, this.logo.y);
                    this.bubble.setfall();

                    return;

                }else
                    this.bubble.iscollide=false;

            }
            //if(this.bubble && this.bubble.iswin==false && this.bubble.iscollide==false)
            //{
            //    this.bubble.iswin=true;
            //    var l=this.bubble.x+21>size.width/2-50;
            //    var r=this.bubble.x-21<size.width/2+50;
            //    var t=this.bubble.y+21>size.height/2+100-50;
            //    var b=this.bubble.x-21<size.width/2+50+100;
            //    if(l&&r&&t)
            //    {
            //        this.bubble.setbingo();
            //
            //    }
            //
            //}

            if(this.bubble && this.bubble.iswin==false   && this.bubble.y>this.logo.y+60)
            {
                this.bubble.iswin=true;
                //var l=this.bubble.x+21>size.width/2-50;
                //var r=this.bubble.x-21<size.width/2+50;
                //var t=this.bubble.y+21>size.height/2+100-50;
                //var b=this.bubble.x-21<size.width/2+50+100;
                //if(l&&r&&t)
                //{ 
                
                
                this.setAnimation(this.bubble.x,this.bubble.y);  
                this.bubble.setbingo();


                   


                //}

            }





        },

        setAnimation:function(x,y){

            var size=cc.director.getWinSize();
           // console.log("set animation");
            var q=new cc.Sprite(res.s_bubble);
            q.setPosition(x,y);
            this.addChild(q);

            var that=this;
            q.runAction(
//
//,
                new cc.Sequence(new cc.moveTo(Math.abs(x-size.width/2)*0.001,cc.p(size.width/2,size.height/2+100)),new cc.delayTime(0.2),cc.callFunc(function remove(q){

                    q.removeFromParent(true);
                    this.gamewin();

                },this,q)))





        },
        addbomb: function (x,y) {

            this.bomb=new cc.Sprite(res.s_bomb);
            this.bomb.setScale(0.7);
            this.bomb.setPosition(x+(357/2)*game.scalepercent,y+(123/2)*game.scalepercent);
            this.addChild(this.bomb);
            this.bomb.runAction(


                new cc.Sequence(cc.delayTime(0.6),cc.blink(1,0.2),cc.callFunc(function remove(bomb){

                    bomb.removeFromParent(true);

                },this,this.bomb)))

        },
        addEventListener: function () {
            var that=this;

            var eventListener=cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    var pos = touch.getLocation();
                     console.log("start");
                    if(that.startflag==false)
                    {
                        console.log("start");
                        that.start();
                        return true;
                    
                    }
                    
                    var size=cc.director.getWinSize();
                    if(game.coldingdown==false)
                    {
                        that.handbegin=new cc.Sprite(res.s_hand_begin);
                        that.handbegin.setPosition(pos.x,pos.y);
                        if(that.handbegin.x<400)that.handbegin.setFlippedX(true);
                        that.addChild(that.handbegin,100);
                        that.movebeganx=pos.x;
                        that.movebegany=pos.y;
                        that.addbubble(pos.x,pos.y);

                        that.bubble.setRadius(that.movebeganx,that.movebegany,size.width/2,size.height-100);

                    }


                    return true;
                },
                onTouchMoved: function (touch, event) {
                    var pos = touch.getLocation();
                   if(that.handbegin)
                   {
                       that.handbegin.setPosition(pos.x,pos.y);
                       if(that.handbegin.x<400)that.handbegin.setFlippedX(true);


                   }


                   if(that.bubble)
                   {
                       if(that.bubble.y>=100 && game.isSetradius==false)
                       {
                           game.isSetradius=true;

                           //console.log(that.movebeganx+" "+that.movebegany+" "+pos.x+" "+pos.y);
                       }
                       that.bubble.setxy(pos.x,pos.y);
                   }
                    return true;
                },
                onTouchEnded: function (touch, event) {
                    var pos = touch.getLocation();

                    if(that.handbegin)that.handbegin.removeFromParent(true);
                    if(that.bubble)
                    {

                        that.bubble.setRadius(that.movebeganx,that.movebegany,pos.x,pos.y);
                        that.bubble.setfly();

                    }




                    return true;
                }

            });

            cc.eventManager.addListener(eventListener,this);

        },
        addbubble:function(x,y){



            game.coldingdown=true;
            this.bubble=new Bubble();
            this.bubble.attr(
                {
                    x:x,
                    y:y
                }
            );
            this.addChild(this.bubble);


        },
        addbg: function () {
            var size=cc.director.getWinSize();



            //load background
            var bg=new cc.Sprite(res.s_bg);
            bg.setPosition(size.width/2,size.height/2);
            bg.setScale(0.7);
            this.addChild(bg,0);
        },
        addlogo:function(){

            var size=cc.director.getWinSize();
            this.logo=new cc.Sprite(res.s_logo);
            this.logo_x=size.width/2;
            this.logo_y=size.height/2+20;
            this.logo.setPosition(this.logo_x,this.logo_y);
            this.logo.setScale(game.scalepercent);
            this.addChild(this.logo,100);


        }



    }
);