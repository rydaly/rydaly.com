var dcAd = {},
		BladeAnimation = function() {
			this.animIn = function(){}
		};

dcAd.clickTag = "http://www.acura.com/safety";

dcAd.preInit = function() {
	dcAd.setObjects();
}

//Function to run with any animations starting on load, or bringing in images etc
dcAd.setObjects = function() {
	dcAd.config = {
		width: 500,
		height: 750
	};

	// vars for demo
	dcAd.curMode 								= 'landscape';
	dcAd.disclaimer							= document.getElementById('disclaimer');
	
	//Assign All the elements to the element on the page
	dcAd.container 							= document.getElementById('container_dc');
	dcAd.bgExit2 								= document.getElementById('background_exit_landscape');
	
	dcAd.portraitContainer 			= document.getElementById('portrait-container');
	dcAd.landscapeContainer 		= document.getElementById('landscape-container');
	
	dcAd.bladeContainer 				= document.getElementById('blade-container');
	dcAd.blade1 								= document.getElementById('blade1');
	dcAd.blade2 								= document.getElementById('blade2');
	dcAd.blade3 								= document.getElementById('blade3');
	dcAd.blade4 								= document.getElementById('blade4');
	dcAd.bladeNav1 							= document.getElementById('blade-li1');
	dcAd.bladeNav2 							= document.getElementById('blade-li2');
	dcAd.bladeNav3 							= document.getElementById('blade-li3');
	dcAd.bladeNav4 							= document.getElementById('blade-li4');

	// animation elements
	// blade1
	dcAd.headline1Wrap					= document.getElementById('headline1-wrap');
	dcAd.headline1a							= document.getElementById('headline1a');
	dcAd.headline1b							= document.getElementById('headline1b');
	dcAd.headline1c							= document.getElementById('headline1c');
	dcAd.splitLeft							= document.getElementById('split-left');
	dcAd.splitBar								= document.getElementById('split-bar');
	dcAd.splitRight							= document.getElementById('split-right');
	dcAd.blade1Img							= document.getElementById('blade1-img');
	dcAd.instructBg							= document.getElementById('instruct-bg');
	dcAd.instruct								= document.getElementById('instruct');
	dcAd.legal									= document.getElementById('legal');

	// blade2
	dcAd.headline2Wrap					= document.getElementById('headline2-wrap');
	dcAd.headline2a							= document.getElementById('headline2a');
	dcAd.headline2b							= document.getElementById('headline2b');
	dcAd.blade2Body							= document.getElementById('blade2-body');
	dcAd.blade2Img							= document.getElementById('blade2-img');

	// blade3
	dcAd.headline3Wrap					= document.getElementById('headline3-wrap');
	dcAd.headline3a							= document.getElementById('headline3a');
	dcAd.headline3b							= document.getElementById('headline3b');
	dcAd.blade3Body							= document.getElementById('blade3-body');
	dcAd.blade3Img1							= document.getElementById('blade3-img1');
	dcAd.blade3Flash1						= document.getElementById('blade3-flash1');
	dcAd.blade3Img2							= document.getElementById('blade3-img2');
	dcAd.blade3Flash2						= document.getElementById('blade3-flash2');
	dcAd.blade3Img3							= document.getElementById('blade3-img3');
	dcAd.blade3Flash3						= document.getElementById('blade3-flash3');
	dcAd.blade3Img4							= document.getElementById('blade3-img4');
	dcAd.blade3Flash4						= document.getElementById('blade3-flash4');

	dcAd.headSequenceObjs 			= [
																	dcAd.blade3Flash1, dcAd.blade3Flash2, dcAd.blade3Flash3, dcAd.blade3Flash4,
																	dcAd.blade3Img2, dcAd.blade3Img3, dcAd.blade3Img4
																];

	// blade4
	dcAd.blade4Body							= document.getElementById('blade4-body');
	dcAd.blade4Img							= document.getElementById('blade4-img');
	dcAd.blade4Flash						= document.getElementById('blade4-flash');
	dcAd.cta										= document.getElementById('cta');
	dcAd.invisibleExit					= document.getElementById('invisible-exit');

	// Video Player
  dcAd.video1 								= {};
  dcAd.video1.vidContainer 		= document.getElementById('video-container');
  dcAd.video1.vid          		= document.getElementById('video');
  dcAd.video1.vidPlayBtn   		= document.getElementById('play-btn-1');
  dcAd.video1.vidPauseBtn  		= document.getElementById('pause-btn-1');
  dcAd.video1.vidStopBtn   		= document.getElementById('stop-btn-1');
  dcAd.video1.vidUnmuteBtn 		= document.getElementById('unmute-btn-1');
  dcAd.video1.vidMuteBtn   		= document.getElementById('mute-btn-1');
  dcAd.video1.vidReplayBtn 		= document.getElementById('replay-btn-1');
  dcAd.video1.vidProgressBar  = document.getElementById('progress-bar-1');
  dcAd.video1.bigPlayBtn 			= document.getElementById('big-play-btn');
  dcAd.video1.videoCta 				= document.getElementById('video-cta');
  dcAd.video1.videoDarken 		= document.getElementById('video-darken');
  dcAd.videoCover 						= document.getElementById('video-cover');
  dcAd.endRotate      				= document.getElementById('img-rotate-end');

	// scrolling vars
	dcAd.navDots 								= [ dcAd.bladeNav1, dcAd.bladeNav2, dcAd.bladeNav3, dcAd.bladeNav4 ];
	dcAd.curBlade 							= 0;
	dcAd.prevBlade 							= 0;
	dcAd.isInitial 							= true;
	dcAd.dotsLength 						= dcAd.navDots.length;

	dcAd.hammertime 						= new Hammer(dcAd.bladeContainer, {});

	dcAd.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	dcAd.initBlades();
  dcAd.initVideoPlayer();
	dcAd.addListeners();
	dcAd.addNavListeners();
	dcAd.container.style.display = "block";
	dcAd.disclaimer.style.display = "block";
}

