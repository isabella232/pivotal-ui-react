require('babel/polyfill');
require('jasmine_dom_matchers');

global.React = require('react/addons');
var jQuery = require('jquery');
Object.assign(global, {
  jQuery,
  $: jQuery
});

$.fn.simulate = function(eventName, ...args) {
  if (!this.length) {
    throw new Error(`jQuery Simulate has an empty selection for '${this.selector}'`);
  }
  $.each(this, function() {
    if (['mouseOver', 'mouseOut', 'click'].includes(eventName)) {
      React.addons.TestUtils.SimulateNative[eventName](this, ...args);
    } else {
      React.addons.TestUtils.Simulate[eventName](this, ...args);
    }
  });
  return this;
};


beforeEach(function() {
  jasmine.clock().install();
  $('body').find('#root').remove().end().append('<main id="root"/>');
});
