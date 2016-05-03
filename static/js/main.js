$(document).ready(function(){
	// jquery works too!!
});

var BookAdder = React.createClass({
	render: function() {
		return (
			<div className="addbook">
				<h1 className="text-center">Add your books that you want to trade with others</h1>
				<BookList data={this.props.data}/>
				<BookForm />
			</div>
		);
	}
});

var BookList = React.createClass({
	render: function() {
		var booklist = this.props.data.map(function(book){
			return(
				<Book key={book.id} image={book.image}>{book.name}</Book>
			)
		});
		return(
			<div className="booklist">
				{booklist}
			</div>
		);
	}
});

var Book = React.createClass({
	render: function() {
		return(
			<div className="book">
				<img className="img-responsive" src={this.props.image} />
				<h3>{this.props.children}</h3>
			</div>
		);
	}
});

var BookForm = React.createClass({
	render: function(){
		return(
			<div className="bookform">
				Book form will be here.
			</div>
		);
	}
});

var data = [
	{
		id:1,
		image:"https://upload.wikimedia.org/wikipedia/en/0/07/LostSymbol.jpg",
		name: "The Lost Symbol"
	},
	{
		id:2,
		image:"http://ecx.images-amazon.com/images/I/41s4xJZlEYL._SX322_BO1,204,203,200_.jpg",
		name: "Man's search for meaning"
	}
]

ReactDOM.render(
	<BookAdder data={data}/>,
	document.getElementById('addbook')
);