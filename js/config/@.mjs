import { log } from "../util.mjs"
const SYSTEM_CONFIG = {}

log("beginning initialization")

Hooks.callAll("softlight.preConfigInit")

SYSTEM_CONFIG.BASE_FACETS = new Set(["Cyber", "Mind", "Body"])

SYSTEM_CONFIG.FACETS = []

log("generating combined facets")

Hooks.callAll("softlight.preFacetGeneration")

for (const base_facet of SYSTEM_CONFIG.BASE_FACETS) {
    const current_facet = Array.from(SYSTEM_CONFIG.FACETS)
    SYSTEM_CONFIG.FACETS.push(base_facet)
    for (const facet of current_facet) {
        SYSTEM_CONFIG.FACETS.push(`${facet}-${base_facet}`)
    }
}

SYSTEM_CONFIG.FACETS.sort((a, b) => a.split("-").length - b.split("-").length)

Hooks.callAll("softlight.postFacetGeneration")

SYSTEM_CONFIG.FACET_COLORS = {
    Cyber: "#00ff00",
    Body: "#ff0000",
    Mind: "#0000ff"
}

SYSTEM_CONFIG.MODULE_SYSTEMS = []

Hooks.callAll("softlight.preRegisterModuleSystems")

SYSTEM_CONFIG.MODULE_SYSTEMS.push({
    name: "Softlight Module System",
    abbreviation: "SMS",
    universal: false
}, {
    name: "Scintarch Module Framework",
    abbreviation: "SMF",
    universal: true
}, {
    name: "ORKT",
    abbreviation: "ORKT",
    universal: false,
}, {
    name: "Streetware System",
    abbreviation: "STWR",
    universal: true
})

Hooks.callAll("softlight.postRegisterModuleSystems")

Hooks.callAll("softlight.preCombatSetup")

SYSTEM_CONFIG.BULLET_TIME = {
    initiative: "1d100",
    phases: ["Round Start", "Gridspace", "Hacking", "Advanced Weaponry", "Simple Weaponry", "Round End"],
    targeting: {
        entities: ["SELF", "OTHER", "POINT", "AREA"],
        count: ["ZERO", "AT_LEAST", "AT_MOST", "EXACTLY"]
    }
}

SYSTEM_CONFIG.WEAPON_ATTRIBUTES = ["Advanced", "Quick Draw"]

Hooks.callAll("softlight.postCombatSetup")

SYSTEM_CONFIG.MAX_SKILL_TIER = 3

Hooks.callAll("softlight.postConfigInit")

export default SYSTEM_CONFIG