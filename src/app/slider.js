var Slider = function(build){

	this.images = {
		"files": [],
		"size": 0
	};

	this.pagination = true;
	this.delay 		= 1000;

	if(build instanceof Object){
		if(build.images && build.images instanceof Array){
			this.images.files = build.images;
			this.images.size = build.images.length;
		}
		if(build.pagination){
			this.pagination = build.pagination;
		} 
		if(build.delay){
			this.delay = build.delay;	
		} 
	}

	var that = this;

	this.addImage = function(image){
		this.images.files.push(image);
		this.images.size++;
	}

	this.removeImage = function(image){
		for(var i = 0; i < this.images.files.length; i++){
			if(this.images.files[i] == image){
				this.images.files.splice(i, 1);
				break;
			}
		}
		this.images.size--;
	}

	this.createDOM = function(){
		var html = generateHTML();
		$("#slider").append(html);
	}

	this.changeImage = function(){
		setInterval(function(){
			var position = 0;
			var lastPosition = that.images.size - 1;
			$("div.item").each(function(index){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					position = index;
					if(position == lastPosition){
						position = 0;
					}else{
						position++;
					}
				}
				
			});
			$("div.item").eq(position).addClass('active');
		}, this.delay);
	}

	var generateHTML = function(){
		var html = "<div id='slider-items'>";
		for(var i = 0; i < that.images.files.length; i++){
			if(i == 0) {
				html += "<div class='item active'>";	
			}else{
				html += "<div class='item'>";
			}
			html += "<img src='" + that.images.files[i] + "'>"
			html += "</div>";
		}
		html += "</div>";
		return html;
	}

	this.init = function(){
		this.createDOM();
		this.changeImage();
	}

	this.init();

}


