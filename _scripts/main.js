$(document).ready(function() {	
/*********************************
************* COOKIES ************
**********************************/
	/* if cookie info exist, add padding to the body */
	if($("#cookie-info-wrap").length > 0) {
		$("body").css("padding-top",$("#cookie-info-wrap").height()); 
		$(window).load(function() {
			$("#cookie-info-accept").css("top",($("#cookie-info-wrap").height() - ($("#cookie-info-accept").height()+14)) /2); 
		});
	}
	
	$("#cookie-info-accept").click(function() {
		$.post("/ajax/cookie",function(data) {
			if(data == 1) {
				$("#cookie-info-wrap").animate({height:0},600, function() {
					$(this).remove();
				});
				$("body").animate({paddingTop:0},600);
			}
		});
	});

/*********************************
************ SLIDESHOW ***********
**********************************/
	if($("#slideshow .slide").length == 1) {
		var l = $(".slide").first().hasClass("type-link") ? '<a href="'+$(".slide").first().attr("href")+'" id="slide-text-link" class="font-yanone size-23 colour-white">SEE MORE <span class="display-block">&nbsp;</span></a>' : '';
		$("#slide-text-inside").html('<span id="slide-text-title" class="font-lucida colour-white size-30">'+$(".slide").first().find("img").attr("alt")+'</span><div id="slide-text-desc">'+$(".slide").first().find(".slide-text").eq(0).text()+'</div>'+l);
		$("#slide-text").fadeIn(200);
	}
	
	if($("#c-slideshow .slide").length == 1) {
		if($("#c-slideshow .slide").first().find(".slide-text").length > 0) {
			$("#c-slideshow-text div:first").html($("#c-slideshow .slide").first().find(".slide-text").first().text());
			$("#c-slideshow-text").fadeIn(200);
		}
		$("#c-slideshow-prev").css("display","none");
		$("#c-slideshow-next").css("display","none");
	}
	$('#slideshow').cycle({ 
		fx:     'fade',
		speed:  '3000',
		pager:  '#slide-navigation', 
		before: function() {
			if($(this).find(".slide-text").length > 0) {
				var l = $(this).hasClass("type-link") ? '<a href="'+$(this).attr("href")+'" id="slide-text-link" class="font-yanone size-23 colour-white">SEE MORE <span class="display-block">&nbsp;</span></a>' : '';
				$("#slide-text-inside").html('<div id="slideshow-prev">&nbsp;</div><span id="slide-text-title" class="font-lucida colour-white size-30">'+$(this).find("img").attr("alt")+'<span id="slideshow-next">&nbsp;</span></span><div id="slide-text-desc">'+$(this).find(".slide-text").eq(0).text()+'</div>'+l);
				if($("#slide-text").css("display") == "none") {
					$("#slide-text").fadeIn(250);
				}
			}
			else {
				$("#slide-text-inside").html("");
				$("#slide-text").fadeOut(250);
			}
		}		
	}); 
	
	$(document).on("click", "#slideshow-prev", function() {
		$("#slideshow").cycle("prev");
	});
	$(document).on("click", "#slideshow-next", function() {
		$("#slideshow").cycle("next");
	});
	
	$("#c-slideshow").cycle({
		fx:		"fade",
		speed:	"2000",
		prev:	"#c-slideshow-prev",
		next:	"#c-slideshow-next", 
		before: function() {
			if($(this).find(".slide-text").length > 0) { 
				if($("#c-slideshow-text").css("display") == "none") {
					$("#c-slideshow-text").fadeIn(250);
					$("#c-slideshow-text > div:first").html($(this).find(".slide-text").text());
				}
			}
			else {
				$("#c-slideshow-text > div:first").html("");
				$("#c-slideshow-text").fadeOut(250);
			}
		}		
	});
	
	$(".news-gallery").each(function() {
		var id = $(this).prop("id").split("-")[1];
		$(this).cycle({
			fx:"fade",
			speed:"2000",
			timeout:0,
			next:"#ngr-"+id,
			prev:"#ngl-"+id
		});
	});
	

/*********************************
****** CKEDITOR & COLORBOX *******
**********************************/
	$("span.lightbox").each(function(index) {
		var img = $(this).find("img").eq(0);  
		$(this).wrap('<a href="'+img.prop('src')+'" class="lightbox"></a>');
	});
	$(".gal, .lightbox, .blog-post-image, #post-image").not(".no-colorbox").colorbox({
		height:"80%",
		scrolling:true,
		rel:'gal',
		current:colorboxLabels.current,
		previous:colorboxLabels.previous,
		next:colorboxLabels.next,
		close:colorboxLabels.close,
		xhrError:colorboxLabels.xhrError,
		imgError:colorboxLabels.imgError
	}); 
	

/*********************************
*********** PROMOBOX *************
**********************************/ 
	if($("#promobox").length > 0) { 
		var fitW = promoboxFitWindow;
		var orgHeight = promoboxOriginalHeight;
		var orgWidth = promoboxOriginalWidth;
		var bodyHeight = $(window).height();
		var bodyWidth = $(window).width(); 
		 
		$("#promobox").show().css("opacity",0);
		var textHeight = $("#promobox-text").height() || 0;
		
		if(fitW == "1") {
			
			// Fit height to window
			 $("#promobox-inside").height(bodyHeight - (textHeight+60));
			 
			// Calculate the width
			 var newWidth = (orgWidth * $("#promobox-inside").height()) / orgHeight;
			 $("#promobox-inside").width(newWidth);
			 
			// If new width is longer than body, set new width and calculate the height again
			 if(newWidth >= bodyWidth+40) {
				 $("#promobox-inside").width(bodyWidth-60);
				 $("#promobox-inside").height(($("#promobox-inside").width() * orgHeight) / orgWidth);
			 
			 }
			// If body height is bigger than calculated height, make the promobx vertically positioned
			if(bodyHeight > ($("#promobox-inside").height() + 60)) {
				$("#promobox-inside").css("margin-top",(bodyHeight - ($("#promobox-inside").height()+40))/2);
			}
			$("#promobox-image").height( $("#promobox-inside").height() - (textHeight));
		}
		
		else {
			 
			$("#promobox-inside").height(orgHeight+textHeight);
			
			// If body height is smaller than original promobox size, show scroll
			if(bodyHeight < $("#promobox-inside").height()) { 
				$("#promobox-inside").css("margin-top",10);
			}
			else {
				$("#promobox-inside").css("margin-top",(bodyHeight - ($("#promobox-inside").height()+40))/2);
			}
			
			$("#promobox-inside").width(orgWidth);
		
			$(window).resize(function() {
				var bodyHeight = $("body").height();
				if(bodyHeight > ($("#promobox-inside").height() + 60)) {
					$("#promobox-inside").css("margin-top",(bodyHeight - ($("#promobox-inside").height()+40))/2);
				}							
			});
			
		}
		
		$("#promobox-close").click(function() {
			$("body").css("overflow","auto");
			$("#promobox").fadeOut(500); 
			$(document).off("click");
			$(document).off("keyup");
		}); 
		
		$(document).on("click",function(e) { 
			if(e.target.id == "promobox-bg") {
				$("#promobox-close").click();
			}
		});
		
		$(document).on("keyup", function(e) {
			if(e.keyCode == 27) {
				$("#promobox-close").click();
			}
		});
		
		$("#promobox-close").css("left",$("#promobox-inside").width());
		$("body").css("overflow","hidden");
		$("#promobox").animate({"opacity":1}); 
	}	
	

/*********************************
************* MENU ***************
**********************************/
	$(".navigation").each(function() {
		var nav_id = $(this).prop("id"); 
		$("ul#"+nav_id+" .nav-sub-0").bind("mouseleave mouseenter", function() {
			var id = $(this).prop("id").split("-")[2];
			$("#"+nav_id+"-sub-"+id).stop().fadeToggle(200); 
			$("#"+nav_id+"-lvl0-"+id).toggleClass("active");
			if($("#"+nav_id+"-lvl0-"+id).hasClass("current")) {
				$("#"+nav_id+"-lvl0-"+id).addClass("active");
			}
		});
		$("ul#"+nav_id+" .nav-sub-1").bind("mouseleave mouseenter", function() {
			var id = $(this).prop("id").split("-")[2];
			$("#"+nav_id+"-sub-"+id).stop().fadeToggle(200); 
			$("#"+nav_id+"-lvl1-"+id).toggleClass("active");
			if($("#"+nav_id+"-lvl1-"+id).hasClass("current")) {
				$("#"+nav_id+"-lvl1-"+id).addClass("active");
			}
		});
		$("ul#"+nav_id+" .nav-ul-1").bind("mouseleave mouseenter", function() {
			var id = $(this).prop("id").split("-")[2];
			$("#"+nav_id+"-lvl0-"+id).toggleClass("active");  
		});
		$("ul#"+nav_id+" .nav-ul-2").bind("mouseleave mouseenter", function() {
			var id = $(this).prop("id").split("-")[2];
			$("#"+nav_id+"-lvl1-"+id).toggleClass("active");  
		});
	}); 
	
      

/*********************************
********** CUSTOM CODE ***********
**********************************/   

	$(document).on("click", ".why-us-header", function() {
		$(this).parents(".why-us").first().toggleClass("active");
	});
	
	$(".link-box").eq(2).css("margin-right",0);
	$(".link-box").eq(5).css("margin-right",0);
	$(".link-box").eq(8).css("margin-right",0);
	
	$("#sitemap li.lvl0 a").each(function() {
		var t = $(this).html();
		$(this).html('<span class="colour-grey-dark font-bold">&gt;</span> '+t);
	});
	
	$(".quality-logo").first().css("margin-left", 0);
	$(".quality-logo").last().css("margin-right", 0);
	
	$(document).on("click", ".page", function() {  
		var page = $(this).text();
		var that = this;
		$(".news").css("display","none");
		showNews(page, that);
	});
	
	$(".page").addClass("active");
	showNews(1, $(".page").first());
	
	var ps_links = $(".ps-link").length;
	for(var i=1; i <= Math.ceil(ps_links / 3); i++) {
		$(".ps-link").eq(((i - 1) * 3)).css("margin-left",0);
		$(".ps-link").eq(((i - 1) * 3) + 2).css("margin-right",0);
	}
	
	var ps_links2 = $(".ps-link2").length;
	for(var i=1; i <= Math.ceil(ps_links2 / 3); i++) { 
		$(".ps-link2").eq(((i - 1) * 3) + 2).css("margin-right",0);
	}
	
	$("#go-top").click(function() {
		$("body, html").animate({scrollTop:0},500);
		return false;
	});
}); 

function showNews(page, that) {	
	$(".page").removeClass("active");
	$(that).addClass("active");	
	$(".news").slice(((page * 4) - 4), (page * 4)).fadeIn(500);
}