dcAd.autoAdvance = function(_bladeNum) {
	dcAd.gotoBlade(_bladeNum);
};

dcAd.initBlades = function() {

	dcAd.bladeObj1 = new BladeAnimation;
	dcAd.bladeObj2 = new BladeAnimation;
	dcAd.bladeObj3 = new BladeAnimation;
	dcAd.bladeObj4 = new BladeAnimation;

	dcAd.blades = [
		{ name:'blade1', obj:dcAd.blade1, anim:dcAd.bladeObj1, containLocY:0 },
		{ name:'blade2', obj:dcAd.blade2, anim:dcAd.bladeObj2, containLocY:-dcAd.config.height },
		{ name:'blade3', obj:dcAd.blade3, anim:dcAd.bladeObj3, containLocY:-dcAd.config.height*2 },
		{ name:'blade4', obj:dcAd.blade4, anim:dcAd.bladeObj4, containLocY:-dcAd.config.height*2 }
	];

	var tDuration = 1.25,
			tDelay = 0.25,
			tEase = Power2.easeOut,
			slideDelay = 0.35;

	dcAd.bladeObj1.animIn = function() {
		dcAd.killHeadSequence();
		// set initial values
		TweenMax.set([ dcAd.headline1a, dcAd.headline1b, dcAd.headline1c, dcAd.splitBar ], { alpha:0, y:"13px" });
		TweenMax.set([ dcAd.splitLeft ], { x:"13px", alpha:0 });
		TweenMax.set([ dcAd.splitRight ], { x:"-13px", alpha:0 });
		TweenMax.set([ dcAd.instructBg, dcAd.instruct ], { x:"-500px" });

		// animate
		TweenMax.to(dcAd.headline1a, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay, ease:tEase });
		TweenMax.to(dcAd.headline1b, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*2, ease:tEase });
		TweenMax.to(dcAd.headline1c, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*3, ease:tEase });
		TweenMax.to(dcAd.splitBar, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*4, ease:tEase });
		TweenMax.to(dcAd.splitLeft, tDuration, { x:"0px", alpha:1, delay:slideDelay + tDelay*5, ease:tEase });
		TweenMax.to(dcAd.splitRight, tDuration, { x:"0px", alpha:1, delay:slideDelay + tDelay*5, ease:tEase });

		if(dcAd.isInitial) {
			dcAd.isInitial = false;
			TweenMax.delayedCall( 10, dcAd.autoAdvance, [ 1 ] );
			TweenMax.to(dcAd.instructBg, tDuration, { x:"0px", delay:slideDelay + tDelay*6, ease:tEase });
			TweenMax.to(dcAd.instruct, tDuration, { x:"0px", delay:slideDelay + tDelay*6, ease:tEase });
		}
	}

	dcAd.bladeObj2.animIn = function() {
		dcAd.killHeadSequence();
		// set initial values
		TweenMax.set([ dcAd.headline2a, dcAd.headline2b, dcAd.blade2Body ], { y:"13px", alpha:0 });
		
		// animate 
		TweenMax.to(dcAd.headline2a, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay, ease:tEase });
		TweenMax.to(dcAd.headline2b, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*2, ease:tEase });
		TweenMax.to(dcAd.blade2Body, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*3, ease:tEase });
	}

	dcAd.bladeObj3.animIn = function() {
		dcAd.killHeadSequence();
		
		if(dcAd.prevBlade === 3) {
			// coming from blade 4, show reverse flash transition and shorter delay on head sequence
			TweenMax.delayedCall(0.75, dcAd.playHeadSequence);
			playFlashTransition(false);

			// hide blade 4 elements
			TweenMax.killTweensOf([ dcAd.blade4Body, dcAd.cta ]);
			TweenMax.to(dcAd.blade4Body, tDuration*0.5, { y:"0px", alpha:0 });
			TweenMax.to(dcAd.cta, tDuration*0.5, { y:"0px", alpha:0 });

			// reset and show blade 3 elements
			TweenMax.set([ dcAd.blade3Body ], { y:"13px", alpha:0 });
			TweenMax.to(dcAd.blade3Body, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay, ease:tEase });
		} else {
			TweenMax.delayedCall(1.25, dcAd.playHeadSequence);

			// set initial values
			TweenMax.set([ dcAd.headline3a, dcAd.headline3b, dcAd.blade3Body ], { y:"13px", alpha:0 });

			// hide blade 4 elements since they're stacked
			TweenMax.set([ dcAd.blade4Body, dcAd.cta, dcAd.blade4Img ], { alpha:0 });
			
			// animate
			TweenMax.to(dcAd.headline3a, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay, ease:tEase });
			TweenMax.to(dcAd.headline3b, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*2, ease:tEase });
			TweenMax.to(dcAd.blade3Body, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*3, ease:tEase });
		}
	}

	dcAd.bladeObj4.animIn = function() {
		dcAd.killHeadSequence();
		
		if(dcAd.prevBlade === 2) {
			// coming from blade 3, show flash transition
			playFlashTransition(true);
			
			// hide blade 3 elements
			TweenMax.to(dcAd.blade3Body, tDuration*0.5, { y:"0px", alpha:0, overwrite:true });

			// reset and show blade 4 elements
			TweenMax.set([ dcAd.blade4Body, dcAd.cta ], { y:"13px", alpha:0 });
			TweenMax.to(dcAd.blade4Body, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay, ease:tEase });
			TweenMax.to(dcAd.cta, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*2, ease:tEase });
		} else {
			// set initial values
			TweenMax.set([ dcAd.headline3a, dcAd.headline3b, dcAd.blade4Body, dcAd.cta ], { y:"13px", alpha:0 });
			TweenMax.set([ dcAd.blade4Img ], { alpha:1 });
			
			// hide blade 3 elements since they're stacked
			TweenMax.set([ dcAd.blade3Body, dcAd.blade3Img1 ], { alpha:0 });

			// animate	
			TweenMax.to(dcAd.headline3a, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay, ease:tEase });
			TweenMax.to(dcAd.headline3b, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*2, ease:tEase });
			TweenMax.to(dcAd.blade4Body, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*3, ease:tEase });
			TweenMax.to(dcAd.cta, tDuration, { y:"0px", alpha:1, delay:slideDelay + tDelay*4, ease:tEase });
		}
	}

	function playFlashTransition(_isForward) {
		if(_isForward) {
			TweenMax.to(dcAd.blade4Flash, 0, { alpha:1 });
			TweenMax.to(dcAd.blade3Img1, 0, { alpha:0, overwrite:true });
			TweenMax.to(dcAd.blade4Flash, 2.5, { alpha:0, ease:Expo.easeOut });
			TweenMax.to(dcAd.blade4Img, 1, { alpha:1, ease:Expo.easeOut });
		} else {
			TweenMax.to(dcAd.blade3Flash1, 0, { alpha:1 });
			TweenMax.to(dcAd.blade4Img, 0, { alpha:0 });
			TweenMax.to(dcAd.blade3Flash1, 2.5, { alpha:0, ease:Expo.easeOut });
			TweenMax.to(dcAd.blade3Img1, 1, { alpha:1, ease:Expo.easeOut });
		}
	}
}

