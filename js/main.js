var canvas
var ctx
var img=new Image()
var imgStar=new  Image()
var lasttime
var nowtime
var num=60
var star=[]
var switc=false
var optic=0
//定义星星类
var starObj=function(){
	this.x;
	this.y;
	this.picNum;
	this.timer;
	this.xsped;//定义的是星星的x轴方向的速度
	this.ysped;//定义的是星星y轴方向的速度
    
}
starObj.prototype.init=function(){
	this.x=Math.random()*600+100;
	this.y=Math.random()*400+100;
	//重生判断
	this.xsped=Math.random()*3-1.5;
	this.ysped=Math.random()*3-1.5;

	this.picNum=0;
	this.timer=0;
}
starObj.prototype.update=function()
{   this.x+=this.xsped*0.05;
	this.y+=this.ysped*0.05;
	//重生判断
	if(this.x<100||this.x>700)
	{
		this.init();
		return;
	}
	if(this.y<100||this.y>500)
	{
		this.init();
		return;
	}

	this.timer+=nowtime;
	if(this.timer>50)
	{
		this.picNum+=1;
		if(this.picNum>=7)
		{
			this.picNum=0;
		}
	}
	
}
starObj.prototype.draw=function(){
	ctx.save()
	ctx.globalAlpha=optic
	//drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	ctx.drawImage(imgStar,this.picNum*7,0,7,7,this.x,this.y,7,7);
	ctx.restore();
}

function init()
{
	canvas=document.getElementById("myCanvas");
	ctx=canvas.getContext("2d");
	//获得canvas的宽和高
	w=canvas.width;
	h=canvas.height;
	img.src="src/girl.jpg";
	imgStar.src="src/star.png";
	for (var i=0;i<num;i++)
	{
		var obj=new starObj();
		star.push(obj);
		star[i].init();
	}
    lasttime=Date.now()
	gameloop();
	//初始化鼠标事件
	document.addEventListener("mousemove",mousemove,false);
}
document.body.onload=init;
//使用循环来序列帧播放
function  gameloop()
{
	window.requestAnimFrame(gameloop);
	var now =Date.now();
	nowtime=now-lasttime;
	lasttime=now;
	drawBackground();
	drawGirl();
	drawStars();
	alivestar()
}

function drawBackground()
{
	ctx.fillStyle="#CC99FF";
	ctx.fillRect(0,0,w,h);
}
//绘制图片
function drawGirl()
{
	//drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
	ctx.drawImage(img,100,100,600,400);
}

function drawStars(){

	for(var i=0;i<num;i++)
	{    
		star[i].update();
		star[i].draw();
	}
}
//鼠标事件
function mousemove(e){
	var px=e.offsetX;
	var py=e.offsetY;
	if(px>100&&px<700&&py>100&&py<500)
	{   
		switc=true
	}
	else 
		{switc=false}
	console.log(switc);

}
//定义星星出现还是消失
function alivestar()
{
	if(switc)
	{
		optic+=0.03*nowtime*0.05;
		if(optic>1)
		{
			optic=1
		}
        
	}
	else 
	{
		optic-=0.03*nowtime*0.05;
		if(optic<0)
		{
			optic=0;
		}
	}
}