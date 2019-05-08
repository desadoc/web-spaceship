import React from 'react';
import { connect } from 'react-redux';

class _About extends React.Component {
  render() {
    return (
      <div className="About">
        <h2>About this page</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ( {} );
const mapDispatchToProps = (dispatch) => ( {} );

export const About = connect(
  mapStateToProps, mapDispatchToProps
)(_About);
