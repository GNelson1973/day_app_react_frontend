import React from 'react';

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
              <a href={this.props.url}>Read article</a>
            </p>
          </div>
        </div>
    );
  }
}

export default DayItem;