dcAd.playHeadSequence = function() {

	var offset = 0.75,
			fadeTime = 2;

	// dummy to blonde
	TweenMax.to( dcAd.blade3Flash2, 0, { alpha:1 } );
	TweenMax.to( dcAd.blade3Img1, 0, { alpha:0, overwrite:true } );
	TweenMax.to( dcAd.blade3Flash2, fadeTime, { alpha:0, ease:Expo.easeOut } );
	TweenMax.to( dcAd.blade3Img2, 1, { alpha:1, ease:Expo.easeOut } );

	// blonde to dummy
	TweenMax.to( dcAd.blade3Flash1, 0, { alpha:1, delay:offset } );
	TweenMax.to( dcAd.blade3Img2, 0, { alpha:0, delay:offset } );
	TweenMax.to( dcAd.blade3Flash1, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset } );
	TweenMax.to( dcAd.blade3Img1, 1, { alpha:1, ease:Expo.easeOut, delay:offset } );

	// dummy to guy
	TweenMax.to( dcAd.blade3Flash3, 0, { alpha:1, delay:offset*2 } );
	TweenMax.to( dcAd.blade3Img1, 0, { alpha:0, delay:offset*2 } );
	TweenMax.to( dcAd.blade3Flash3, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*2 } );
	TweenMax.to( dcAd.blade3Img3, 1, { alpha:1, ease:Expo.easeOut, delay:offset*2 } );

	// guy to dummy
	TweenMax.to( dcAd.blade3Flash1, 0, { alpha:1, delay:offset*3 } );
	TweenMax.to( dcAd.blade3Img3, 0, { alpha:0, delay:offset*3 } );
	TweenMax.to( dcAd.blade3Flash1, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*3 } );
	TweenMax.to( dcAd.blade3Img1, 1, { alpha:1, ease:Expo.easeOut, delay:offset*3 } );

	// dummy to brunette
	TweenMax.to( dcAd.blade3Flash4, 0, { alpha:1, delay:offset*4 } );
	TweenMax.to( dcAd.blade3Img1, 0, { alpha:0, delay:offset*4 } );
	TweenMax.to( dcAd.blade3Flash4, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*4 } );
	TweenMax.to( dcAd.blade3Img4, 1, { alpha:1, ease:Expo.easeOut, delay:offset*4 } );

	// brunette to dummy
	TweenMax.to( dcAd.blade3Flash1, 0, { alpha:1, delay:offset*5 } );
	TweenMax.to( dcAd.blade3Img4, 0, { alpha:0, delay:offset*5 } );
	TweenMax.to( dcAd.blade3Flash1, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*5 } );
	TweenMax.to( dcAd.blade3Img1, 1, { alpha:1, ease:Expo.easeOut, delay:offset*5 } );

	TweenMax.to( dcAd.blade3Flash2, 0, { alpha:1, delay:offset*6 } );
	TweenMax.to( dcAd.blade3Img1, 0, { alpha:0, delay:offset*6 } );
	TweenMax.to( dcAd.blade3Flash2, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*6 } );
	TweenMax.to( dcAd.blade3Img2, 1, { alpha:1, ease:Expo.easeOut, delay:offset*6 } );

	// blonde to dummy
	TweenMax.to( dcAd.blade3Flash1, 0, { alpha:1, delay:offset*7 } );
	TweenMax.to( dcAd.blade3Img2, 0, { alpha:0, delay:offset*7 } );
	TweenMax.to( dcAd.blade3Flash1, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*7 } );
	TweenMax.to( dcAd.blade3Img1, 1, { alpha:1, ease:Expo.easeOut, delay:offset*7 } );

	// dummy to guy
	TweenMax.to( dcAd.blade3Flash3, 0, { alpha:1, delay:offset*8 } );
	TweenMax.to( dcAd.blade3Img1, 0, { alpha:0, delay:offset*8 } );
	TweenMax.to( dcAd.blade3Flash3, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*8 } );
	TweenMax.to( dcAd.blade3Img3, 1, { alpha:1, ease:Expo.easeOut, delay:offset*8 } );

	// guy to dummy
	TweenMax.to( dcAd.blade3Flash1, 0, { alpha:1, delay:offset*9 } );
	TweenMax.to( dcAd.blade3Img3, 0, { alpha:0, delay:offset*9 } );
	TweenMax.to( dcAd.blade3Flash1, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*9 } );
	TweenMax.to( dcAd.blade3Img1, 1, { alpha:1, ease:Expo.easeOut, delay:offset*9 } );

	// dummy to brunette
	TweenMax.to( dcAd.blade3Flash4, 0, { alpha:1, delay:offset*10 } );
	TweenMax.to( dcAd.blade3Img1, 0, { alpha:0, delay:offset*10 } );
	TweenMax.to( dcAd.blade3Flash4, fadeTime, { alpha:0, ease:Expo.easeOut, delay:offset*10 } );
	TweenMax.to( dcAd.blade3Img4, 1, { alpha:1, ease:Expo.easeOut, delay:offset*10 } );

	// brunette to dummy
	TweenMax.to( dcAd.blade3Flash1, 0, { alpha:1, delay:offset*11 } );
	TweenMax.to( dcAd.blade3Img4, 0, { alpha:0, delay:offset*11 } );
	TweenMax.to( dcAd.blade3Flash1, 3, { alpha:0, ease:Expo.easeOut, delay:offset*11 } );
	TweenMax.to( dcAd.blade3Img1, 1, { alpha:1, ease:Expo.easeOut, delay:offset*11 } );
}

