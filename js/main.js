function hidePreloader(){
	$("#preload").fadeOut(200);
	$("#preload .icon").fadeOut(400);
	$("#preload").fadeOut(600);
}

$(window).load(function(){
	//runIsotope();
	hidePreloader();
});

	