var React = require('react');
var types = React.PropTypes;
var BsPanel = require('react-bootstrap/Panel');
var classnames = require('classnames');

var CollapseProps = {
  propTypes: {
    divider: types.bool,
    header: types.node.isRequired
  }
};

/**
 * @component BaseCollapse
 * @description An unstyled accordion for showing and hiding content
 *
 * @property header {Element} HTML to use as the accordion toggle
 * @property divider {Boolean} Adds a line between the accordion header and accordion body
 *
 * @example ```js
 * var BaseCollapse = require('pui-react-collapse').BaseCollapse;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <BaseCollapse header="Click to Toggle">
 *         <p>Toggleable content</p>
 *       </BaseCollapse>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#collapse_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#accordion)
 */
var BaseCollapse = React.createClass({
  mixins: [CollapseProps],

  getInitialState() {
    return {expanded: false};
  },

  handleSelect() {
    this.setState({expanded: !this.state.expanded});
  },

  render() {
    var {divider, header, children, ...others} = this.props;
    var classes = classnames({'panel-divider': divider});

    return (
      <BsPanel {...others} className={classes} collapsable expanded={this.state.expanded} onSelect={this.handleSelect} header={header}>
        {children}
      </BsPanel>
    );
  }
});

/**
 * @component Collapse
 * @description An accordion with an arrow icon in the toggle
 *
 * @property header {Element} HTML to use as the accordion toggle
 * @property divider {Boolean} Adds a line between the accordion header and accordion body
 *
 * @example ```js
 * var Collapse = require('pui-react-collapse').Collapse;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <Collapse header="Click to Toggle">
 *         <p>Toggleable content</p>
 *       </Collapse>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#collapse_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#accordion)
 */
var Collapse = React.createClass({
  mixins: [CollapseProps],

  render() {
    var {header, ...others} = this.props;

    header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-caret-right collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-caret-down collapse-icon"></i>
        </div>
        {header}
      </div>
    );

    return <BaseCollapse {...others} header={header} />;
  }
});

/**
 * @component AltCollapse
 * @description An accordion with a plus/minus icon in the toggle
 *
 * @property header {Element} HTML to use as the accordion toggle
 * @property divider {Boolean} Adds a line between the accordion header and accordion body
 *
 * @example ```js
 * var AltCollapse = require('pui-react-collapse').AltCollapse;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <AltCollapse header="Click to Toggle">
 *         <p>Toggleable content</p>
 *       </AltCollapse>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#collapse_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#accordion)
 */
var AltCollapse = React.createClass({
  mixins: [CollapseProps],

  render() {
    var {header, ...others} = this.props;

    header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-plus-square collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-minus-square collapse-icon"></i>
        </div>
        {header}
      </div>
    );

    return <BaseCollapse {...others} header={header}/>;
  }
});

module.exports = {BaseCollapse, Collapse, AltCollapse};
