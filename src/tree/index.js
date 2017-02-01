/*
 * Copyright (c) 2017. Whisp, Alex K.
 */

/**
 * @fileoverview Application entry point.
 * @author alexeykcontact@gmail.com (Alex K)
 */
import { Tree } from 'index';


const TIME_BETWEEN_GENERATION_TICKS = 1000;
const INITIAL_GENERATION = 0;

window.addEventListener('load', onLoad, false);

function onLoad() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const tree = React.createElement(Tree, {
    generation: INITIAL_GENERATION
  });
  React.render(tree, container);

  onGenerationUp(Tree, INITIAL_GENERATION);
}

function onGenerationUp(aTree, aGeneration) {
  aTree.setState({
    generation: aGeneration
  });
  setTimeout(onGenerationUp.bind(null, Tree, aGeneration + 1),
      TIME_BETWEEN_GENERATION_TICKS);
}