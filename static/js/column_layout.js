var wrapperWidth = 0;
var blocks = [];
var index = 0;
var minHeight = 0;
var colCount = 0;
var start = 0;

// -1 total blockWidth so that blocks borders don't overlap
const blockWidth = 259;

var countBlock = function(){
	
	wrapperWidth = $('.booklist').outerWidth();
	// blockWidth = $('.book').outerWidth();
	// if(!blockWidth)blockWidth = 260;
	colCount = Math.floor( wrapperWidth/blockWidth );

	// Find middle point
	var middleWidth = $('.booklist').width() / 2;
	// Find even or odd Block
	var oddEven = colCount % 2 == 0; // For odd = 0 and even = 1 

	if(oddEven){
		var half = colCount / 2;
		start = ( half * blockWidth );
		start = middleWidth - start;
	}
	else{
		var half = parseInt(colCount / 2);
		start = ( blockWidth / 2 ) + ( half * blockWidth );
		start = middleWidth - start;
	}

	// Calculate height 
	var startHeight = 0;

	// if( $('.booklist').length ){
	// 	startHeight = $('.booklist').offset().top;
	// }

	if( startHeight < 80 )
		startHeight = 80;

	// console.log(startHeight);
	for( var i = 0; i < colCount; i++ )
		blocks[i] = startHeight;
	
	setBlocks();

	var wrapperHeight = Math.max.apply(Math, blocks);
	wrapperHeight += 50;    // some margin after the blocks

	// On entity page deduct the top block height from the wrapper
	if(startHeight > 100) {
		wrapperHeight -= startHeight;
	}
	$(".booklist").css("height",wrapperHeight + 'px');
}

var setBlocks = function(){
	$('.book').each(function(){

		min = Math.min.apply(Math, blocks);
		index = $.inArray(min, blocks);
		var left = ( index * (blockWidth) ) + start ;
		var top = min - 1;
		// console.log(min);
		if( index == 0 )
			left = start;
		$(this).css({
			'top' : top + 'px',
			'left' : left + 'px'
		});
		blocks[index] = top + $(this).outerHeight();
	})

	$('.loader-new-more').css({
		'top': blocks[index] + 20 + 'px'
	})

}
$(window).resize(countBlock);
$(window).load(function(){
	countBlock();
	// enable tooltips on book buttons
	$('[data-toggle="tooltip"]').tooltip();
});


document.addEventListener(
    'load',
    function(event){
        var elm = event.target;
        if( elm.nodeName.toLowerCase() === 'img' && $(elm).closest('.container').length && !$(elm).hasClass('loaded')){ 
        // or any other filtering condition
            $(elm).addClass('loaded');
            if($('.container img.loaded').length === $('.container img').length) {          
                // all images have been loaded
                countBlock();
            }
        }
    },
    true // Capture event
);
