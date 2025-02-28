import {SoftlightBaseDataModel} from "./models/@.mjs"

export const log = (text) => {
    if (typeof ui.notifications !== "undefined") {
        ui.notifications.info(`::softlight: ${text}`, {console: false})
    }
    console.log(`%c::softlight: ${text}`, "color: lime; text-shadow: lime 1px 0 10px; text-transform: uppercase")
}

export const registerDocument = (document, defaultSheet, types) => {
    const name = document.documentName
    CONFIG[name].documentClass = document
    if (typeof types !== "undefined") {
        const collection = CONFIG[name].collection
        const entries = Object.entries(types)
        let i = 0
        for (const [key, type] of entries) {
            const i18n_key = `SOFTLIGHT.Labels.${name}.${key}`
            log(`loading ${name} type ${++i}/${entries.length}: ${game.i18n.format(i18n_key)}`)
            CONFIG[name].dataModels[key] = type.data_model ?? SoftlightBaseDataModel
            CONFIG[name].typeLabels[key] = i18n_key
            if (typeof type.sheet !== "undefined" || typeof defaultSheet !== "undefined") {
                collection.registerSheet("softlight", type.sheet ?? defaultSheet, {
                    makeDefault: true,
                    types: [key],
                    label: `Softlight ${game.i18n.format(i18n_key)} Sheet`
                })
            }
        }
    }
}