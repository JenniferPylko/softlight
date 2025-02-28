import SYSTEM_CONFIG from "./config/@.mjs"
import * as documents from "./documents/@.mjs"
import * as models from "./models/@.mjs"
import * as apps from "./apps/@.mjs"
import * as dice from "./dice/@.mjs"
import { log, registerDocument } from "./util.mjs"

Hooks.once("setup", () => {
    game.system.config = SYSTEM_CONFIG
})

Hooks.once("i18nInit", () => {
    log("unregistering core sheets")

    Actors.unregisterSheet("core", ActorSheet)
    Items.unregisterSheet("core", ItemSheet)

    log("loading system documents")

    registerDocument(documents.SoftlightActor, apps.SoftlightActorSheet, {
        base: {},
        character: {
            data_model: models.SoftlightCharacterDataModel,
            sheet: apps.SoftlightCharacterSheet
        },
        vehicle: {}
    })

    registerDocument(documents.SoftlightItem, apps.SoftlightItemSheet, {
        base: {},
        module: {
            data_model: models.SoftlightModuleDataModel
        },
        skill: {
            data_model: models.SoftlightSkillDataModel
        },
        weapon: {
            data_model: models.SoftlightWeaponDataModel
        },
        equipment: {
            data_model: models.SoftlightEquipmentDataModel
        },
        prosthetic: {
            data_model: models.SoftlightProstheticDataModel
        },
        tool: {
            data_model: models.SoftlightToolDataModel
        },
        collectible: {
            data_model: models.SoftlightCollectibleDataModel
        },
        occupation: {
            data_model: models.SoftlightOccupationDataModel
        },
        character_type: {
            data_model: models.SoftlightCharacterTypeDataModel
        },
        hypervisor_chip: {
            data_model: models.SoftlightHypervisorChipDataModel
        }
    })

    CONFIG.Token.documentClass = documents.SoftlightToken

    log("configuring combat tracker")

    CONFIG.ui.combat = apps.SoftlightCombatTracker

    log("configuring dice")

    CONFIG.Dice.types.push(dice.SoftlightDie)
    CONFIG.Dice.terms.s = dice.SoftlightDie
})