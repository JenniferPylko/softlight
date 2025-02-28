import { log } from "../util.mjs"

export default (Base, prepareDataForType = {}, preCreate = {}) => class extends Base {
    prepareGenericData() {}
    async genericPreCreate() {}
    prepareDerivedData() {
        this.prepareGenericData()
        prepareDataForType[this.type]?.call(this)
        return this
    }
    async _preCreate() {
        log(`creating ${game.i18n.format(CONFIG[this.documentName].typeLabels[this.type])} (${game.i18n.format(this.documentName)}) document`)
        const generic = (await this.genericPreCreate()) ?? {}
        const specific = (await preCreate[this.type]?.call(this)) ?? {}
        this.updateSource({...generic, ...specific})
    }
}