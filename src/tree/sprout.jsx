/*
 * Copyright (c) 2017. Reflect, Alex K.
 */

/**
 * @fileoverview Sprout component.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


import { DEBUG } from './../predefined';


/**
 * @enum {string}
 */
export const SproutOrientation = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  MIDDLE: 'MIDDLE',
};


const LEFT_ANGLE = 35;
const RIGHT_ANGLE = 35;


function degToRad(aDeg) {
  return Math.PI / 180 * aDeg;
}


function radToDeg(aRad) {
  return aRad * 180 / Math.PI;
}



export const Sprout = React.createClass({
  propTypes: {
    generation: React.PropTypes.number.isRequired,
    treeGeneration: React.PropTypes.number.isRequired,
    order: React.PropTypes.number.isRequired,
    side: React.PropTypes.number.isRequired,
    angle: React.PropTypes.number.isRequired,
    orientation: React.PropTypes.string.isRequired,
    points: React.PropTypes.array.isRequired,
  },

  getDefaultProps() {
    return {
      generation: 0,
      treeGeneration: 0,
      order: 0,
      orientation: SproutOrientation.MIDDLE,
      side: 0,
      angle: 0,
      points: [[0, 0],[0, 0],[0, 0],[0, 0]],
    }
  },

  /**
   * @param {SproutOrientation} aOrientation
   * @return {number}
   */
  calculateSide(aOrientation) {
    //http://planetcalc.ru/964/
    const oppositeAngle = aOrientation == SproutOrientation.LEFT ? RIGHT_ANGLE : LEFT_ANGLE;
    const side = this.props.side * Math.sin(degToRad(oppositeAngle)) / Math.sin(
            degToRad(180 - LEFT_ANGLE - RIGHT_ANGLE));

    return side;
  },

  /**
   * @param {SproutOrientation} aOrientation
   * @return {number}
   */
  calculateAngle(aOrientation) {
    if (this.props.orientation === aOrientation || this.props.orientation === SproutOrientation.MIDDLE) {

    return this.props.angle + (aOrientation ==
        SproutOrientation.LEFT ? LEFT_ANGLE :
            RIGHT_ANGLE);
    } else {
      let number = this.props.angle - (aOrientation ==
          SproutOrientation.LEFT ? LEFT_ANGLE :
              RIGHT_ANGLE);
      if (number < this.props.angle) {
        number = 360 - number;
      }
      return number;
    }
  },

  /**
   * @param {SproutOrientation} aOrientation
   * @return {Array.<Array.<number>>}
   */
  calculatePoints(aOrientation) {
    if (aOrientation == SproutOrientation.MIDDLE) {
      return this.props.points.slice();
    }

    const side = this.calculateSide(aOrientation);
    const cumulativeAngle = this.calculateAngle(aOrientation);
    //Points are populated from lower left, clock-wise.
    const points = [];

    const [x, y] = aOrientation == SproutOrientation.LEFT ?
          this.props.points[1] :
          this.props.points[2];

    if (aOrientation == SproutOrientation.LEFT) {
      points[0] = [x, y];
      points[1] = [
        x - side * Math.cos(degToRad(90 - cumulativeAngle)),
        y + side * Math.sin(degToRad(90 - cumulativeAngle))
      ];
      points[3] = [
        x + side * Math.cos(degToRad(cumulativeAngle)),
        y + side * Math.sin(degToRad(cumulativeAngle))];
      points[2] = [
        points[3][0] - side * Math.cos(degToRad(90 - cumulativeAngle)),
        points[3][1] + side * Math.sin(degToRad(90 - cumulativeAngle))
      ];
    } else {
      points[3] = [x, y];
      points[0] = [
        x - side * Math.cos(degToRad(cumulativeAngle)),
        y + side * Math.sin(degToRad(cumulativeAngle))
      ];
      points[2] = [
        x + side * Math.cos(degToRad(90 - cumulativeAngle)),
        y + side * Math.sin(degToRad(90 - cumulativeAngle))];
      points[1] = [
        points[2][0] - side * Math.cos(degToRad(cumulativeAngle)),
        points[2][1] + side * Math.sin(degToRad(cumulativeAngle))
      ];
    }
    return points;
  },

  renderChildren() {
      const newGeneration = this.props.generation + 1;

    if (newGeneration <= this.props.order && newGeneration < this.props.treeGeneration) {
      const leftPoints = this.calculatePoints(SproutOrientation.LEFT);
      const rightPoints = this.calculatePoints(SproutOrientation.RIGHT);
      return <g>
        <Sprout generation={newGeneration}
                treeGeneration={this.props.treeGeneration}
                order={this.props.order}
                side={this.calculateSide(SproutOrientation.LEFT)}
                points={leftPoints}
                orientation={SproutOrientation.LEFT}
                angle={this.calculateAngle(SproutOrientation.LEFT)}
        />
        <Sprout generation={newGeneration}
                treeGeneration={this.props.treeGeneration}
                order={this.props.order}
                side={this.calculateSide(SproutOrientation.RIGHT)}
                points={rightPoints}
                orientation={SproutOrientation.RIGHT}
                angle={this.calculateAngle(SproutOrientation.RIGHT)}
        />
        <polygon
            points={this.serializePoints([leftPoints[0]]
                .concat([leftPoints[3]]).concat([rightPoints[3]]))}
            fill={this.getColor()}
        />
      </g>
    } else
      return null;
  },

  serializePoints(aPoints) {
    return aPoints.map(point => point.join()).join(' ')
  },

  getColor() {
    if (this.props.generation >= this.props.order - 3) {
      return '#00FF7F';
    }
    return '#B8860B';
  },

  render() {
    return (
        <g>
          <polygon points={`${this.serializePoints(this.props.points)}`}
                   fill={this.getColor()}
                   data-orientation={this.props.orientation}
                   data-angle={this.props.angle}
                   data-generation={this.props.generation}
          />
          {() => {
            if (DEBUG) {
              return this.props.points.map((point, index) =>
                  <text x={point[0]} y={point[1]}
                        fill="red"
                        fontFamily="arial"
                        fontSize="13px"
                        transform={`rotate(180 ${point[0]} ${point[1]})`}>
                    {index}
                  </text>
              )
            } else {
              return null;
            }
          }}
          {this.renderChildren()}
        </g>
    );
  },
});