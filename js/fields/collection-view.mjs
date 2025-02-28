const {DataField} = foundry.data.fields

export default class CollectionViewField extends DataField {
    constructor(collection, type, options, context) {
        super(options, context)
        this.collection = collection
        this.type = type
    }

    static get _defaults() {
        return {...super._defaults, readonly: true}
    }

    initialize(_, model) {
        const parentDocument = model?.parent
        const embeddedCollection = parentDocument?.[this.collection]
        return () => embeddedCollection?.filter((v) => v.type === this.type)
    }
}