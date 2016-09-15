import React from 'react';
import $ from 'jquery';
import DayItem from './DayItem';

class Days extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
  }

  componentDidMount() {
    $.get("http://localhost:3000/days.json", (function(data){
      this.setState({
        days: data.days,
      });
    console.log('data from Json:', data.days);
    }).bind(this));
  }

  renderDayItem(item, index) {
    console.log('renderDay:', item);

    return (
      <DayItem
        key={index}
        date={item.day_date}
        rating={item.rating}
        image={item.image}
        title={item.title}
        body={item.body}
        pictures={item.pictures}
        url={item.url} />
    );
  }

  render() {
    let days = this.state.days

    return (
      <div>
          <ul>
            <div>
              {days.map(this.renderDayItem.bind(this))}
            </div>
          </ul>
      </div>
    )
  }

}

export default Days;
