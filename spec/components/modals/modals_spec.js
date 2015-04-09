describe('Modals', function() {
  var Modal,
    ModalBody,
    ModalFooter,
    DefaultButton,
    ReactCSSTransitionGroupChild;

  beforeEach(function() {
    spyOn(document.body, 'addEventListener');
    spyOn(document.body, 'removeEventListener');

    ReactCSSTransitionGroupChild = require('react/lib/ReactCSSTransitionGroupChild');

    spyOn(ReactCSSTransitionGroupChild.type.prototype, 'queueClass').and.callFake(function(className) {
      this.classNameQueue.push(className);
      this.flushClassNameQueue();
    });

    spyOn(ReactCSSTransitionGroupChild.type.prototype, 'transition').and.callFake(function(animationType, finishCallback) {
      var node = this.getDOMNode();
      var className = this.props.name + '-' + animationType;
      var activeClassName = className + '-active';

      var endListener = function(e) {
        if (e && e.target !== node) {
          return;
        }

        CSSCore.removeClass(node, className);
        CSSCore.removeClass(node, activeClassName);

        // Usually this optional callback is used for informing an owner of
        // a leave animation and telling it to remove the child.
        finishCallback && finishCallback();
      };

      endListener({target: node});

      CSSCore.addClass(node, className);

      // Need to do this to actually trigger a transition.
      this.queueClass(activeClassName);
    });

    Modal = require('../../../components/modals/modals').Modal;
    ModalBody = require('../../../components/modals/modals').ModalBody;
    ModalFooter = require('../../../components/modals/modals').ModalFooter;
    DefaultButton = require('../../../components/buttons/buttons').DefaultButton;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('default behavior', function() {
    var subject;
    beforeEach(function() {
      var MyModal = React.createClass({
        _openModal: function(){
          this.refs.modal.open();
        },

        _closeModal: function() {
          this.refs.modal.close();
        },

        render: function() {
          return (
            <div>
              <DefaultButton id='openButton' onClick={this._openModal}>Open Modal</DefaultButton>
              <Modal title='What a Header!' ref='modal'>
                <ModalBody>Text in a body</ModalBody>
                <ModalFooter>
                  <p>Text in a footer</p>
                  <DefaultButton id='closeButton' onClick={this._closeModal}>Close</DefaultButton>
                </ModalFooter>
              </Modal>
            </div>
          )
        }
      });

      subject = React.render(<MyModal />, root);
    });


    it('is closed by default', function() {
      expect('#root .modal').not.toExist();
    });

    describe("when mounting", function() {
      it("removes the key up event listener", function() {
        expect(document.body.addEventListener).toHaveBeenCalledWith('keyup', subject.refs.modal.onKeyUp, false);
      });
    });

    describe("when unmounting", function() {
      it("removes the key up event listener", function() {
        var onKeyUp = subject.refs.modal.onKeyUp;
        React.unmountComponentAtNode(root);
        expect(document.body.removeEventListener).toHaveBeenCalledWith('keyup', onKeyUp);
      });
    });

    describe('clicking on the modal trigger', function() {
      beforeEach(function() {
        $('#openButton').simulate('click');
      });

      it('renders a modal', function() {
        expect('.modal').toExist();
        expect('.modal').toHaveClass('modal-basic');
        expect('.modal .modal-backdrop').toHaveClass('fade');
        expect('.modal .modal-backdrop').toHaveClass('in');
        expect('.modal .modal-header').toContainText('What a Header!');
        expect('.modal .modal-body').toContainText('Text in a body');
        expect('.modal .modal-footer').toContainText('Text in a footer');
      });

      describe("pressing any key", function() {
        describe("for the escape key", function() {
          it('closes the modal', function() {
            document.body.addEventListener.calls.mostRecent().args[1]({keyCode: 27});
            expect(subject.refs.modal.state.isVisible).toBe(false);
          });
        });

        describe("any other key", function() {
          it('does not close the modal', function() {
            document.body.addEventListener.calls.mostRecent().args[1]({keyCode: 13});
            expect(subject.refs.modal.state.isVisible).toBe(true);
          });
        });
      });

      describe('clicking on the X in the header', function() {
        beforeEach(function() {
          $('.modal button.close').simulate('click');
        });

        it('closes the modal', function() {
          expect(subject.refs.modal.state.isVisible).toBe(false);
        });

        describe('opening the modal again', function() {
          beforeEach(function() {
            $('#openButton').simulate('click');
          });

          it('opens the modal', function() {
            expect(subject.refs.modal.state.isVisible).toBe(true);
          });
        });
      });

      describe('clicking on the modal backdrop', function() {
        beforeEach(function() {
          $('.modal .modal-backdrop').simulate('click');
        });

        it('closes the modal', function() {
          expect(subject.refs.modal.state.isVisible).toBe(false);
        });
      });

      describe('clicking the close button', function() {
        beforeEach(function() {
          $('#closeButton').simulate('click');
        });

        it('closes the modal', function() {
          expect(subject.refs.modal.state.isVisible).toBe(false);
        });
      });
    });
  });
});


