export default (Base) => class extends Base {
    _configureRenderOptions(options) {
        super._configureRenderOptions(options)
        if (options.window) {
            options.window.title = this.document.name
        }
    }
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        context.document = this.document
        return context
    }
}