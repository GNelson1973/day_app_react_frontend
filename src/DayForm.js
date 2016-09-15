import React from 'react';
import $ from 'jquery';
import Days from './Days';
import Dropzone from 'react-dropzone'
import request from 'superagent';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';

const dialogStyle = {
  width: '700px',
  height: '800px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
  marginTop: '1rem',
}

const dropping = {
    marginTop: '1rem',
};

class DayForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      created: false
    };
  }

  createDay(e){
      e.preventDefault();

      this.setState({
        created: !this.state.created
      })
      let req = request
        .post(`http://localhost:3000/days.json`)

      console.log('files; ', this.state.files)

      this.state.files.forEach((file) => {
        req.attach('day[image]', file)
        })

      req.field('day[title]', this.refs.title.getValue())
          .field('day[body]', this.refs.body.getValue())
          .field('day[day_date]', this.refs.day_date.getValue())
          .field('day[rating]', this.refs.rating.getValue())
          .end((err, response) => {
            if (response.ok) {
              console.log(response.body)
            }

            if (err) {
              console.error(err)
            }
          })

    }

  onDrop(files) {
    console.log('Received files: ', files);
    this.setState({
      files: files
    });
  }

  renderForm(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    let Currday = dd+'-'+mm+'-'+yyyy;
    return (
      <Paper style={ dialogStyle }>
        <h1>{Currday}</h1>
        <div>
          <TextField name="day_date" type="date" ref="day_date" />
        </div>
        <div>
          <TextField name="title" ref="title" hintText="Give an inspirational title" />
        </div>
        <div>
          <TextField name="number" type="number" ref="rating" hintText="Give your day rating" />
        </div>
          <Divider />
        <div>
          <TextField name="body" ref="body" hintText="Describe your day.."
          multiLine={true}
          rows={8}
          rowsMax={25}
          fullWidth={true}/>
        </div>
          <Divider />
        <div>
          <RaisedButton style={buttonStyle} onClick={this.createDay.bind(this)} label="Create your day" primary={true}/>
        </div>
        <div style={dropping}>
          <Dropzone
            accept="image/*"
            multiple={false}
            onDrop={this.onDrop.bind(this)}
          >
            <p>Click or drag an image to add to your day.</p>
          </Dropzone>
        </div>
      </Paper>
    )
  }

  render() {
    const { created } = this.state
    console.log(created)
    return (
      <div>
        { created ? <Days /> : this.renderForm() }
      </div>
    )
  }
}

export default DayForm;
