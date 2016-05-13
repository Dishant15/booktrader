$(document).ready(function() {
	countBlock();
	// enable tooltips on book buttons
	$('[data-toggle="tooltip"]').tooltip();
});

$(window).load(function() {

	$('[data-toggle="tooltip"]').tooltip();
	
	$('.trade_remove').on("click", function (e) {
		var $this = $(this);
		var url = $this.attr('url');
		$this.parent().siblings().children('b').text('Canceled');
		$this.tooltip('hide');
		// remove cancel button so no more trash clicks
		$this.remove();

		$.get(url, function(data) {
			// nothing left to do here
			if(!data.removed){
				console.log("Something went wrong");
			}
		});
	});

	$('.trade_accept').on("click", function() {
		var $this = $(this);
		var url = $this.attr('url');

		$this.parent().siblings().children('b').text('Accepted');
		$this.parent().siblings('.butn').children().remove();
		$this.tooltip('hide');
		$this.remove();

		$.get(url, function(data) {
			// nothing left to do here
			if(!data.update){
				console.log("Something went wrong");
			}
		});
	});

	$('.trade_decline').on("click", function() {
		var $this = $(this);
		var url = $this.attr('url');

		$this.parent().siblings().children('b').text('Declined');
		$this.parent().siblings('.butn').children().remove();
		$this.tooltip('hide');
		$this.remove();

		$.get(url, function(data) {
			// nothing left to do here
			if(!data.update){
				console.log("Something went wrong");
			}
		});
	});

	$('.trade_this').on('click', function() {
		var $this = $(this);
		var url = $this.attr('url');
		$this.tooltip('hide');
		$this.removeClass('btn-warning').addClass('btn-danger');
		$this.prop("disabled",true);

		$.get(url, function(data) {
			// nothing left to do here
			console.log(data);
		});
	})

});
