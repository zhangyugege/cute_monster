/**
 * Created by Administrator on 2015/3/12.
 */


var res={
   // Start_BG:"res/bg2.png",
    Play_BG:"res/1.jpg",
    Role:"res/role.png",
    Fruit_0:"res/fruit.png",
    Fruit_1:"res/fruit2.png",
    Fruit_2:"res/nuion.png",
    Fruit_3:"res/nuion.png",
    Fruit_4:"res/fruit.png",
    Fruit_5:"res/fruit2.png",
    PRO:"res/pro.png",
    BOMB:"res/bomb.png",
    BLOOD:"res/blood.png"
    //Bubble_0:"res/bubble_0.png",
    //Bubble_1:"res/bubble_1.png",
    //Bubble_2:"res/bubble_2.png",
    //Bubble_3:"res/bubble_3.png",
    //Bubble_4:"res/bubble_4.png",
    //Bubble_5:"res/bubble_5.png",
    //Bubble_6:"res/bubble_6.png",
    //Bubble_7:"res/bubble_7.png",
    //Start_Btn:"res/PLAY.png",
    //Start_Btn2:"res/PLAY2.png",
    //Shooter:"res/bubble_shooter.png",
    //Sound_On:"res/sound-on.png",
    //Sound_Off:"res/sound-off.png",
    //Reset1:"res/replay_1.png",
    //Reset2:"res/restart.png"



};
//把所有的图片push到数组里一起加载
var g_resources=[];
for(var i in res){
    g_resources.push(res[i]);
}