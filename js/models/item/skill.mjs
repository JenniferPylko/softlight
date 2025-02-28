import { SoftlightItemDataModel } from "../@.mjs"

const {ArrayField, StringField, NumberField} = foundry.data.fields

export default class SoftlightSkillDataModel extends SoftlightItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            requires: new ArrayField(new ArrayField(new StringField())),
            tier: new NumberField({initial: 1, required: true, integer: true})
        }
    }
}