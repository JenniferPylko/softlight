import { SoftlightAppTemplateMixin, SoftlightSheetMixin } from "../mixins/@.mjs";

import SYSTEM_CONFIG from "../config/@.mjs";

export default class SoftlightActorSheet extends SoftlightSheetMixin(SoftlightAppTemplateMixin(foundry.applications.sheets.ActorSheetV2, "actor")) {
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        for (const facet_context of context.document.system.facets) {
            let base = Color.fromString("#000000")
            for (const facet of SYSTEM_CONFIG.BASE_FACETS) {
                if (facet_context.types[facet]) {
                    base = base.add(Color.fromString(SYSTEM_CONFIG.FACET_COLORS[facet]))
                }
            }
            facet_context.type_label = Object.entries(facet_context.types)
                .filter(([, v]) => v)
                .map(([k]) => k).join("-")
            facet_context.color = base.toHTML()
            facet_context.reserved = 100 * facet_context.reserved / facet_context.max
            facet_context.woundDisplay = new Array(facet_context.wounds)
                .fill("<i class=\"fa-light fa-heart-crack\"></i>").join("")
        }
        return context
    }
}