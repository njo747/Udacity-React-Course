import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends React.Component {
  static propTypes = {
    shelf: PropTypes.oneOf(["currentlyReading", "wantToRead", "read"]),
    onBookChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  titles = {
    "currentlyReading": "Currently Reading",
    "wantToRead": "Want To Read",
    "read": "Read"
  }

  render() {
    const {shelf, books} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.titles[shelf]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => {
                if (shelf === book.shelf) {
                  return <Book key={book.id} data={book} shelf={shelf} onBookChange={this.props.onBookChange}/>
                }
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
