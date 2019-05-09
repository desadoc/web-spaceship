import React from 'react';
import { connect } from 'react-redux';

class _Root extends React.Component {
  render() {
    return (
      <div className="Root">
        <h2>Root</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ( {} );
const mapDispatchToProps = (dispatch) => ( {} );

export const Root = connect(
  mapStateToProps, mapDispatchToProps
)(_Root);
