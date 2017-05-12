function loadingImage(){
	var image = new Array(3);
	var imgCtr=0;
	for(c1 = 0; c1< image.length; c1++){
		image[c1] = new Image();
		image[c1].src = "assets/img/color/cam"+(c1+1)+".jpg";
		//console.log(image[c1]);
	}

	for(c1 = 0; c1< image.length; c1++){		
		image[c1].onload = function(){
			imgCtr++;
			if(imgCtr == image.length){

				moveColorSection(image);				
			}
		};
	}
}

function moveColorSection(arrayImage){
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	ctx.mozImageSmoothingEnabled = true;
	ctx.webkitImageSmoothingEnabled = true;
	ctx.msImageSmoothingEnabled = true;
	ctx.imageSmoothingEnabled = true;		

	if($(window).width() <= 500){
		canvas.height = 300;
	}else{
		canvas.height = arrayImage[0].height;
	}

	canvas.width = $(window).width();
	var imageTotalWidth = arrayImage[0].width / arrayImage.length;
	var imageTotalSpace = imageTotalWidth;

	var imageWidth = 0
	var imageSpace = imageTotalWidth;

	var canvasTotalWidth =  canvas.width / arrayImage.length;
	var CanvasTotalSpace = canvasTotalWidth;

	var canvasWidth = 0;
	var canvasSpace = canvasTotalWidth;

	var imgSx = new Array();
	var imgDx = new Array();

	for(c1 =0; c1<arrayImage.length; c1++){

		if(c1 ==0){

			imgSx[c1] = imageWidth;
			imgDx[c1] = canvasWidth;
			ctx.drawImage(arrayImage[c1], imgSx[c1], 0, imageSpace, arrayImage[c1].height, imgDx[c1], 0, canvasSpace, canvas.height);
			imgSx[c1] = imageWidth;
			imgDx[c1] = canvasWidth;

		}
		else{

			imageWidth+=imageTotalWidth;
			canvasWidth+=canvasTotalWidth;
			imgSx[c1] = imageWidth;
			imgDx[c1] = canvasWidth;
			ctx.drawImage(arrayImage[c1], imgSx[c1], 0, imageSpace, arrayImage[c1].height, imgDx[c1], 0, canvasSpace, canvas.height);	

		}

	}
	var boolean = 1;
	var click = canvas.addEventListener('click', function wew(evt) {
		var mousePos = getMousePos(canvas, evt);
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		var pos = mousePos.x;

		if(boolean == 1){

			for(c1 =0; c1<arrayImage.length; c1++){


				if(c1 == (arrayImage.length-1)){
					if(pos > imgDx[c1] ){
						var x = arrayImage[c1].width / arrayImage.length;
						var y = canvas.width / arrayImage.length;
						var max = arrayImage[c1].width;
						var maxCanvas = canvas.width;
						var img = arrayImage[c1];
						clearInterval(intervalMove);
						var interval = setInterval(function(){

							if(canvas.width < 500){
								ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, maxCanvas, canvas.height);
								clearInterval(interval);
								console.log("black");
							}else{
								if(x < max ){
									x+=100;
								}
								else{
									clearInterval(interval);
								}
								ctx.drawImage(img, 0, 0, x, img.height, 0, 0, x, canvas.height);
							}


						},10);
					}
				}
				else{

					if(pos > imgDx[c1] && pos < imgDx[c1+1]){
						var x = arrayImage[c1].width / arrayImage.length;
						var max = arrayImage[c1].width;
						var img = arrayImage[c1];
						clearInterval(intervalMove);
						var interval = setInterval(function(){
							if(canvas.width < 500){
								ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, maxCanvas, canvas.height);
								clearInterval(interval);
								console.log("bronw");
							}else{
								if(x < max ){
									x+=100;
								}
								else{
									clearInterval(interval);
								}
								ctx.drawImage(img, 0, 0, x, img.height, 0, 0, x, canvas.height);
							}
						},10);


					}
				}

			}
			boolean =0;
					}// end of true
					
					else{
						
						canvas.width = $(window).width();
						var imageTotalWidth = arrayImage[0].width / arrayImage.length;
						var imageTotalSpace = imageTotalWidth;

						var imageWidth = 0
						var imageSpace = imageTotalWidth;

						var canvasTotalWidth =  canvas.width / arrayImage.length;
						var CanvasTotalSpace = canvasTotalWidth;

						var canvasWidth = 0;
						var canvasSpace = canvasTotalWidth;

						

						for(c1 =0; c1<arrayImage.length; c1++){

							if(c1 ==0){

								imgSx[c1] = imageWidth;
								imgDx[c1] = canvasWidth;
								ctx.drawImage(arrayImage[c1], imgSx[c1], 0, imageSpace, arrayImage[c1].height, imgDx[c1], 0, canvasSpace, canvas.height);
								imgSx[c1] = imageWidth;
								imgDx[c1] = canvasWidth;

							}
							else{

								imageWidth+=imageTotalWidth;
								canvasWidth+=canvasTotalWidth;
								imgSx[c1] = imageWidth;
								imgDx[c1] = canvasWidth;
								ctx.drawImage(arrayImage[c1], imgSx[c1], 0, imageSpace, arrayImage[c1].height, imgDx[c1], 0, canvasSpace, canvas.height);	

							}

						}
						boolean =1;
					}


				},false);

	var mouseOver = canvas.addEventListener('mouseover', function wew(evt) {
		var mousePos = getMousePos(canvas, evt);
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		var pos = mousePos.x;

		clearInterval(intervalMove);
		//moveCamera(pos, arrayImage, imgSx, imgDx, canvas, imageSpace, canvasSpace, ctx);

	},false);

	canvas.addEventListener('mouseout', function(evt){
		clearInterval(intervalMove);
	},false);

}// END OF FUNCTION MOVECOLOR

