/*
*文字输入效果
*by lxx
*param {el,text,interval} 需要加载字体的节点，加载的文字，输入间隔的时间
*/
(function(g,factory){
	g.Itext=factory();
}(this,(function(){

function Itime(_I){
	this.vm=_I;
	this.list=_I.text.split("");
	this.interval=_I.interval;
	this.index=0;
	this.text="&nbsp;&nbsp;&nbsp;";
	this._init();
}

Itime.prototype={
	loop:function(self){
		return function(){
			self.text=self.text+self.list[self.index];
			self.vm.node.innerHTML=self.text+'_';
	    	self.index++;
	    	if(self.index<self.list.length){
	    		self.timeout2=setTimeout(self.loop(self),self.interval);
	    	}else{
	     		self.vm.node.innerHTML=self.vm.text;
	    	}
		}
	},
	_init:function(){
		this.timeout1=setTimeout(this.loop(this),1000);
		
	},
	_clear:function(){
		this.text="&nbsp;&nbsp;&nbsp;";
		clearTimeout(this.timeout1);
		clearTimeout(this.timeout2); 
		console.log("清除轮询临时变量初始化");
	}
}

//入口类
function Itext(conf){
	this.node=conf.el||"";
	this.text=conf.text||"一个比较简单的文字输出效果的小插件，做的很简单！希望大家提出宝贵的意见。";
	this.interval=conf.interval||1000;
	this._init();
};
Itext.prototype={
	_init:function(){
		if(this.node instanceof Node){
			console.log("请传入正确的节点");
			return;
		}
		this._time=new Itime(this);
	},
	_empty:function(){
		this._time._clear();
	}
}

return Itext;

})));