/*
 * Copyright (c) 2017. Reflect, Alex K.
 */

/**
 * @fileoverview Tree main component.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


import { Sprout, SproutOrientation } from './sprout.jsx';


const BASE_LENGTH = 100;
const TIME_BETWEEN_GENERATION_TICKS = 300;
const INITIAL_GENERATION = 0;



export const Tree = React.createClass({
  timerId: 0,

  propTypes: {
    order: React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      generation: 0,
    }
  },

  getDefaultProps() {
    return {
      order: 0
    }
  },

  componentDidMount() {
      this.onGenerationUp(INITIAL_GENERATION);
  },

  componentWillUnmount() {
      clearTimeout(this.timerId);
  },

  onGenerationUp(aGeneration) {
    this.setState({
      generation: aGeneration
    });
    if (aGeneration + 1 <= this.props.order) {
      this.timerId = setTimeout(this.onGenerationUp.bind(this, aGeneration + 1),
          TIME_BETWEEN_GENERATION_TICKS);
    }
  },

  render() {
    const WIDTH = 6 * BASE_LENGTH;
    const HEIGHT = 4 * BASE_LENGTH;
    return (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
             xmlns="http://www.w3.org/2000/svg" className="main-canvas">
          <Sprout points={[
            [WIDTH / 2 - BASE_LENGTH / 2, 0],
            [WIDTH / 2 - BASE_LENGTH / 2, BASE_LENGTH],
            [WIDTH / 2 + BASE_LENGTH / 2, BASE_LENGTH],
            [WIDTH / 2 + BASE_LENGTH / 2, 0]
          ]} generation={0} treeGeneration={this.state.generation}
                  order={this.props.order}
                  side={BASE_LENGTH}
                  orientation={SproutOrientation.MIDDLE}
                  angle={0}
          />
        </svg>
    );
  },
});