dcAd.killHeadSequence = function() {
	// kill sequence 
	TweenMax.killDelayedCallsTo(dcAd.playHeadSequence);
	TweenMax.killTweensOf(dcAd.headSequenceObjs);
	TweenMax.killTweensOf(dcAd.blade3Img1);
	TweenMax.allTo(dcAd.headSequenceObjs, 0.5, { alpha:0, overwrite:true });

	// show dummy head if moving to blade 3
	if(dcAd.curBlade !== 2) {
		TweenMax.to(dcAd.blade3Img1, 0.5, { alpha:0, overwrite:true });
	} else {
		TweenMax.to(dcAd.blade3Img1, 0.5, { alpha:1, overwrite:true });
	}
}

// init video player
dcAd.initVideoPlayer = function() {
  // You can update the autoplay flag to 'true' to enable muted
  // autoplay although it won't work on iOS.
  dcAd.autoplay1 = false;
  dcAd.isClick1 = false;
  dcAd.hasEnded = false;
  dcAd.isInitial = true;

  // Hide mute / unmute on iOS.
  if ((navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/iPod/i))) {
    dcAd.video1.vidUnmuteBtn.style.opacity = 0;
    dcAd.video1.vidMuteBtn.style.opacity = 0;
  }

  addVideoTracking1();
}

