import { SoftlightItemDataModel } from "../@.mjs"

const {ArrayField, StringField, NumberField} = foundry.data.fields

export default class SoftlightOccupationDataModel extends SoftlightItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            skills: new ArrayField(new StringField())
        }
    }
}