import { SoftlightDocumentMixin } from "../mixins/@.mjs"
import { log } from "../util.mjs"

const {DialogV2} = foundry.applications.api

export default class SoftlightActor extends SoftlightDocumentMixin(Actor, {
    character: function () {
    },
    vehicle: function () {
    }
}, {
    character: async function() {
        await DialogV2.prompt({
            window: {title: "Character Options"},
            content: `<label>link token (best for player characters)<input type=checkbox name=link ${game.user.isGM ? "" : "checked"}></label>
                      <label>token disposition<select name=disposition>
                        ${Object.entries(CONST.TOKEN_DISPOSITIONS).map(([k, v]) => `
                            <option value="${v}"
                            ${(v === CONST.TOKEN_DISPOSITIONS.SECRET && game.user.isGM)
                            || (v === CONST.TOKEN_DISPOSITIONS.FRIENDLY && !game.user.isGM) ? "selected" : ""}>${k}</option>
                        `).join("")}
                      </select></label>`,
            ok: {
                label: "create character",
                callback: (_, button) => {
                    this.updateSource({prototypeToken: {actorLink: button.form.elements.link.checked, disposition: Number.parseInt(button.form.elements.disposition.value)}})
                }
            }
        })
        log("creating character")
    }
}) {
}