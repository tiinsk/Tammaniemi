import React from 'react';

class Pagination extends React.Component {

  calculateBuckets() {
    return Math.ceil(this.props.amount / this.props.itemsPerPage);
  }

  handleClick(index) {
    this.props.changePage(index);
  }

  prevPage() {
    this.props.changePage(this.props.currentPage - 1);
  }

  nextPage() {
    this.props.changePage(this.props.currentPage + 1);
  }

  render() {
    const buckets = this.calculateBuckets();
    const currentPage = this.props.currentPage;

    const pages = [];

    for (let i = 1; i <= buckets; i++) {
      const activeClass = i === currentPage ? 'active' : '';
      pages.push(
        <li className={activeClass}
          key={i}
          onClick={this.handleClick.bind(this, i)}
        >
          {i}
        </li>
      );
    }

    return (
      <div className="pagination">
        <ul>
          <li className="prev-button" onClick={this.prevPage.bind(this)}></li>
          {pages}
          <li className="next-button" onClick={this.nextPage.bind(this)}></li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
