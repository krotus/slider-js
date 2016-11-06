var Slider = function(build){

	this.images = {
		"files": [],
		"size": 0
	};
	this.pagination = true;
	this.delay 		= 1000;
	this.height		= 450;

	var timer = null;

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

	this.render = function(){
		var html = generateHTML();
		$("#slider").append(html);
	}

	this.update = function(){
		timer = setInterval(function(){
			var position = 0;
			var lastPosition = that.images.size - 1;
			$("div.item").each(function(index){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$("ul li span.dot").eq(index).removeClass('current-dot');
					position = index;
					if(position == lastPosition){
						position = 0;
					}else{
						position++;
					}
				}
				
			});
			//image to show
			$("div.item").eq(position).addClass('active');
			//pagination
			$("ul li span.dot").eq(position).addClass('current-dot');
		}, this.delay);
	}

	var generateHTML = function(){
		var html = "<div id='slider-items'>";
		//item for each images
		for(var i = 0; i < that.images.size; i++){
			if(i == 0) {
				html += "<div class='item active'>";	
			}else{
				html += "<div class='item'>";
			}
			html += "<img src='" + that.images.files[i] + "'>"
			html += "</div>";
		}
		//pagination style for each image
		html += "<ul class='pagination'>";
		for (var i = 0; i < that.images.size; i++) {
			if(i == 0){
				html += "<li><span data-image='" + i + "' class='dot current-dot'></span></li>";
			}else{
				html += "<li><span data-image='" + i + "' class='dot'></span></li>";
			}
		}
		html += "</ul>";

		//control page
		html += "<div class='controls'>";
		html +=		"<span class='prev'></span>";
		html +=		"<span class='next'></span>";
		html +=	"</div>";
		
		html += "</div>";
		return html;
	}

	this.setEvents = function(){

		//pagination
		$(document).on("click", "span.dot", function(e){
			e.preventDefault();
			$("span.dot").removeClass("current-dot");
			$("div.item").removeClass("active");
			$(this).addClass("current-dot");
			$("div.item").eq($(this).data("image")).addClass('active');
			clearInterval(timer);
			that.update();
		});

		//controls
		$(document).on("click", "div.controls span", function(e){
			e.preventDefault();
			var currentImage = parseInt($("span.dot.current-dot").data("image"));
			var followImage = null;
			var lastImage = that.images.size - 1;
			
			if($(this).hasClass("prev")){ //prev
				if(currentImage == 0){
					followImage = lastImage;
				}else{
					followImage = currentImage - 1;
				}
			}else{ //next
				if(currentImage == lastImage){
					followImage = 0;
				}else{
					followImage = currentImage + 1;
				}
			}
			$("span.dot").removeClass("current-dot");
			$("div.item").removeClass("active");
			$("span.dot").eq(followImage).addClass("current-dot");
			$("div.item").eq(followImage).addClass("active");
			clearInterval(timer);
			that.update();
		});
	}

	this.init = function(){
		this.render();
		this.update();
		this.setEvents();
	}

	this.init();

}


