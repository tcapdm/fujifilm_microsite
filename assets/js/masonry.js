

$(document).ready(function(){
	var images = new Array(18);
	var imageH = new Array(18);
	var ctr=0;
	for(c1 = 0 ; c1<images.length; c1++){
		images[c1]="assets/img/designPic"+(c1+1)+".jpg";
		
		imageH[c1] = new Image();
		
		imageH[c1].onload = function(){
			ctr+=1;
			
			if(ctr  == imageH.length){
				masonry(images, imageH);
			}
		}
		
		imageH[c1].src = "assets/img/designPic"+(c1+1)+".jpg";
	}

});


function masonry(images, imageH){
	var i = 0;
	while (i < images.length) {
	
		$('#masonry-container').append('<div id="img'+(i+1)+'" class="grid-item grid-item--height2"><a href="'+images[i]+'" data-rel="lightcase:myCollection" title="Your title"><img class="zoom" src="'+images[i]+'" /><span class="bottomRight black-text"><b>&copy; Inagaki Norifumi</b></span></a></div>');

		i+=1;


	}
	
	$('.grid-item--height2').each(function() {
//		var h = Math.floor(Math.random() * 100) + 200;
//		var h = imageH[ctrM].height - 220;
//		console.log(imageH[ctrM].height);
//		$(this).css("height", h);
		$('.grid').masonry({
			itemSelector: '.grid-item'
		});
	
	});
}