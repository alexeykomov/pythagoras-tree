/*
 * Copyright (c) 2017. Whisp, Alex K.
 */

/**
 * @fileoverview Application entry point.
 * @author alexeykcontact@gmail.com (Alex K)
 */

import { Tree } from './tree/tree.jsx';
import { TREE_ORDER, DEBUG } from './predefined';


window.addEventListener('load', onLoad, false);
window.addEventListener('unload', onUnLoad, false);


function onLoad() {
  const container = document.querySelector('main');

  const tree = React.createElement(Tree, {
    order: TREE_ORDER,
  });
  React.render(tree, container);
}


function onUnLoad() {
}
