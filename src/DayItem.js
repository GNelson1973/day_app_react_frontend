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

    return (
        <div>
          <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.body}</p>
            <p>User: {this.props.user}</p>
            <p>
              <a href={this.props.url}>Read day</a>
            </p>
            <div>
              <img style={ style.image }src={this.props.picture} />
            </div>
          </div>
        </div>
    );
  }
}

export default DayItem;
