import React, { useCallback, useMemo, useState } from 'react';
import { productUpdater } from './utility';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import BackspaceIcon from '@material-ui/icons/Backspace';

import Papa from 'papaparse';


const activeStyle = {
  borderColor: '#000000'
};

const acceptStyle = {
  borderColor: '#2196F3'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const DropzoneCustom = () => {
  const [csvFile, setFile] = useState([])
  const [fileTitle, setfileTitle] = useState('')

  const onDrop = useCallback(acceptedFiles => {

    setfileTitle(acceptedFiles[0].name)

    Papa.parse(acceptedFiles[0], {
      header: true,
      complete: updateData
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, rejectedFiles } = useDropzone(
    { accept: 'text/csv', noClick: false, multiple: false, onDrop }
  );

  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
    }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const removeFile = () => {
    setFile([]);
    setfileTitle('');
  }

  const updateData = (result) => {
    let { data } = result;

    let updatedProducts = productUpdater(data)
    console.log('updatedProducts', updatedProducts);
    setFile([...data])
  }

  const submitFile = async (e) => {
    e.preventDefault();
    console.log('Submit clicked');

    // console.log(data);

    // let options = {
    //   method: 'PUT',
    //   headers: {'Content-type': 'application/json'},
    //   body: JSON.stringify(data)
    // }
    //
    // try {
    //   const response = await fetch("http://localhost:3001/upload", options)
    //   if(!response.ok) { throw new Error(`Fetch Call Cannot Be Made`)}
    //   let dataResponse = await response.json();
    //   console.log(dataResponse);
    // } catch (error) {
    //   console.log('error', error.message);
    // }
  }

  return (
    <div className="container">
      <section className="File-DropContainer">
          <div className="File-Drop" {...getRootProps({style})}>
            {
              csvFile.length === 0 ? (
                <>
                  <input {...getInputProps()} />
                  <CloudUploadIcon style={{ fontSize: 80 }}  />
                  <h4>Drag 'n' drop some file here</h4>
                  <em>(Only *.csv files will be accepted)</em>
                </>
              ) : (
                <>
                  <DescriptionIcon />
                  <div className="FileReady">
                    <h4>{fileTitle}</h4>
                    <button className="Remove-File" onClick={removeFile}>
                      <BackspaceIcon />
                    </button>
                  </div>
                  <em>(Submit your custom products below)</em>
                </>
              )
            }
          </div>
      </section>
      <button className="ButtonLoad"
             onClick={submitFile}
             disabled={csvFile.length > 0 ? false : true}>
             Submit
      </button>
    </div>
  )
}

export default DropzoneCustom;

// <Dropzone accept="image/*" onDrop={this.onDrop}>
  //   {({ getRootProps, getInputProps, isDragActive }) => {
  //     return (
  //       <div
  //         {...getRootProps()}
  //         className={classNames("dropzone", {
  //           "dropzone--isActive": isDragActive
  //         })}
  //       >
  //         <input {...getInputProps()} />
  //         {isDragActive ? (
  //           <div>
  //             <div className="centered">
  //               <Icon name="cloud upload" size="big" />
  //             </div>
  //             <div className="centered">Drop Files Here.</div>
  //             <div className="centered">
  //               <Button className="drop-button">
  //                 Or Click to Select
  //               </Button>
  //             </div>
  //           </div>
  //         ) : (
  //           <div>
  //             <div className="centered">
  //               <Icon name="cloud upload" size="big" />
  //             </div>
  //             <div className="centered">
  //               Drag and Drop Supporting Files here to
  //               Upload.
  //             </div>
  //             <div className="centered">
  //               <Button className="drop-button">
  //                 Or Click to Select
  //               </Button>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   }}
  // </Dropzone>


//   const ErrorMessage = ({ children }) => (
//   <div
//     style={{
//       fontStyle: 'italic',
//       color: 'red',
//       }}
//     >
//     {children}
//   </div>
// )