var intervalMove;
function moveCamera(pos, arrayImage, imgSx, imgDx, canvas, imageSpace, canvasSpace, ctx){

	if(canvas.width < 500){

	}
	else{

		if(pos >= ($(window).width()/2)){
			intervalMove = setInterval(function(){
				for(c1 = 0 ; c1<arrayImage.length ; c1++){

					imgSx[c1]-=(arrayImage.length+3);
					imgDx[c1]-=(arrayImage.length+3);	

					if(imgSx[c1] < 0 && imgDx[c1] < 0){
						imgSx[c1] = arrayImage[c1].width;
						imgDx[c1] = canvas.width;
					}
				}

				for(c1 =0; c1<arrayImage.length; c1++){
					ctx.drawImage(arrayImage[c1], imgSx[c1], 0, imageSpace, arrayImage[c1].height, imgDx[c1], 0, canvasSpace, canvas.height);	
				}
			},10);


			console.log("MOVE LEFT");

		}
		else if(pos <=  (($(window).width()/2)+30)){ 	
			intervalMove = setInterval(function(){
				for(c1 = 0 ; c1<arrayImage.length ; c1++){

					imgSx[c1]+=(arrayImage.length+3);
					imgDx[c1]+=(arrayImage.length+3);	

					if(imgSx[c1] > arrayImage[c1].width && imgDx[c1] > canvas.width){
						imgSx[c1] = 0;
						imgDx[c1] = 0;
					}
				}

				for(c1 =0; c1<arrayImage.length; c1++){
					ctx.drawImage(arrayImage[c1], imgSx[c1], 0, imageSpace, arrayImage[c1].height, imgDx[c1], 0, canvasSpace, canvas.height);	
				}
			},10)
		}

	}


}

function getMousePos(canvas,evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}



function drags(dragElement, resizeElement, container) {

			// Initialize the dragging event on mousedown.
			dragElement.on('mousedown touchstart', function(e) {

				dragElement.addClass('draggable');
				resizeElement.addClass('resizable');

			// Check if it's a mouse or touch event and pass along the correct value
			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			// Get the initial position
			var dragWidth = dragElement.outerWidth(),
			posX = dragElement.offset().left + dragWidth - startX,
			containerOffset = container.offset().left,
			containerWidth = container.outerWidth();

			// Set limits
			minLeft = containerOffset + 10;
			maxLeft = containerOffset + containerWidth - dragWidth - 10;

			// Calculate the dragging distance on mousemove.
			dragElement.parents().on("mousemove touchmove", function(e) {

			// Check if it's a mouse or touch event and pass along the correct value
			var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			leftValue = moveX + posX - dragWidth;

			// Prevent going off limits
			if ( leftValue < minLeft) {
				leftValue = minLeft;
			} else if (leftValue > maxLeft) {
				leftValue = maxLeft;
			}

			// Translate the handle's left value to masked divs width.
			widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

			// Set the new values for the slider and the handle. 
			// Bind mouseup events to stop dragging.
			$('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
				$(this).removeClass('draggable');
				resizeElement.removeClass('resizable');
			});
			$('.resizable').css('width', widthValue);
		}).on('mouseup touchend touchcancel', function(){
			dragElement.removeClass('draggable');
			resizeElement.removeClass('resizable');
		});
		e.preventDefault();
	}).on('mouseup touchend touchcancel', function(e){
		dragElement.removeClass('draggable');
		resizeElement.removeClass('resizable');
	});
}




