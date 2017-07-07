import React, { Component } from 'react';
import axios from 'axios';

export default class NewPlaylist extends Component {

    constructor () {
    super();
    this.state = {
      inputValue: "",
      edited : false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange (event) {
         this.setState({
          inputValue: event.target.value,
          edited : true
        });
    }

    handleSubmit (event){
        //console.log(this.state.inputValue)
        // 

        console.log(this.state.inputValue, "inside handlesubmit");
        axios.post('/api/playlists', { name: this.state.inputValue/* req.body contents go here! */ })
        .then(res => res.data)
        .then(result => {
        console.log(result) // response json from the server!
        })
        event.preventDefault();
        this.setState({
          inputValue: ""
        });
    }

   


  render () {

      //const artists = this.state.artists.filter(artist => artist.name.match(this.state.inputValue));

      return (
          <div className="well">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset>
                <legend>New Playlist</legend>
                <div className="form-group">
                    <label className="col-xs-2 control-label">Name</label>
                    <div className="col-xs-10">
                    <input className="form-control" type="text" onChange={this.handleChange} value={this.state.inputValue} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-10 col-xs-offset-2">
                    <button type="submit" className="btn btn-success" disabled={this.state.inputValue.length > 16 || this.state.inputValue.length === 0}>Create Playlist</button>
                    <div>
                    {
                     (this.state.inputValue.length === 0 && this.state.edited === true ) ? <div className="alert alert-warning">Please enter a name</div> : <div></div>
                    }
                    {
                     (this.state.inputValue.length > 16) ? <div className="alert alert-warning">Please enter short name</div> : <div></div>
                    }
                    </div>
                    </div>
                </div>
                </fieldset>
            </form>
        </div>
      
    );
  }
}