/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.ChatList');


goog.require('whisp.action.OpenThreadFromThreadsAction');
goog.require('whisp.Store');
goog.require('goog.string');



/**
 */
const Tree = React.createClass({
  propTypes: {
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
    return (
        <g className="list-block thread-list">
          <ul>{
            this.props.threads.map(this.threadToElement)
          }</ul>
        </g>
    );
  }
});

export Tree;