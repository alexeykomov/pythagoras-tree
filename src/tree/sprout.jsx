/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


/**
 * @typedef {Object.<string>}
 */
export const SproutOrientation = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  MIDDLE: 'MIDDLE',
};


/**
 */
export const Sprout = React.createClass({
  propTypes: {
    generation: React.PropTypes.number.isRequired,
    order: React.PropTypes.number.isRequired,
    side: React.PropTypes.number.isRequired,
    angle: React.PropTypes.number,
    parentAngle: React.PropTypes.number,
    orientation: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      generation: 0,
      order: 0,
      orientation: SproutOrientation.MIDDLE,
    }
  },

  getRotateAttribute() {
    switch (this.orientation) {
      case SproutOrientation.RIGHT: {
        return `rotate(${this.angle} ${this.props.x} ${})`
      }

      case SproutOrientation.MIDDLE: {
        return ``
      };break;
      default: break;
    }

    return `rotate()`;
  },

  render() {
    const sideLength = this.props.side * Math.sin(Math.PI / 4);
    return (
        <g>
          <rect x={this.props.x} y={this.props.y} width={this.props.side}
                height={this.props.side} transform={this.getRotateAttribute()}/>

          {() => {
            if (this.props.generation >= this.props.order) {
              return <g>
                <Sprout generation={this.props.generation + 1}
                        order={this.props.order}
                        side={}
                />
                <Sprout generation={this.props.generation + 1}
                        order={this.props.order}
                        side={}
                />
              </g>
            } else
              return null;
          }}
        </g>
    );
  },
});