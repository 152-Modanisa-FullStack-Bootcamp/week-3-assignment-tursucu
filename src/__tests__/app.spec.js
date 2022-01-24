import {shallowMount} from "@vue/test-utils";
import App from "@/App";

describe('App.vue', () => {
    it('should h1 exists', () => {
        const wrapper = mountComponent(0, 0)

        expect(wrapper.find('h1').exists()).toBeTruthy()
    });

    it('should h1 text equals to daily corona cases in Turkey check', () => {
        const wrapper = mountComponent(0, 0)
        expect(wrapper.find('h1').text()).toEqual("Daily Corona Cases in Turkey")
    })

    it.each`caseName | value | styleName
            ${'danger'} | ${10} | ${'danger'}
            ${'normal'} | ${5} | ${'normal'}
            ${'safe'} | ${4} | ${'safe'}
    `('return $styleName when $caseName with $value', ({caseName, value, styleName}) => {
        const wrapper = mountComponent(0, value)
        expect(wrapper.find('.notificationArea').attributes().toString()).toContain({"class": `notificationArea ${styleName}`})
    })

    it.each`caseName | count | text
            ${'danger'} | ${10} | ${'Danger!!! Case count is 10k'}
            ${'normal'} | ${5} | ${'Life is normal. Case count is 5k'}
            ${'safe'} | ${4} | ${'So safe. Case count is 4k'}
    `('return $text when $caseName with $count', ({caseName, count, text}) => {
        const wrapper = mountComponent(count, 0)
        expect(wrapper.find('.notificationArea').text()).toEqual(text)
    })
})

function mountComponent(count, getCount) {
    return shallowMount(App, {
        mocks: {
            $store: {
                state: {
                    count: count
                },
                getters: {
                    getCount: getCount
                },
            }
        }
    })
}
