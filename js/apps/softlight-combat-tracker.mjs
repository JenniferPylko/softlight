export default class SoftlightCombatTracker extends CombatTracker {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            template: "systems/softlight/templates/combat-tracker.hbs"
        }
    }
    async getData(options={}) {
        const context = await super.getData(options)
        
        context.round_string = `${Math.floor((context.round - 1) / 6) + 1}`
        context.phase_string = `${((context.round - 1) % 6) + 1}`

        return context
    }
}