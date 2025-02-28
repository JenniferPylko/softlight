const {NumberField} = foundry.data.fields

export default class WrappingNumberField extends NumberField {
    constructor(options = {}, context) {
        if (typeof options.min === "undefined") {
            options.min = 0
        }
        if (typeof options.max === "undefined") {
            options.max = Number.MAX_SAFE_INTEGER
        }
        options.step = 1
        options.integer = true
        super(options, context)
        this.diff = this.max - this.min
    }

    clean(value, options) {
        return ((((super.clean(value, options) - this.min) % this.diff) + this.diff) % this.diff) + this.min
    }
}