import React from 'react';
import MyDropzone from '../../containers/MyDropzone'
// import { connect } from "react-redux";
// import * as actions from "../../redux/actions";

const Home = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <MyDropzone />
      </header>
    </div>
  )
}

export default Home;
