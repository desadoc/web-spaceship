import React from 'react';
import { connect } from 'react-redux';

class _Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ( {} );
const mapDispatchToProps = (dispatch) => ( {} );

export const Home = connect(
  mapStateToProps, mapDispatchToProps
)(_Home);
