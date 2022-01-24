import {actions, mutations, state} from "@/store"

describe("mutations test", () => {
    it('when an increment and decrement for add count state', () => {
        // increment +1
        mutations.addToCount(state, 1)
        expect(state.count).toEqual(1)
        // decrement -1
        mutations.addToCount(state, -1)
        expect(state.count).toEqual(0)
    });
})

describe("actions test", () => {
    it('when an increment the value by 1', () => {
        let context = {
            commit: jest.fn()
        }
        actions.increment(context)
        expect(context.commit).toHaveBeenCalled()
        expect(context.commit).toHaveBeenCalledWith('addToCount', 1)
    });

    it('when an decrement the value by 1', () => {
        let context = {
            commit: jest.fn()
        }
        actions.decrement(context)
        expect(context.commit).toHaveBeenCalled()
        expect(context.commit).toHaveBeenCalledWith('addToCount', -1)
    });
})
