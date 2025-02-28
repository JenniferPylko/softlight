import {SoftlightItemDataModel} from "../@.mjs";

const {StringField, NumberField} = foundry.data.fields

export default class SoftlightHypervisorChipDataModel extends SoftlightItemDataModel {
    static defineSchema() {
        const schema = {
            ...super.defineSchema(),
            module_system: new StringField(),
            concurrency: new NumberField({initial: 1, required: true, integer: true})
        }
        delete schema.description
        return schema
    }
}