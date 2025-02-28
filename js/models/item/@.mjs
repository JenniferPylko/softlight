import { SoftlightBaseDataModel } from "../@.mjs"

export default class SoftlightItemDataModel extends SoftlightBaseDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...field_mixins.activation()
        }
    }
}