//Add Event Listeners
dcAd.addListeners = function() {

	// Listen for resize changes for orientation handling
	window.addEventListener("resize", function() {
		dcAd.changeOrientationHandler();
	}, false);

	dcAd.invisibleExit.addEventListener('click', dcAd.bgExitHandler , false);
	dcAd.video1.videoCta.addEventListener('click', dcAd.bgExitHandler , false);

	// Video Player Listeners
  dcAd.video1.vidPlayBtn.addEventListener('click', pausePlayHandler1, false);
  dcAd.video1.bigPlayBtn.addEventListener('click', pausePlayHandler1, false);
  dcAd.video1.vidPauseBtn.addEventListener('click', pausePlayHandler1, false);
  dcAd.video1.vidMuteBtn.addEventListener('click', muteUnmuteHandler1, false);
  dcAd.video1.vidUnmuteBtn.addEventListener('click', muteUnmuteHandler1, false);
  dcAd.video1.vidReplayBtn.addEventListener('click', replayHandler1, false);
  dcAd.video1.vidStopBtn.addEventListener('click', stopHandler1, false);
  dcAd.video1.vid.addEventListener('ended', videoEndHandler1, false);
  dcAd.video1.vid.addEventListener('timeupdate', videoTimeUpdateHandler1, false);

	// Swipe Scrolling
  dcAd.hammertime.on('swipe', function(e) {
		dcAd.swipeHandler(e.deltaY);
	});

	// dcAd.changeOrientationHandler();
	dcAd.manualOrientationChange();
	dcAd.showAd();
}

dcAd.addNavListeners = function() {
	for(var i = 0; i < dcAd.dotsLength; i++) {
  	dcAd.navDots[i].addEventListener('click', dcAd.handleNavClick);
  }
}

dcAd.removeNavListeners = function() {
	for(var i = 0; i < dcAd.dotsLength; i++) {
		removeDotClickHandler(dcAd.navDots[i], i);
	}
	function removeDotClickHandler(elem, index) {
		elem.removeEventListener('click', dcAd.handleNavClick);
	}
}

dcAd.handleNavClick = function(e) {
	var idx = parseFloat(e.target.getAttribute("data-id"));
	e.preventDefault();
	if( idx !== dcAd.curBlade ) {
		dcAd.navDots[dcAd.curBlade].className = '';
		dcAd.prevBlade = dcAd.curBlade;

		setTimeout( function() {
			dcAd.navDots[idx].className += ' current';
			dcAd.gotoBlade(idx);
		}, 25);
	}
}

