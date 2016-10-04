import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Confirmation from '../../../src/components/content/elements/confirmation';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

describe("Confirmation", () => {

    it('should render header with the same title passed', () => {
        const renderer = TestUtils.createRenderer();

        let title = "Remove Test";
        let message = "Are you sure you want to remove this Test?";

        let component = <Confirmation 
                title={title} 
                message={message} 
                handleClickConfirm={() => {}} 
                handleClickCancel={() => {}} 
                openModal={true}
            />;

        renderer.render(component);
        const output = renderer.getRenderOutput();
        const expected = <div className="modal-header">{title}</div>;
        expect(output).toIncludeJSX(expected);
    });

});