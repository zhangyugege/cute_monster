/**
 * Created by Administrator on 2015/3/12.
 */

game.RunSpeed=10;
var Fruit=cc.Sprite.extend({
    type:0,
    isFlying:false,
    highbock:1,
    isMoving:true,
    ctor:function(type){
        this.type=type;
        var pic=res["Fruit_"+type];
        this._super(pic);
    },
    knockBound: function () {

    },
    update:function(){



    }



});

