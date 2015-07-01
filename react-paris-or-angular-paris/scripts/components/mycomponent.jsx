import React from 'react';
import request from 'superagent';
import moment from 'moment';

let Mycomponent = React.createClass({
  getInitialState() {
    return {
      score: 0,
      numPeopleInReact: 0,
      numPeopleInAngular: 0,
      turn: 0,
      data: [],
      displayingAnswer: false,
      currentAnswer: null,
      currentAnswerCorrect: null
    };
  },
  componentWillMount() {
    var that = this;
    request.get('/data').end(function(err, res) {
      if (!err) {
        that.setState({ data: JSON.parse(res.text) });
      }
    });
  },
  renderLoading() {
    return (
      <div className="sk-spinner sk-spinner-double-bounce">
        <div className="sk-double-bounce1"></div>
        <div className="sk-double-bounce2"></div>
      </div>
    );
  },
  currentPersonData() {
    return this.state.data[this.state.turn];
  },
  renderCurrentPersonPhoto(photoUrl) {
    if (photoUrl) {
      return (<img src={photoUrl} width="200" className="img-thumbnail"/>);
    } else {
      return (<img src="http://lorempixel.com/300/300" width="200" className="img-thumbnail" />);
    }
  },
  checkAnswer(reactOrAngular) {
    var currentPersonData = this.currentPersonData();
    var currentAnswerCorrect = currentPersonData.reactOrAngular == reactOrAngular;
    var score = (currentAnswerCorrect ? this.state.score + 1 : this.state.score);
    var numPeopleInReact = this.state.numPeopleInReact;
    var numPeopleInAngular = this.state.numPeopleInAngular;

    if (currentPersonData.reactOrAngular === "react") {
      numPeopleInReact++;
    } else {
      numPeopleInAngular++;
    }

    this.setState({
      currentAnswer: reactOrAngular,
      displayingAnswer: true,
      currentAnswerCorrect: currentPersonData.reactOrAngular == reactOrAngular,
      score: score,
      numPeopleInReact: numPeopleInReact,
      numPeopleInAngular: numPeopleInAngular
    });
  },
  showNextPerson() {
    this.setState({
      displayingAnswer: false,
      turn: this.state.turn + 1
    });
  },
  renderChoicesOrAnswer() {
    if (this.state.displayingAnswer) {
      var reactButtonPrefix = '';
      var angularButtonPrefix = '';
      var reactButtonClass = '';
      var angularButtonClass = '';

      if (this.state.currentAnswer == 'react') {
        reactButtonPrefix = (this.state.currentAnswerCorrect ? '✓ ': '✗ ');
        reactButtonClass = (this.state.currentAnswerCorrect ? 'btn-success': 'btn-danger');
        angularButtonClass = "disabled";
      } else {
        angularButtonPrefix = (this.state.currentAnswerCorrect ? '✓ ': '✗ ');
        angularButtonClass = (this.state.currentAnswerCorrect ? 'btn-success': 'btn-danger');
        reactButtonClass = "disabled";
      }

      return (<div>
        <button className={ "btn btn-default btn-lg " + reactButtonClass}><strong>{reactButtonPrefix}ReactJS</strong> Paris Meetup?</button>&nbsp;
        <button className={ "btn btn-default btn-lg " + angularButtonClass}><strong>{angularButtonPrefix}AngularJS</strong> Paris Meetup?</button>
        <h3>
          {this.state.currentAnswerCorrect ? 'Correct!': 'Incorrect!'}
          &nbsp;
          Score: <strong>{this.state.score}</strong> out of <strong>{this.state.turn + 1}</strong>
        </h3>
        <br/>
        <button className="btn btn-primary btn-lg" onClick={ this.showNextPerson }>
          <strong>Next Person →</strong>
        </button>
      </div>);
    } else {
      return (
        <div>
          <button className="btn btn-default btn-lg" onClick={ () => this.checkAnswer("react") }><strong>ReactJS</strong> Paris Meetup?</button>&nbsp;
          <button className="btn btn-default btn-lg" onClick={ () => this.checkAnswer("angular") }><strong>AngularJS</strong> Paris Meetup?</button>
          <hr className="small-hr"/>
          {this.renderStats()}
        </div>
      );
    }
  },
  renderCurrentPerson() {
    var currentPersonData = this.currentPersonData();
    return (
      <div>
        {this.renderCurrentPersonPhoto(currentPersonData.photoUrl)}
        <h2><strong>{currentPersonData.name}</strong></h2>
        <p className="lead">
          On {moment(currentPersonData.joined).format('Do MMM YYYY')}, this person joined...
        </p>
        {this.renderChoicesOrAnswer()}
      </div>
    );
  },
  renderStats() {
    return (
      <div>
        <h4><strong>Stats</strong></h4>
        <p>Score: <strong>{this.state.score}</strong> out of <strong>{this.state.turn}</strong></p>
        <p><strong>{this.state.numPeopleInReact}</strong> People in ReactJS Paris</p>
        <p><strong>{this.state.numPeopleInAngular}</strong> People in AngularJS Paris</p>
      </div>
    );
  },
  render() {
    if (this.state.data.length) {
      if (this.state.turn == this.state.data.length) {
        return (
          <div>
            <h1>Game Over!</h1>
            {this.renderStats()}
          </div>
        );
      } else {
        return (
          <div>
            <p className="text-quiet"><strong>React Paris or Angular Paris</strong> by Shu Uesugi (@chibicode)</p>
            {this.renderCurrentPerson()}
          </div>
        );
      }
    } else {
      return this.renderLoading();
    }
  }
});

export default Mycomponent;
