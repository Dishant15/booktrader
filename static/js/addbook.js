
var BookAdder = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	onAddClick: function(book_name) {
		var url = this.props.url;
		// replace space with %20 in book name
		url = url + book_name.replace(/ /g,"%20");
		console.log(url);
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,

			success: function(data) {
				this.setState({data: data.items});
			}.bind(this),

			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	render: function() {
		return (
			<div className="addbook">
				<h1 className="text-center">Add your books that you want to trade with others</h1>
				<BookList data={this.state.data}/>
				<BookForm onSubmit={this.onAddClick} />
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
				<img className="img-responsive" src={this.props.image} />
				<h3>{this.props.children}</h3>
			</div>
		);
	}
}

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
			<div>
				<p><input value={this.state.book_name} onChange={this.searchChange} placeholder="Name of the book you want to add"/></p>
				<p><button className="btn btn-primary" onClick={this.handleChange} > Search Book </button></p>
			</div>
		);
	}
});


ReactDOM.render(
	<BookAdder url="https://www.googleapis.com/books/v1/volumes?q=" />,
	document.getElementById('addbook')
);