$(document).ready(function(){

	if ($('a[data-rel^=lightcase]').length) {

		$('a[data-rel^=lightcase]').lightcase({

		});
	}

	// Fuji -digital
	$('ul.tabs').tabs();                          

	$('ul.tabs').tabs('select_tab', 'tab_id');    

	$('.container.digital .fuji:odd').css('background-color', '#eceff1');

	$('#right-button').click(function() {
		event.preventDefault();
		$('#myTab').animate({
			scrollLeft: "+=320px"
		}, "slow");
	});

	$('#left-button').click(function() {
		event.preventDefault();
		$('#myTab').animate({
			scrollLeft: "-=320px"
		}, "slow");
	});


	var $fujiElements = $('.fuji');                    

	$('.filter_link').click(function(e){
		e.preventDefault();
		// get the category from the attribute
		var filterVal = $(this).data('filter');

		if(filterVal === 'all'){
			$fujiElements.show();
		}else{
			// hide all then filter the ones to show
			$fujiElements.hide().filter('.' + filterVal).show();
		}
	});



	// Fuji PDP

	$("#videos iframe").width("100%");
	$("#videos iframe").height("350");

	var iframeArray = new Array;
	if ($("#videos iframe").length) {
		$("#videos iframe").each(function(){
			iframeArray.push($("iframe").attr("src"));
		});
	}

	if(iframeArray.length >=5){
		$('#videos .carousel').width("80%");
	}
	else if($(window).width() < 500){
		$('#videos .carousel').width("90%");
		console.log("pasok");
	}
	else{
		$('#videos .carousel').width((iframeArray.length*20)+"%");
		console.log("dito");
	}	

	var ctrIframe =0;
	var ctrCarousel =0;
	$("#btnArrowRight").click(function(){
		$('#videos .carousel').carousel('next');


		if(ctrIframe >= $("#videos iframe").length){
			ctrIframe=0;
		}

		if($("#videos .carousel-item").eq(ctrIframe).css("z-index")== 0){
			ctrCarousel+=1;
			if(ctrCarousel >=$("#videos iframe").length ){
				ctrCarousel=0;
			}
			var autoplay = iframeArray[ctrCarousel];
			autoplay+= "?autoplay=1";
			$("#videos iframe").eq(ctrCarousel).attr("src", autoplay);


			console.log(ctrCarousel);

			var autoplay = iframeArray[ctrIframe];
			autoplay+= "?autoplay=0";
			$("#videos iframe").eq(ctrIframe).attr("src", autoplay);
			console.log("pause\t"+$("#videos iframe").eq(ctrIframe).attr("src"));
		}
		console.log("iframe \t"+ctrIframe);
		ctrIframe+=1;



	});

	$("#btnArrowLeft").click(function(){
		$('#videos .carousel').carousel('prev');

		if(ctrIframe <  0){
			ctrIframe= $("#videos iframe").length-1;
			ctrCarousel = $("#videos iframe").length-1;
		}

		if($("#videos .carousel-item").eq(ctrIframe).css("z-index")== 0){
			ctrCarousel-=1;
			if(ctrCarousel <0 ){
				ctrCarousel=$("#videos iframe").length-1;
			}
			var autoplay = iframeArray[ctrCarousel];
			autoplay+= "?autoplay=1";
			$("#videos iframe").eq(ctrCarousel).attr("src", autoplay);

			console.log(ctrCarousel);

			var autoplay = iframeArray[ctrIframe];
			console.log("index\t"+ iframeArray[ctrIframe]);
			autoplay+= "?autoplay=0";
			$("#videos iframe").eq(ctrIframe).attr("src", autoplay);
			console.log("pause\t"+$("#videos iframe").eq(ctrIframe).attr("src"));
		}

		ctrIframe-=1;


		console.log("iframe \t"+ctrIframe);


	});


	$("#btn-menu").click(function(){

		$("#btn-menu").toggleClass("active");
		$("#white").toggleClass("whiteNew");

	});

	$('#videos .carousel').carousel();
	var headerTopHeight = $('.header .header-top').outerHeight();
	$('ul.srllspy .scrollspy').scrollSpy({
		scrollOffset: headerTopHeight
	});

	var top = $("#sectionFrontBackView").offset().top;
	var top2 = $("#videos").offset().top;
	$(window).scroll(function(){
		if($(window).scrollTop() >= top){
			$("#tblOfContents").addClass("fixedContent");


		}
		else{
			$("#tblOfContents").removeClass("fixedContent");


		}


		if($(window).scrollTop() >= top2){

			$("#btn-menu").slideDown();
		}
		else{

			$("#btn-menu").slideUp();

		}
	});



	loadingImage();



	if($('.ba-slider').length) {
		$('.ba-slider').each(function(){
			var cur = $(this);
			// Adjust the slider
			var width = cur.width()+'px';
			cur.find('.resize img').css('width', width);
			// Bind dragging events
			drags(cur.find('.handle'), cur.find('.resize'), cur);
		});
	}




	$(window).resize(function(){
		if($('.ba-slider').length) {
			$('.ba-slider').each(function(){
				var cur = $(this);
				var width = cur.width()+'px';
				cur.find('.resize img').css('width', width);
			});
		}
	});



});