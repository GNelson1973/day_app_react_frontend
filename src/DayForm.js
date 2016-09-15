import React from 'react';
import $ from 'jquery';
import Days from './Days';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker';

const dialogStyle = {
  width: '700px',
  height: '500px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}


class DayForm extends React.Component {

  createDay(event){
      event.preventDefault();
      const { title, body, rating, day_date,  } = this.formValues()
      let newDay = {
        title: title,
        body: body,
        rating: rating,
        day_date: day_date
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
        alert( "Data saved: " + data.day_date );

      }).fail(function(error) {
        console.log(error);
      });
    }

  formValues() {
    const { title, body, day_date, rating } = this.refs
    return {
      title: title.getValue(),
      body: body.getValue(),
      day_date: day_date.getValue(),
      rating: rating.getValue(),
    }
  }

  render() {

    return (
      <div>
        <Paper style={ dialogStyle }>
          <div>
            <TextField name="title" ref="title" hintText="Give an inspirational title" />
          </div>
          <div>
            <TextField name="body" ref="body" hintText="Describe your day.." />
          </div>
            <TextField name="day_date" type="date" ref="day_date" />
          <div>
            <TextField name="number" type="number" ref="rating" hintText="Give your day rating" />
          </div>
          <div>
            <RaisedButton onClick={this.createDay.bind(this)} label="Create your day" primary={true}/>
          </div>
        </Paper>
      </div>
    )
  }
}

export default DayForm;
