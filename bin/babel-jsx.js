/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Script that runs babel jsx transform.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

const execSync = require('child_process').execSync;
const readdirSync = require('fs').readdirSync;
const statSync = require('fs').statSync;
const path = require('path');

const BABEL_COMMAND = path.join(__dirname, '..', 'node_modules', '.bin', 'babel');

function exec(command) {
  execSync(command, {stdio: [0, 1, 2]})
}

const rootDirName = path.join(__dirname, '..', 'src', 'tree');

function readDir(dirName) {
  readdirSync(dirName).forEach(fileName => {
    const fullFileName = path.join(dirName, fileName);
    const stat = statSync(fullFileName);
    if (stat.isDirectory()) {
      readDir(fullFileName);
    } else {
      if (/.*\.jsx$/.test(fullFileName)) {
        exec(`${BABEL_COMMAND} ${fullFileName} -o ${fullFileName + '.js'} --plugins syntax-jsx,transform-react-jsx`);
      }
    }

  });
};

readDir(rootDirName);