/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


import { Sprout, SproutOrientation } from 'sprout';


const BASE_LENGTH = 100;

/**
 */
export const Tree = React.createClass({
  propTypes: {
    generation: React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      generation: 0
    }
  },

  getDefaultProps() {
    return {}
  },

  render() {
    const WIDTH = 6 * BASE_LENGTH;
    const HEIGHT = 4 * BASE_LENGTH;
    return (
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
             xmlns="http://www.w3.org/2000/svg">
          <Sprout x={WIDTH / 2 + BASE_LENGTH / 2} y={HEIGHT - BASE_LENGTH}
                  generation={0} order={0} side={BASE_LENGTH}
                  orientation={SproutOrientation.MIDDLE} angle={0}/>
        </svg>
    );
  },
});