
function addNewBook(btn) {
	var $book = btn.parent().parent().parent();
	var img_src = $book.children('img').attr('src');
	var title = btn.parent().siblings().children().children().text();

	var url = "/books/add";
	$.post(url, {
		image:img_src,
		name: title
	}, function (data, status) {
		if(data.success){
			alert("Book added");
		} else {
			alert("Book can not be added!! Something went wrong...");
		}
	})
}

var BookAdder = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	// componentDidMount: function(){
	// 	this.onAddClick("harry potter");
	// },

	onAddClick: function(book_name) {

		// show a loader for loading data
		$('#loader').show(500);

		var url = this.props.url;
		// replace space with %20 in book name
		url = url + book_name.replace(/ /g,"%20");
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,

			success: function(data) {
				$('#loader').hide(500);
				this.setState({data: data.items});
				countBlock();
				$('.newbook').on('click',function () {
					var $this = $(this);
					addNewBook($this);
				});
				$('[data-toggle="tooltip"]').tooltip();
			}.bind(this),

			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	render: function() {
		return (
			<div className="bookadder">
				<div className="jumbotron">
					<h2 className="text-center">Add your books that you will like to trade with others</h2>
					<BookForm onSubmit={this.onAddClick} />
				</div>
				<div id="loader" className="text-center" hidden><h1>Loading data ..... </h1></div>
				<BookList data={this.state.data}/>
			</div>
		);
	}
});

var BookList = React.createClass({
	render: function() {

		var booklist = this.props.data.map(function(book){
			// check if the book data has book cover page thumbnail or use a default
			if(book.volumeInfo.imageLinks) var image = book.volumeInfo.imageLinks.thumbnail;
			else var image = "https://www.anglo-egyptian.com/books_posters/defbookcover.jpg";
			return(
				<Book key={book.id} image={image}>{book.volumeInfo.title}</Book>
			);
		});
		
		return(
			<div className="booklist">
				{booklist}
			</div>
		);
	}
});

class Book extends React.Component {
	render() {
		return(
			<div className="book">
				<img className="img-responsive center-block" src={this.props.image} />
				<div className="row">
					<div className="col-sm-3">
						<button className="btn btn-success newbook" data-toggle="tooltip" data-placement="bottom" title="Add Book">
							<span className="glyphicon glyphicon-plus text-center" aria-hidden="true"></span>
						</button>
					</div>
					<div className="col-sm-9 text-warning">
						<b><span dangerouslySetInnerHTML={{__html: this.props.children}} /></b>
					</div>
				</div>
			</div>
		);
	}
};

var BookForm = React.createClass({

	getInitialState: function(){
		return {book_name : ""};
	},

	searchChange: function(e) {
		this.setState( {book_name : e.target.value });
	},

	handleChange: function(e) {
		this.props.onSubmit(this.state.book_name);
	},

	render: function(){
		return(
			<div className="form-group mr-top-30">
				<div className="row">
					<div className="col-sm-2"></div>
					<div className="col-sm-6">
						<input className="form-control" value={this.state.book_name} onChange={this.searchChange} placeholder="Name of the book you want to add"/>
					</div>
					<div className="col-sm-2">
						<button className="btn btn-primary" onClick={this.handleChange} ><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
					</div>
					<div className="col-sm-2"></div>
				</div>
			</div>
		);
	}
});


ReactDOM.render(
	<BookAdder url="https://www.googleapis.com/books/v1/volumes?q=" />,
	document.getElementById('addbook')
);