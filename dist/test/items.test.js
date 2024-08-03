"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const items_1 = require("../items");
(0, node_test_1.describe)('items', () => {
    (0, node_test_1.it)('should return the first item', () => {
        expect(items_1.Items.getItem()).toBe('items 1');
    });
});
