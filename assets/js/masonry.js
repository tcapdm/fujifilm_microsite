

$(document).ready(function(){
	var images = new Array(18);

	for(c1 = 0 ; c1<images.length; c1++){
		images[c1]="images/designPic"+(c1+1)+".jpg";
	}

	var i = 0;
	while (i < images.length) {
		
	
		$('#masonry-container').append('<div id="img'+(i+1)+'" class="grid-item grid-item--height2"><a href="'+images[i]+'" data-rel="lightcase:myCollection" title="Your title"><img class="zoom" src="'+images[i]+'"  /><span class="bottomRight black-text"><b>&copy; Inagaki Norifumi</b></span></a></div>');
		
		i+=1;


	}
	var masonryCtr =0;
	var ctrM=0;
	$('.grid-item--height2').each(function() {
		masonryCtr +=1;
//		var h = Math.floor(Math.random() * 100) + 200;
		var h = images[ctrM].height;
		console.log(images[ctrM].height);
		$(this).css("height", h);
		
		$('.grid').masonry({
			itemSelector: '.grid-item'
		});
		ctrM+=1;
	});



});