dcAd.gotoBlade = function(_index) {
	TweenMax.killDelayedCallsTo(dcAd.autoAdvance);
	
	// temporarily disable nav
	dcAd.removeNavListeners();
	TweenMax.delayedCall(0.25, dcAd.addNavListeners);

	var dd = 0,
			containerTime = 1,
			containerEase = Expo.easeInOut,
			bgTime = 1,
			bgEase = Expo.easeInOut;
	
	dcAd.curBlade = _index;

	// update nav dots
	for(var i=0; i < dcAd.dotsLength; i++) {
		if(dcAd.navDots[i] !== dcAd.navDots[_index]) dcAd.navDots[i].className = '';
		_index === 3 ? dcAd.invisibleExit.style.visibility = "visible" : dcAd.invisibleExit.style.visibility = "hidden";
	}
	dcAd.navDots[_index].className += ' current';

	// amimate blades
	TweenMax.to(dcAd.bladeContainer, containerTime, { css:{ top:dcAd.blades[_index].containLocY }, ease:containerEase });
	TweenMax.to(dcAd.blades[_index].obj, bgTime, { css:{ backgroundPosition:"50% 0px" }, ease:bgEase, delay:dd });
	dcAd.blades[_index].anim.animIn();

	switch(_index) {
		case 0 :
			move(dcAd.blade2, '-175px');
			move(dcAd.blade3, '-175px');
			move(dcAd.blade4, '-175px');
			break;
		case 1 :
			move(dcAd.blade1, '175px');
			move(dcAd.blade3, '-175px');
			move(dcAd.blade4, '-175px');
			break;
		case 2 :
			move(dcAd.blade1, '175px');
			move(dcAd.blade2, '175px');
			move(dcAd.blade4, '0px'); // blades 3 and 4 are stacked
			break;
		case 3 :
			move(dcAd.blade1, '175px');
			move(dcAd.blade2, '175px');
			move(dcAd.blade3, '0px'); // blades 3 and 4 are stacked
			break;
	}

	function move(_blade, _yPos) {
		TweenMax.to(_blade, bgTime, { css:{ backgroundPosition:"50% " + _yPos }, ease:bgEase, delay:dd });
	}
}

//exits
dcAd.bgExitHandler = function(e) {
	// console.log(" :: exit :: " + e.target.id);
  window.open(dcAd.clickTag);
}

dcAd.changeOrientationHandler = function() {
	TweenMax.killDelayedCallsTo(dcAd.autoAdvance);
	
	if(window.innerHeight > window.innerWidth) { // we're in portrait mode
		dcAd.curMode = 'portrait';
		dcAd.container.style.width = 500 + 'px';
		dcAd.container.style.height = 750 + 'px';
		dcAd.portraitContainer.style.display = 'block';
		dcAd.landscapeContainer.style.display = 'none';
		if(!dcAd.isInitial) hideVideoPlayer();
	} else {
		dcAd.curMode = 'landscape';
		dcAd.container.style.width = 750 + 'px';
		dcAd.container.style.height = 500 + 'px';
		dcAd.portraitContainer.style.display = 'none';
		dcAd.landscapeContainer.style.display = 'block';
		showVideoPlayer();
	}
}

dcAd.manualOrientationChange = function() {
	TweenMax.killDelayedCallsTo(dcAd.autoAdvance);
	
	if(dcAd.curMode === 'portrait') {
		dcAd.curMode = 'landscape';
		dcAd.container.style.width = 750 + 'px';
		dcAd.container.style.height = 500 + 'px';
		dcAd.portraitContainer.style.display = 'none';
		dcAd.landscapeContainer.style.display = 'block';
		showVideoPlayer();
	} else {
		dcAd.curMode = 'portrait';
		dcAd.container.style.width = 500 + 'px';
		dcAd.container.style.height = 750 + 'px';
		dcAd.portraitContainer.style.display = 'block';
		dcAd.landscapeContainer.style.display = 'none';
		if(!dcAd.isInitial) hideVideoPlayer();
	}
}

/**
 *		SCROLLING BEHAVIOR
 */

dcAd.swipeHandler = function(deltaY) {
	if (deltaY < 0 && dcAd.curBlade !== dcAd.blades.length - 1) { // moving down
		animateSwipe('down');
	} else if(deltaY > 0 && dcAd.curBlade !== 0) { // moving up
		animateSwipe('up');
	}

	function animateSwipe(_direction) {
		dcAd.removeSwipeListeners();
		dcAd.prevBlade = dcAd.curBlade;
		TweenMax.delayedCall(1.5, dcAd.addSwipeListeners);

		switch(_direction) {
			case 'down' :
				if(dcAd.curBlade < dcAd.blades.length-1) dcAd.curBlade++;
				break;
			case 'up' :
				if(dcAd.curBlade > 0) dcAd.curBlade--;
				break;
		}
		dcAd.gotoBlade(dcAd.curBlade);
	}
}

dcAd.addSwipeListeners = function() {
	dcAd.hammertime.get('swipe').set({ enable:true });
}

