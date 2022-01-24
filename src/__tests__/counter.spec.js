import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "@/Counter";
import Vuex from 'vuex';
import {actions, mutations, state} from "@/store";

describe('Counter.vue', () => {

    describe('Exist and Button Functionality', () => {
        let wrapper;
        let dispatchMock;
        beforeEach(() => {
            dispatchMock = jest.fn()
            wrapper = shallowMount(Counter, {
                mocks: {
                    $store: {
                        state: {
                            count: 0
                        },
                        dispatch: dispatchMock
                    }
                }
            })
        })
        // Exist Check
        describe('should exist check', () => {
            // 1.Component Exist Check
            it('should component exist check', () => {
                expect(wrapper.exists()).toBeTruthy();
            });

            // 2.Increase button exist check
            it('should Increase button exists check', () => {
                const button = wrapper.findAll('button').filter((item) => item.text() === "Increase")
                expect(button.exists()).toBeTruthy()
            });

            // 3.Decrease button exist check
            it('should Decrease button exists check', () => {
                const button = wrapper.findAll('button').filter((item) => item.text() === "Decrease")
                expect(button.exists()).toBeTruthy()
            });

            // 7.Count text show check
            it('should Count text show check', () => {
                const textContainer = wrapper.find('span')
                expect(textContainer.text()).toBeTruthy()
            });
        });

        // Functionality Check
        describe('should functionality check', () => {
            // 4.Increase button functionality check
            it('check Increase button functionality', async () => {
                const button = wrapper.findAll('button').filter((item) => item.text() === "Increase")
                await button.trigger('click')
                expect(dispatchMock).toHaveBeenLastCalledWith('increment')
            });

            // 5.Decrease  button functionality check
            it('check Decrease button functionality', async () => {
                const button = wrapper.findAll('button').filter((item) => item.text() === "Decrease")
                await button.trigger('click')
                expect(dispatchMock).toHaveBeenLastCalledWith('decrement')
            });
        })
    })
    // 6. 2 increase + decrease functionality check together
    describe(' should 2 increase + decrease functionality check together', () => {
        it('should functionality check', async () => {

            const localVue = createLocalVue();
            localVue.use(Vuex)
            const wrapper = shallowMount(Counter, {
                localVue,
                store: new Vuex.Store({
                    state,
                    actions,
                    mutations
                }),
            })

            // Increment +1 button
            const buttonIncrease = wrapper.findAll('button').filter((item) => item.text() === "Increase")
            await buttonIncrease.trigger('click')
            expect(wrapper.vm.$store.state.count).toEqual(1)

            // Increment +1 button
            await buttonIncrease.trigger('click')
            expect(wrapper.vm.$store.state.count).toEqual(2)

            // Decrement -1 button
            const buttonDecrease = wrapper.findAll('button').filter((item) => item.text() === "Decrease")
            await buttonDecrease.trigger('click')
            expect(wrapper.vm.$store.state.count).toEqual(1)
        });
    })
});
