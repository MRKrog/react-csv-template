import React, { useState } from 'react';
import { productUpdater } from './utility';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import BackspaceIcon from '@material-ui/icons/Backspace';

const DropzoneNew = () => {
  const [csvFile, setFile] = useState([])
  const [fileTitle, setfileTitle] = useState('')

  const onDrop = (acceptedFiles) => {
    if(acceptedFiles.length > 0){
      setfileTitle(acceptedFiles[0].name)
      formatFile(acceptedFiles[0])
    }
  }

  const formatFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: updateData
    });
  }

  const updateData = (result) => {
    let { data } = result;
    let updatedProducts = productUpdater(data)
    console.log('updatedProducts', updatedProducts);
    setFile([updatedProducts])
  }

  const submitFile = async () => {
    console.log('clicked submit');
    console.log('>>>csv file', csvFile);
    console.log('>>>title', fileTitle)
  }

  const removeFile = () => {
    setFile([]);
    setfileTitle('');
  }

  return (
    <div className="container">
      <div className="DropContainer">

      <Dropzone onDrop={onDrop}
                accept="text/csv"
                multiple={false}>
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
          <div className="File-Drop" {...getRootProps()}>

            {!isDragActive && csvFile.length < 1 && (
              <section className="File-Section Ready">
                <input {...getInputProps()} />
                <CloudUploadIcon style={{ fontSize: 80 }} />
                <h4>Drag 'n' Drop File Here</h4>
                <em>(Only *.csv files will be accepted)</em>
              </section>
            )}

            { isDragActive && !isDragReject && (
              <section className="File-Section Dragging">
                <input {...getInputProps()} />
                <CloudUploadIcon style={{ fontSize: 80 }} />
                <h4>Accepted File Type</h4>
                <em>(Only *.csv files will be accepted)</em>
              </section>
            )}

            { isDragReject && (
              <section className="File-Section Rejected">
                <input {...getInputProps()} />
                <CloudUploadIcon style={{ fontSize: 80 }} />
                <h4>File Type Not Allowed</h4>
                <em>(Only *.csv files will be accepted)</em>
              </section>
            )}

            { csvFile.length > 0 && (
                <section className="File-Section Loaded">
                  <DescriptionIcon style={{ fontSize: 80 }} />
                  <div className="loaded-copy">
                    <h4>{fileTitle}</h4>
                    <button className="Remove-File" onClick={removeFile}>
                      <BackspaceIcon />
                    </button>
                  </div>
                  <em>(Submit your custom products below)</em>
                </section>
              )}

          </div>
        )}
      </Dropzone>

    </div>

    <button className={csvFile.length > 0 ? 'ButtonLoad enabled' : 'ButtonLoad disabled'}
           onClick={submitFile}
           disabled={csvFile.length > 0 ? false : true}>
           Submit
    </button>
  </div>
  );
}

export default DropzoneNew;
