/* global initializeLayout:writable, $ */
initializeLayout = function (viewName) {
  'use strict';
  if (viewName === 'home') {
    require('./home').initialize();
  }
};