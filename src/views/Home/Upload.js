import React, { Component } from 'react';
import Papa from 'papaparse';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvfile: undefined
    };
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  // updateData = (result) => {
  //   var data = result.data;
  //   console.log(data);
  // }

  updateData = async (result) => {
    let data = result.data;
   console.log(data);

    let options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    }

    try {
      const response = await fetch("http://localhost:3001/upload", options)
      if(!response.ok) { throw new Error(`Fetch Call Cannot Be Made`)}
      let dataResponse = await response.json();
      console.log(dataResponse);
    } catch (error) {
      console.log('error', error.message);
    }
  }

  render() {
    return (
      <div className="container">
        <label>Upload Your File </label>
        <input type="file" className="form-control" onChange={this.handleChange}/>
        <button type="button" onClick={this.importCSV}>Upload</button>
      </div>
    );
  }
}

export default Upload;
