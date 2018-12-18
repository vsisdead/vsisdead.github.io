window.onscroll = function() {
	if ($('.menu').offset().top >= (2*window.innerHeight)) {
		$('.menu').css('display','none');
	}
	else {
		$('.menu').css('display','flex');
	}
};

function scrollim() {
	$('html, body').animate({scrollTop: window.innerHeight},300);
}