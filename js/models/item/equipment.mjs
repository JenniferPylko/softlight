import { SoftlightItemDataModel } from "../@.mjs"

const {ArrayField, StringField, NumberField} = foundry.data.fields

export default class SoftlightEquipmentDataModel extends SoftlightItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema()
        }
    }
}