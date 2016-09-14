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

  createDay(event){
      event.preventDefault();

      let newDay = {
        title: this.refs.title.value,
        body: this.refs.body.value
      };
      console.log('newday:', newDay)
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/days.json",
        data: JSON.stringify({
          day: newDay
        }),
        contentType: "application/json",
        dataType: "json"

      }).done(function( data ) {
        console.log(data);
        alert( "Data saved: " + data );

      }).fail(function(error) {
        console.log(error);
      });
    }

  renderDayItem(item, index) {
    console.log('renderDay:', item);

    return (
      <DayItem
        key={index}
        date={item.date}
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
          <form onSubmit={this.createDay.bind(this)}>
            <input type="text" className="form-control" ref="title" placeholder="Give your day an inspirational title" />
            <textarea className="form-control" ref="body" placeholder="Describe your day.."></textarea>
            <button type="submit" className="btn btn-primary">Create Day</button>
          </form>
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
