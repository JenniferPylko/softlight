import { SoftlightActorDataModel } from "../@.mjs"
import CollectionViewField from "../../fields/collection-view.mjs"

const {NumberField} = foundry.data.fields

export default class SoftlightCharacterDataModel extends SoftlightActorDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            upgrade_points: new NumberField({min: 0, initial: 0, required: true, integer: true})
        }
    }
}