import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Pagination from '../../../src/components/content/elements/pagination';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

describe("Pagination", () => {

    it('should havent pagination element', () => {
        const renderer = TestUtils.createRenderer();

        let component = <Pagination
                 setCurrentPage={() => {}} 
                 page={0} 
                 totalPages={0}
            />;

        renderer.render(component);
        const output = renderer.getRenderOutput();
        const expected = <div></div>;
        expect(output).toIncludeJSX(expected);
    });

    it('should have pagination element and not before element', () => {
        let pagination = TestUtils.renderIntoDocument(
                <Pagination
                 setCurrentPage={() => {}} 
                 page={1} 
                 totalPages={10}
            />
        );

        let renderedPagination = TestUtils.scryRenderedDOMComponentsWithTag(pagination, "li");

        expect(renderedPagination.length).toEqual(9);
        expect(renderedPagination[0].children[0].children[0].className).toEqual('fa');
    });

    it('should have before pagination element', () => {
        let pagination = TestUtils.renderIntoDocument(
                <Pagination
                 setCurrentPage={() => {}} 
                 page={2} 
                 totalPages={10}
            />
        );

        let renderedPagination = TestUtils.scryRenderedDOMComponentsWithTag(pagination, "li")[1];
        expect(renderedPagination.children[0].children[0].className).toEqual('fa fa-angle-left');
    });

    it('should have next pagination element', () => {
        let pagination = TestUtils.renderIntoDocument(
                <Pagination
                 setCurrentPage={() => {}} 
                 page={2} 
                 totalPages={10}
            />
        );

        let renderedPagination = TestUtils.scryRenderedDOMComponentsWithTag(pagination, "li")[8];
        expect(renderedPagination.children[0].children[0].className).toEqual('fa fa-angle-right');
    });

});