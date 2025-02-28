import { SoftlightDocumentMixin } from "../mixins/@.mjs"

export default class SoftlightToken extends SoftlightDocumentMixin(TokenDocument) {
    prepareGenericData() {
        if (this.actorLink) {
            this.texture.src = this.actor.img
        }
    }
}