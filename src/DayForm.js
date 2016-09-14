import React from 'react';
import $ from 'jquery';
import Days from './Days';

class DayForm extends React.Component {

  createDay(event){
      event.preventDefault();

      let newDay = {
        title: this.refs.title.value,
        body: this.refs.body.value,
        rating: this.refs.rating.value,
        day_date: this.refs.day_date.value
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

  render() {
    return (
      <div>
          <form onSubmit={this.createDay.bind(this)}>
            <input type="text" className="form-control" ref="title" placeholder="Give your day an inspirational title" />
            <textarea className="form-control" ref="body" placeholder="Describe your day.."></textarea>
            <input type="date" className="form-control" ref="day_date" />
            <input type="number" className="form-control" ref="rating" placeholder="Give your day rating" />
            <button type="submit" className="btn btn-primary">Create Day</button>
          </form>
          <div>

          </div>
      </div>
    )
  }

}

export default DayForm;