dcAd.removeSwipeListeners = function() {
	dcAd.hammertime.get('swipe').set({ enable:false });
}

dcAd.showAd = function() {
	TweenMax.to(dcAd.container, 0.5, { autoAlpha:1 });
	TweenMax.to(dcAd.disclaimer, 0.5, { autoAlpha:1 });
	
	if(window.innerHeight > window.innerWidth) {
		dcAd.gotoBlade(0);
	}
}

/**
 *		VIDEO PLAYER
 */

function showVideoPlayer() {
  dcAd.video1.vidMuteBtn.style.visibility    = 'hidden';
  dcAd.video1.vidPauseBtn.style.visibility   = 'hidden';

  TweenMax.to(dcAd.video1.vidUnmuteBtn, 0.5, { autoAlpha:1, delay:0.15 });
  TweenMax.to(dcAd.video1.vidPlayBtn, 0.5, { autoAlpha:1, delay:0.15 });
  TweenMax.to(dcAd.video1.bigPlayBtn, 0.5, { autoAlpha:1, delay:0.15 });
  
  if (dcAd.autoplay1) {
    if (dcAd.video1.vid.readyState >= 2) {
      startMuted1(null);
    }
    else {
      dcAd.video1.hasCanPlay = true;
      dcAd.video1.vid.addEventListener('canplay', startMuted1, false);
    }
    // HACK: Safari experiences video rendering issues, fixed by forcing a viewport refresh
    dcAd.video1.vidMuteBtn.style.visibility = 'visible';
      setTimeout(function() {
        dcAd.video1.vidMuteBtn.style.visibility = 'hidden';
      }, 200);
  }
  else {
    dcAd.video1.vidUnmuteBtn.style.visibility  = 'hidden';
    dcAd.video1.vidPauseBtn.style.visibility   = 'hidden';
    TweenMax.to(dcAd.video1.vidMuteBtn, 0.5, { autoAlpha:1, delay:0.15 });
    TweenMax.to(dcAd.video1.vidPlayBtn, 0.5, { autoAlpha:1, delay:0.15 });
    TweenMax.to(dcAd.video1.bigPlayBtn, 0.5, { autoAlpha:1, delay:0.15 });
  }
  TweenMax.to(dcAd.video1.vidContainer, 0.5, { autoAlpha:1, delay:0.15 });
  TweenMax.to(dcAd.video1.vid, 0.5, { autoAlpha:1, delay:0.15 });
  TweenMax.to(dcAd.videoCover, 0.5, { autoAlpha:1, delay:0.15 });
  dcAd.isInitial = false;
}

function hideVideoPlayer() {
  dcAd.video1.vid.currentTime = 0;
  dcAd.video1.vid.pause();
  dcAd.video1.vidContainer.style.visibility  = 'hidden';
  dcAd.video1.vidPlayBtn.style.visibility  = 'hidden';
  dcAd.video1.vidMuteBtn.style.visibility  = 'hidden';
  dcAd.video1.vidUnmuteBtn.style.visibility  = 'hidden';
}

/**
 * Triggered once the video player is ready to play the video on expansion.
 */
function startMuted1(e) {
  // Leaving the listener can cause issues on Chrome / Firefox
  if (dcAd.video1.hasCanPlay) {
    dcAd.video1.vid.removeEventListener('canplay', startMuted1);
    dcAd.video1.hasCanPlay = false;
  }
  // If paused then play
  dcAd.video1.vid.volume       = 0; // Muted by default
  dcAd.video1.vid.currentTime  = 0;
  dcAd.video1.vid.play();
  dcAd.video1.vidPauseBtn.style.visibility = 'visible';
  dcAd.video1.vidPlayBtn.style.visibility  = 'hidden';
}

/**
 * Play pause toggle.
 */
function pausePlayHandler1(e) {
  // Under IE10, a video is not 'paused' after it ends.
  if (dcAd.video1.vid.paused || dcAd.video1.vid.ended) {
    if (dcAd.isClick1) {
      dcAd.video1.vid.volume = 1.0;
      dcAd.video1.vidMuteBtn.style.visibility    = 'visible';
      dcAd.video1.vidUnmuteBtn.style.visibility  = 'hidden';
      dcAd.isClick1 = false;
    }
    // If paused then play
    dcAd.video1.vid.play();
    dcAd.video1.vidPauseBtn.style.visibility = 'visible';
    dcAd.video1.vidPlayBtn.style.visibility  = 'hidden';
    dcAd.video1.bigPlayBtn.style.visibility  = 'hidden';
    dcAd.video1.videoDarken.style.visibility = 'hidden';
  	dcAd.video1.videoCta.style.visibility = 'hidden';
  	dcAd.endRotate.style.visibility = 'hidden';
    dcAd.videoCover.style.visibility  = 'hidden';
  	dcAd.hasEnded = false;
  }
  else {
    dcAd.video1.vid.pause();
    dcAd.video1.vidPauseBtn.style.visibility = 'hidden';
    dcAd.video1.vidPlayBtn.style.visibility  = 'visible';
    dcAd.video1.bigPlayBtn.style.visibility  = 'visible';
    dcAd.video1.videoDarken.style.visibility = 'visible';
  }
}

