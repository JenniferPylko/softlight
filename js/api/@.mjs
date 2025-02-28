import SYSTEM_CONFIG from "../config/@.mjs"

export const generateRollFormula = (aspects, augments, degrades, offset) => {
    const num_dice = aspects.reduce((acc, v) => acc + v, 0)
    const augment_amount = augments - degrades

    return `${num_dice + augment_amount}d${SYSTEM_CONFIG.CORE_DIE_SIZE}kh${num_dice}ms${SYSTEM_CONFIG.CORE_DIE_MIN_0 ? num_dice : 0} + ${offset}`
}