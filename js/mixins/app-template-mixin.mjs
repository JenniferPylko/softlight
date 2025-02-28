export default (Base, templateName) => class extends Base {
    static DEFAULT_OPTIONS = {
        tag: "section",
        actions: {
            "change-tab": function(event) {
                const tab = event.target.dataset.tab
                const container = event.target.closest(".tabbed-content")
                this.changeTab(container, tab, true)
            }
        }
    }
    template = import(`../templates/${templateName}.mjs`)
    changeTab(container, tab, remember = false) {
        Array.from(container.querySelectorAll("[data-tab]")).forEach((v) => {
            if (v.dataset.tab === tab) {
                v.classList.add("active")
            } else {
                v.classList.remove("active")
            }
        })
        if (typeof this.document !== "undefined" && remember) {
            this.document.setFlag("softlight", `activeTab-${container.dataset.tabGroup}`, tab)
        }
    }
    async getTemplate() {
        return (await this.template).default
    }
    async _renderHTML(context, options) {
        if (!options.force && !options.isFirstRender && options.renderContext.startsWith("update")) {
            return options.renderData
        }
        const template_resolved = await this.getTemplate()
        return template_resolved(context, options)
    }
    async updateView(result, content) {
        if (typeof this.document !== "undefined") {
            Array.from(content.querySelectorAll(".tabbed-content")).forEach((container) => {
                const tab = this.document.getFlag("softlight", `activeTab-${container.dataset.tabGroup}`)
                if (typeof tab !== "undefined") {
                    this.changeTab(container, tab)
                }
            })
        }
    }
    _replaceHTML(result, content) {
        if (typeof result === "string") {
            const element = document.createElement("div")
            element.innerHTML = result
            content.replaceChildren(element)
        }
        this.updateView(result, content)
    }
}