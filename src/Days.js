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
    $.get("https://secure-dusk-69363.herokuapp.com/days.json", (function(data){
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
        url: "https://secure-dusk-69363.herokuapp.com/days.json",
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

    // // Get the image from the HTML content snippet
    // var content = $("<div/>").html(item.content);
    // var image = $("img", content).attr("src");
    //
    let picture = item.pictures[0].image.url
    console.log('renderDay:', picture);

    return (
      <DayItem
        key={index}
        user={item.user.email}
        title={item.title}
        body={item.body}
        picture={picture}
        // author={item.author}
        // publishedDate={item.publishedDate}
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
