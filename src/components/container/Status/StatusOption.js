
import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { systemsService } from "../../../services/Systems";

import { Option } from '../../presentation/Option';

class _StatusOption extends React.Component {
  render() {
    return(
      <span className="StatusOption">
        <Option title={this.props.title}>
          {this.props.text} <Link to="/status">{this.props.linkText}</Link>
        </Option>
      </span>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: systemsService().status.getTitle(gameState.systems),
  text: systemsService().status.getOptionText(gameState.systems),
  linkText: systemsService().status.getLinkText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({

});

export const StatusOption = connect(
  mapStateToProps, mapDispatchToProps
)(_StatusOption);