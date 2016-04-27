"use strict";
class BaseGenerator {
    nextValue() {
        if (!this.iterator) {
            this.iterator = this.getValues();
        }
        return this.iterator.next().value;
    }
    nextValues(count) {
        let vals = [];
        for (let i = 0; i < count; i++) {
            vals.push(this.nextValue());
        }
        return vals;
    }
}
exports.BaseGenerator = BaseGenerator;
class OrderedNumber extends BaseGenerator {
    constructor(min, max, step) {
        super();
        this.min = min;
        this.range = max - min;
        this.step = step || 1;
    }
    *getValues() {
        let i = 0;
        while (true) {
            yield this.min + i;
            i += this.step;
            if (i > this.range)
                i = 0;
        }
    }
}
exports.OrderedNumber = OrderedNumber;
class RandomNumber extends BaseGenerator {
    constructor(min, max, isInteger) {
        super();
        this.min = min;
        this.max = max;
        this.range = max - min;
        this.isInteger = !!isInteger;
    }
    *getValues() {
        while (true) {
            let result = (Math.random() * this.range) + this.min;
            if (this.isInteger) {
                result = Math.floor(result);
            }
            yield result;
        }
    }
}
exports.RandomNumber = RandomNumber;
class RandomInteger extends RandomNumber {
    constructor(min, max) {
        super(min, max, true);
    }
}
exports.RandomInteger = RandomInteger;
class RandomFloat extends RandomNumber {
    constructor(min, max) {
        super(min, max, false);
    }
}
exports.RandomFloat = RandomFloat;
class OrderedItem extends BaseGenerator {
    constructor(values) {
        super();
        if (!(values instanceof Array)) {
            throw new Error(`'values' is required!`);
        }
        if (values.length === 0) {
            throw new Error(`'values' must have at least one element!`);
        }
        this.values = values;
    }
    *getValues() {
        let i = 0;
        while (true) {
            yield this.values[i];
            i = (i + 1) % this.values.length;
        }
    }
}
exports.OrderedItem = OrderedItem;
class ArgumentGenerator extends BaseGenerator {
    constructor(params) {
        super();
        if (!params) {
            throw new Error(`'params' is required!`);
        }
        if (Object.keys(params).length === 0) {
            throw new Error(`At least one property on 'param' must be defined to produce a unit!`);
        }
        this.params = params;
        this.props = Object.keys(this.params);
        this.lookup = {};
        this.props.forEach(prop => {
            this.lookup[prop] = this.params[prop].getValues();
        });
    }
    *getValues() {
        while (true) {
            let obj = {};
            this.props.forEach(prop => {
                obj[prop] = this.lookup[prop].next().value;
            });
            yield obj;
        }
    }
}
exports.ArgumentGenerator = ArgumentGenerator;
//# sourceMappingURL=data.js.map