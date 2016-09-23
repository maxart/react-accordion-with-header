import React, { Component, Children, cloneElement, PropTypes } from 'react';
import classNames from 'classnames';
import { getHorizontalAlignment, getVerticalAlignment } from './utils';

const defaultStyle = {
  padding: 10
};

export default class AccordionHeader extends Component {

  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    this.handleHeaderClick= this.handleHeaderClick.bind(this);
  }

  handleHeaderClick(index) {
    this.props.onClickHeader(index);
    //handled in props.onClickHeader() of AccordionNode > props.onSelect() of AccordionWithHeader
  }

  renderChildren() {
    if (this.props.title) {
      return <h1>{this.props.title}</h1>;
    }
    if (!this.props.template && !this.props.children && !this.props.title) {
      throw new Error('AccordionHeader must have a title or template or at least one child!');
    }
    if (this.props.template) {
      return this.props.template;
    }
    return this.props.children;
  }

  render() {

    const {
      titleColor, verticalAlignment, horizontalAlignment, className
    } = this.props;

    let style = {
      cursor: 'pointer',
      color: titleColor || 'black',
      display: '-webkit-flex',
      display: 'flex',
      flexDirection: 'row',
      alignItems: getVerticalAlignment(verticalAlignment),
      justifyContent: getHorizontalAlignment(horizontalAlignment),
    };

    return (
      <div className={classNames(className)}
           onClick={this.handleHeaderClick}
           style={{...defaultStyle, ...style}}>
        {this.renderChildren()}
      </div>
    );
  }
}

AccordionHeader.propTypes = {
  className: PropTypes.string,
  verticalAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  horizontalAlignment: PropTypes.oneOf(['centerSpaceBetween', 'centerSpaceAround', 'center', 'left', 'right']),
  title: PropTypes.string,
  titleColor: PropTypes.string,
  template: PropTypes.element
};
AccordionHeader.defaultProps = {
  horizontalAlignment: 'centerSpaceAround',
  verticalAlignment: 'center',
  titleColor: 'black'
};
