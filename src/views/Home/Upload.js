import React, { Component } from 'react';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    }
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    console.log(data);
  }

  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  render() {
    return (
      <div className="container">
        <label>Upload Your File </label>
        <input type="file" className="form-control" multiple onChange={this.onChangeHandler}/>
        <button type="button" onClick={this.onClickHandler}>Upload</button>
      </div>
    );
  }
}

export default Upload;
