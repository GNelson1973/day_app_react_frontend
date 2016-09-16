import React from 'react';
import $ from 'jquery';
import Days from './Days';

import Dropzone from 'react-dropzone'
import request from 'superagent';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {cyan500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';

const paperStyle = {
  marginTop: 10,
}

const dialogStyle = {
  width: '700px',
  height: '800px',
  margin: '-100px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginTop: '1rem',
}

const CreateButton = {
  marginTop: '1rem',
  marginLeft: '1.5rem',
}

const HistoryButton = {
  marginTop: '5rem',
  marginLeft: '51rem',
}

const dropping = {
  marginTop: '1rem',
  marginLeft: '12rem',
  textAlign: 'center',
};

const dragText = {
    textAlign: 'center',
    color: cyan500,
    fontSize: 20,
    lineHeight: .2,
    paddingTop: 20,
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
      <div style={paperStyle}>
        <Paper style={ dialogStyle } zDepth={4}>
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
          <div style={dropping} >
            <Dropzone
              accept="image/*"
              multiple={true}
              onDrop={this.onDrop.bind(this)}
            >
              <div style={dragText}>
                <p>Click or drag</p><br/><p>an image</p><br/><p>to your day</p>
              </div>
            </Dropzone>
          </div>
        </Paper>
      </div>
    )
  }

  showDays(){
    this.setState({
      created: !this.state.created
    })
  }

  render() {
    const { created } = this.state
    console.log(created)
    return (
      <div>
        <div style={created ? CreateButton : HistoryButton }>
          <FlatButton
            onClick={this.showDays.bind(this)}
            label={ created ? 'Create your day' : 'See history overview' }
            primary={true}/>
          </div>
        { created ? <Days /> : this.renderForm() }
      </div>
    )
  }
}

export default DayForm;
