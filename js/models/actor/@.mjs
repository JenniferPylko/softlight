import {SoftlightBaseDataModel} from "../@.mjs"
import { field_mixins } from "../../mixins/@.mjs"
import {CollectionViewField} from "../../fields/@.mjs"

const {BooleanField, FilePathField} = foundry.data.fields

export default class SoftlightActorDataModel extends SoftlightBaseDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            dead: new BooleanField(),
            facets: field_mixins.facets(),
            token: new FilePathField({categories: ["IMAGE"]})
        }
    }
}