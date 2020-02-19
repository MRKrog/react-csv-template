import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

const Dropzone = () => {

  const onDrop = useCallback(acceptedFiles => {
    Papa.parse(acceptedFiles[0], {
      complete: updateData,
      header: true
    });
  }, []);

  const updateData = async (result) => {
    let data = result.data;

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

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default Dropzone
