import {SoftlightActorSheet} from "./@.mjs"
import { SoftlightAppTemplateMixin } from "../mixins/@.mjs"

export default class SoftlightCharacterSheet extends SoftlightAppTemplateMixin(SoftlightActorSheet, "character") {
    static DEFAULT_OPTIONS = {
        classes: ["character-sheet"],
        position: {
            width: 800,
            height: 600
        },
        actions: {
            "edit-portrait": function(event) {
                const picker = new FilePicker({
                    type: "image",
                    current: event.target.src,
                    allowUpload: true,
                    callback: (src) => {
                        event.target.src = src
                        this.document.update({"img": src})
                        this.document.prototypeToken.update({"texture": {"src": src}})
                    }
                })
                return picker.browse()
            },
            "save": function(event) {
                const editor = event.target.closest("prose-mirror")
                const edited_field = editor.dataset.edit
                this.document.update({[edited_field]: editor.querySelector(".editor-content").innerHTML})
            },
            "add-upgrade-point": function() {
                this.document.update({"system.upgrade_points": this.document.system.upgrade_points + 1})
            }
        },
        dragDrop: {
            dragSelector: "*",
            dropSelector: "*",
            callbacks: {dragstart: console.log, drop: console.log}
        }
    }
    inputListener(event) {
            if (event.target.dataset.edit === "name") {
                this.document.update({"name": event.target.value})
            }
    }
    async _onDrop(event) {
        console.log(event)
        super._onDrop(event)
    }
    async updateView(result, content) {
        super.updateView(result, content)
        if (typeof result === "string") {
            return
        }
        if (result?.img) {
            content.querySelector(".actor-thumbnail").src = result.img
        }
        if (result?.name && result.name !== this.document.name) {
            content.querySelector("[data-edit='name']").value = result.name
        }
        if (typeof result?.system?.upgrade_points !== "undefined") {
            content.querySelector(".upgrade-points").innerHTML = (await this.template).upgrade_points_template(result.system.upgrade_points)
        }
    }
    async _replaceHTML(result, content) {
        super._replaceHTML(result, content)
        const description = content.querySelector("prose-mirror.actor-description")
        description._setValue(this.document.system.description)
        content.addEventListener("change", this.inputListener.bind(this))
        content.addEventListener("input", this.inputListener.bind(this))
    }
}