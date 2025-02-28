import { field_mixins } from "../../mixins/@.mjs"
import { SoftlightItemDataModel } from "../@.mjs"

const {ArrayField, SchemaField, StringField} = foundry.data.fields

export default class SoftlightWeaponDataModel extends SoftlightItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            accuracy: new ArrayField(new SchemaField({
                label: new StringField(),
                formula: new StringField()
            })),
            lethality: new ArrayField(new SchemaField({
                label: new StringField(),
                formula: new StringField()
            })),
            attributes: new ArrayField(new SchemaField({
                label: new StringField(),
                description: new StringField()
            }))
        }
    }
}