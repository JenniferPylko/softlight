import SYSTEM_CONFIG from "../config/@.mjs"

export default class SoftlightDie extends foundry.dice.terms.DiceTerm {
    static DENOMINATION = "s"
    static MODIFIERS = {
        "a": "augment",
        "d": "degrade"
    }
    constructor(termData) {
        termData.faces = 10
        super(termData)
        this.augments ??= 0
    }
    async _evaluateModifiers() {
        await super._evaluateModifiers()
        for (let i = 0; i < Math.abs(this.augments); ++i) {
            await this.roll()
        }
        this.results = this.constructor._keepOrDrop(this.results, this.number, {keep: true, highest: this.augments > 0})
    }
    async roll(options) {
        const roll = {active: true}
        roll.result = await this._roll(options)
        if (typeof roll.result === "undefined") {
            roll.result = this.randomFace()
        }
        this.results.push(roll)
        return roll
    }

    mapRandomFace(randomUniform) {
        return Math.ceil(randomUniform * this.faces - 1)
    }

    augment() {
        this.augments += 1
    }
    degrade() {
        this.augments -= 1
    }
}