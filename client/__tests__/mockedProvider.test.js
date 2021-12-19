import React from 'react';
import {mount} from "enzyme";
import {MockedProvider} from "@apollo/client/testing";

describe('Test', () => {
    it('Should render text component', () => {
        const wrapper = mount(
            <MockedProvider><div data-test-id="qwerty_id">qwerty</div></MockedProvider>
        );

        expect(wrapper.find('[data-test-id="qwerty_id"]')).toHaveLength(1);
    })
});
