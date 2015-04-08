require('../spec_helper');

describe('iconography', function() {
  beforeEach(function() {
    var Icon = require('../../../components/iconography/iconography').Icon;
    React.render(<Icon name="plus"/>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('works', function() {
    expect('.fa.fa-plus').toExist();
  });
});