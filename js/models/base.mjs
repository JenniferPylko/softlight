import { field_mixins } from "../mixins/@.mjs"

export default class SoftlightBaseDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            ...field_mixins.description()
        }
    }
}