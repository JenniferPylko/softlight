import { SoftlightItemDataModel } from "../@.mjs"
import { field_mixins } from "../../mixins/@.mjs"
import SYSTEM_CONFIG from "../../config/@.mjs"

const {BooleanField, StringField, SchemaField, NumberField} = foundry.data.fields

export default class SoftlightModuleDataModel extends SoftlightItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...field_mixins.activation(),
            module_system: new StringField(),
            root: new BooleanField(),
            concurrency: new NumberField({initial: 0, required: true, integer: true}),
            slots: new SchemaField(Object.fromEntries(SYSTEM_CONFIG.MODULE_SYSTEMS.map((v) => [v, new NumberField()]))),
            facets: new SchemaField(Object.fromEntries(SYSTEM_CONFIG.FACETS.map((v) => [v, new NumberField()])))
        }
    }
}