/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


import { Sprout } from 'sprout';



/**
 */
const Sprout = React.createClass({
  propTypes: {
    generation: React.PropTypes.number.isRequired,
    treeAge: React.PropTypes.number.isRequired,
    baseSideLength: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      generation: 0,
      treeAge: 0,
    }
  },

  render() {
    const sideLength = this.props.baseSideLength * Math.sin(Math.PI / 4);
    return (
        <g>
          <rect x={} y={} width={} height={}/>

          {() => {
            if (this.props.generation >= this.props.treeAge) {
              return <g>
                <Sprout generation={this.props.generation + 1}
                  treeAge={this.props.treeAge}
                        baseSideLength={}
                />
                <Sprout generation={this.props.generation + 1}
                  treeAge={this.props.treeAge}
                        baseSideLength={}
                />
              </g>
            } else
              return null;
          }}
        </g>
    );
  },
})

export Sprout;