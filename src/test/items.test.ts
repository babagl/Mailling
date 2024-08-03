import { describe, it } from "node:test";
import { Items } from "../items";

describe('items', ()=>{
    it('should return the first item', ()=>{
        expect(Items.getItem()).toBe('items 1');
    });
})