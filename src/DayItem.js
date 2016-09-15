import React from 'react';

const style = {
    image: {
    height: 300,
    width: 500,
    }
}


class DayItem extends React.Component {
  render() {
    console.log('class DayItem: ', this.props);

    const cts = this.props.date
    const cdate = (new Date(cts)).toString();

    return (
        <div>
          <div>
            <h2>Title {this.props.title}</h2>
            <p>{cdate}</p>
            <p>Day rating: {this.props.rating}</p>
            <div>
              <img style={ style.image }src={this.props.image.image.url} />
            </div>
            <p>{this.props.body}</p>
            <p>
              <a href={this.props.url}>Read day</a>
            </p>
            <div>
            </div>
          </div>
        </div>
    );
  }
}

export default DayItem;
