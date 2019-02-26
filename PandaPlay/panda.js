$(document).ready(function() {
	var interval;
	var slides = [
		1,
		{img: "img/family1.jpg"},
		{img: "img/jumping.jpg"},
		{img: "img/mini.jpg"},
		{img: "img/funny.jpg"},
		{img: "img/party.jpg"},
		{img: "img/staircase.jpg"}
	];
	
	/* SLIDE INTERVAL*/
	function startSlideInterval(){interval = setInterval(function(){$(".next").click();},5000);} //trigger the next-button on every interval
	$('.slide').hover(function(){clearInterval(interval);},startSlideInterval); //clear interval on 'hover', restart interval on 'unhover'
	
	/* SHOW SLIDE */
	function showSlide(n) {
		if (n>slides.length-1) {n=1;} else if (n<1) {n=slides.length-1;} //loop around to first/last slide
		$(".slide img").attr("src",slides[n].img); //change image
		$(".slide div").html(slides[n].txt); //change text
		$(".slide").fadeTo(0,.4,function(){$(this).fadeTo(1500,1);}); //fade new slide
		slides[0] = n; //set slide-index to new value
	}
	
	/* ARROWS */
	$(".prev").click(function(){showSlide(slides[0]-1);}); //click-handler
	$(".next").click(function(){showSlide(slides[0]+1);}); //click-handler
	
	
	/* INITIALIZE */
	showSlide(slides[0]); //show the first slide
	startSlideInterval(); //start slide-interval
});