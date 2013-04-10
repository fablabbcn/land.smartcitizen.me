
$(function()
{
	$(window).load(function(){ 
		SMART.init(); 
	});
	$(document).ready(function(e) {
        SMART.interface.navigation.readURLHash();
		SMART.interface.navigation.checkScroll();
		SMART.interface.navigation.navToScreen();
		
    });
	$(window).resize(function() {
		//console.log('OUT');
		console.log($(window).width());
		SMART.interface.navigation.navToScreen();
	});
	
	
	SMART = {
		init : function() 
		{
			SMART.interface.navigation.selectNav();
			SMART.interface.navigation.goPreOrder();
			SMART.interface.navigation.aboutSmart();
			SMART.interface.navigation.mobileNav(true);
			
		},
		interface: {
			navigation:{
				navToScreen: function()
				{
					if($(window).width()<=1023)
					{
						$('.navigation').css({'top':-150});
						return false;
					} else {
						$('.navigation').css({'top':0});
					}
				},
				selectNav: function()
				{
					$(".navigation ul.userNav li a").on("click", function() {
    					var sHash= $(this).attr("href");
						SMART.interface.navigation.disableButtonsNav();
						$(this).addClass("selected");
						SMART.interface.navigation.scrollToHash(sHash);
					});
				},
				disableButtonsNav:function(){
						$(".navigation ul.userNav li a").each(function() {
                            $(this).removeClass('selected');
                        });
				},
				scrollToHash: function(hash){
					objToScroll = $('html,body');
					posY = 0;
					var sHeight= 700;
					speed = 1000;

					switch(hash){
						case '#home':posY = 0; break;
						case '#smart':posY = sHeight*1; break;
						case '#features':posY = sHeight*2; break;
						case '#sensor':posY = sHeight*3; break;
						case '#opensocial':posY = sHeight*4; break;
						case '#apps':posY = sHeight*5; break;
						case '#order':posY = sHeight*6; break;
					}
					$(objToScroll).scrollTo(posY,1000,{axis:'y',queue:false});
				},
				readURLHash:function(){
					if(window.location.hash){
						var sHash = window.location.hash;
						SMART.interface.navigation.scrollToHash(sHash);
						//console.log("First hash: "+sHash);
					}
				},
				checkScroll:function(){
					var sHeight= 700;
					var obj = $('body');
					var navObj = $(".navigation ul.userNav li a");
					var navLenght = $(".navigation ul.userNav li").length
					$(window).scroll(function(){
						//console.log(obj.scrollTop());
						if(obj.scrollTop() < sHeight-20){
							SMART.interface.navigation.disableButtonsNav();
						  $(".navigation ul.userNav li:first a").addClass('selected');
						}
						for(i=1;i<=navLenght;i++){
							if(obj.scrollTop() >= (sHeight-20)*i){
								SMART.interface.navigation.disableButtonsNav();
								nObj = ".navigation ul.userNav li:eq("+i+") a";
								$(nObj).addClass('selected');
							}
						}
						if(obj.scrollTop() > 4342){
							SMART.interface.navigation.disableButtonsNav();
						  $(".navigation ul.userNav li:last a").addClass('selected');
						}
						
					});
				},
				goPreOrder:function(){
					$('.pre-order').on("click", function(){
						SMART.interface.navigation.disableButtonsNav();
						SMART.interface.navigation.scrollToHash('#order');
					});
				},
				aboutSmart:function(){
					$('.aboutKit').on("click", function(){
						SMART.interface.navigation.disableButtonsNav();
						SMART.interface.navigation.scrollToHash('#smart');
					});
				},
				mobileNav:function(init){
					var status = init;
					$('.navMobile').on("click",  function(){
						  if(status){
							  $('.navigation').animate({top:50});
							  status = false;
						  } else {
							  $('.navigation').animate({top:-150});
							  status = true;
						  }

					});	
				}
			}
		}
	}
	
});