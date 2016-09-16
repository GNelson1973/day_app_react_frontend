import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import request from 'superagent';
import Days from './Days';

const style = {
    image: {
    height: 300,
    width: 500,
  },
    buttonText: {
    marginTop: -2,
    fontSize: 40,
    }
}


class DayItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: false
    };
  }

  renderImage(){
    if (this.props.image.image.url == null) {return}
    return (<img style={ style.image }src={this.props.image.image.url} />)
  }

  deleteDay(e){
    e.preventDefault();

    let id = parseInt(this.props.id);
    console.log('deleteDay id', id)

    let req = request
      .delete(`http://localhost:3000/days/${id}.json`)

    console.log('deleteDay req', req)

    let deletefunc = req.field('artwork[id]', id).end((err, response) => {
              if (response.ok) {
                console.log(response.body)
              }

              if (err) {
                console.error(err)
              }
            })

    console.log('deletefunc', deletefunc)

    this.setState({
      days: !this.state.created
    })
  }

  render() {
    console.log('class DayItem: ', this.props.image.image.url == null == true);

    const cts = this.props.date
    const cdate = (new Date(cts)).toString();
    const { days } = this.state
    return (
        <div>
          <h2>Title {this.props.title}</h2>
          <p>{cdate}</p>
          <p>Day rating: {this.props.rating}</p>
          <p>Day id: {this.props.id}</p>
          <div>
            { this.renderImage() }
          </div>
          <p>{this.props.body}</p>
          <p>
            <a href={this.props.url}>Read day</a>
          </p>
          <div>
            <FloatingActionButton
              onClick={this.deleteDay.bind(this)}
              primary={true}>
                <div ><p style={style.buttonText}>-</p></div>
            </FloatingActionButton>
          </div>
        </div>
    );
  }
}

export default DayItem;
