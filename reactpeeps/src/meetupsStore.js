import EventEmitter from 'eventemitter3';

let url = 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&text=reactjs&photo-host=public&page=20&radius=25.0&desc=False&status=upcoming&sig_id=114542702&sig=9996d9b4917e0110da46b08c75b745e4d7546361';

let _meetups = ["asd"];

class MeetupsStore extends EventEmitter {
  constructor() {
    super()
    fetch(url)
      .then((response) => response.json())
      .then(meetups => {
        _meetups = meetups.results;
        this.emit('change');
        console.log("emitted", {meetups});
  });
  }
  getEvents() {
    return _meetups;
  }

  listen() {

  }
}

export default new MeetupsStore();