/**
 * Mutes or unmute the video player.
 */
function muteUnmuteHandler1(e) {
  if (dcAd.video1.vid.volume == 0.0) {
    dcAd.video1.vid.volume = 1.0;
    dcAd.video1.vidMuteBtn.style.visibility   = 'visible';
    dcAd.video1.vidUnmuteBtn.style.visibility = 'hidden';
  } else {
    dcAd.video1.vid.volume = 0.0;
    dcAd.video1.vidMuteBtn.style.visibility   = 'hidden';
    dcAd.video1.vidUnmuteBtn.style.visibility = 'visible';
  }
}

/**
 * Stops the video.
 */
function stopHandler1(e) {
	if(dcAd.hasEnded) { 
		dcAd.video1.bigPlayBtn.style.visibility = 'hidden';
	} else {
	  dcAd.video1.vid.currentTime = 0;
	  dcAd.video1.vid.pause();
	  dcAd.video1.vidPauseBtn.style.visibility = 'hidden';
	  dcAd.video1.vidPlayBtn.style.visibility  = 'visible';
	  dcAd.video1.bigPlayBtn.style.visibility = 'visible';
	  dcAd.video1.videoDarken.style.visibility = 'visible';
	  dcAd.videoCover.style.visibility = 'visible';
	  dcAd.isClick1 = true;
	}
}

/**
 * Relaunches the video from the beginning.
 */
function replayHandler1(e) {
  dcAd.video1.vid.currentTime = 0;
  dcAd.video1.vid.play();
  dcAd.video1.vid.volume = 1.0;
  dcAd.video1.vidPauseBtn.style.visibility = 'visible';
  dcAd.video1.vidMuteBtn.style.visibility  = 'visible';
  dcAd.video1.vidMuteBtn.style.visibility  = 'visible';
  dcAd.video1.bigPlayBtn.style.visibility = 'hidden';
  dcAd.video1.videoDarken.style.visibility = 'hidden';
  dcAd.video1.videoCta.style.visibility = 'hidden';
  dcAd.video1.vidReplayBtn.style.visibility  = 'hidden';
  dcAd.endRotate.style.visibility = 'hidden';
  dcAd.videoCover.style.visibility = 'hidden';
  dcAd.hasEnded = false;
}

/**
 * Handler triggered when the video has finished playing.
 */
function videoEndHandler1(e) {
  dcAd.video1.vid.currentTime = 0;
  dcAd.video1.vid.pause();
  dcAd.video1.vidPauseBtn.style.visibility = 'hidden';
  dcAd.video1.vidPlayBtn.style.visibility  = 'hidden';
  dcAd.video1.vidReplayBtn.style.visibility  = 'visible';
  dcAd.video1.bigPlayBtn.style.visibility = 'hidden';
  dcAd.video1.videoDarken.style.visibility = 'visible';
  dcAd.video1.videoCta.style.visibility = 'visible';
  dcAd.videoCover.style.visibility = 'visible';
  dcAd.endRotate.style.visibility = 'visible';
  dcAd.isClick1 = true;
  dcAd.hasEnded = true;
}

/**
 * Handler triggered when the video has timeUpdates.
 */
function videoTimeUpdateHandler1(e) {
	var perc = dcAd.video1.vid.currentTime / dcAd.video1.vid.duration;
	dcAd.video1.vidProgressBar.style.width = Math.round(100*perc) + '%';
}

/**
 * Add video metrics to the HTML5 video elements by loading in video module, and assigning to videos.
 */
function addVideoTracking1() {
  // Add in the video files.
  var srcNode = document.createElement('source');
  srcNode.setAttribute('type', 'video/webm');
  srcNode.setAttribute('src', 'video.webm');
  dcAd.video1.vid.appendChild(srcNode);

  srcNode = document.createElement('source');
  srcNode.setAttribute('type', 'video/mp4');
  srcNode.setAttribute('src', 'video.mp4');
  dcAd.video1.vid.appendChild(srcNode);
}

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");


