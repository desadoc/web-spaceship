
import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { systemsService } from "../../../services/Systems";

import { Option } from '../../presentation/Option';

class _EngineeringOption extends React.Component {
  render() {
    return(
      <span className="EngineeringOption">
        <Option title={this.props.title}>
          {this.props.text} <Link to="/engineering">{this.props.linkText}</Link>
        </Option>
      </span>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: systemsService().engineering.getTitle(gameState.systems),
  text: systemsService().engineering.getOptionText(gameState.systems),
  linkText: systemsService().engineering.getLinkText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({

});

export const EngineeringOption = connect(
  mapStateToProps, mapDispatchToProps
)(_EngineeringOption);