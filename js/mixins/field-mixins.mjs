import SYSTEM_CONFIG from "../config/@.mjs"

const {HTMLField, ArrayField, StringField, NumberField, SchemaField, BooleanField} = foundry.data.fields

export default {
    description: () => ({description: new HTMLField()}),
    activation: () => new ArrayField(new SchemaField({
        label: new StringField({required: true, initial: "NEW ACTION"}),
        phases: new ArrayField(new StringField({required: true, initial: "Round Start"})),
        action_points: new NumberField({required: true, integer: true, min: 0, initial: 1})
    })),
    facets: () => new ArrayField(new SchemaField({
        label: new StringField({required: true, initial: "FACET"}),
        types: new SchemaField(Object.fromEntries(
        SYSTEM_CONFIG.BASE_FACETS
            .map((facet, i) =>
                [facet, new BooleanField({required: true, initial: i === 0})]))),
        max: new NumberField({required: true, integer: true, min: 0, initial: 1}),
        current: new NumberField({required: true, integer: true, min: 0, initial: 0}),
        wounds: new NumberField({required: true, integer: true, min: 0, initial: 0})
    }))
}