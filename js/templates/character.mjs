import {inventory_template} from "./actor.mjs"

export const facet = (v) =>
    `<div>
        <div class="flexrow"><div class=facet-type-label>[${v.type_label}]</div><input class="small-text-input" type="text" value="${v.label}"></div>
        <div style="background-color: ${v.color}" class="facet-bar"><div style="width: ${v.reserved}%" class="facet-bar-reserved"></div></div>
        <div>${v.woundDisplay}</div>
        <hr/>
    </div>`

export const upgrade_points_template = (upgrade_points) => `<h4 data-action=upgrade>upgrade points: ${upgrade_points > 15 || upgrade_points < 1
            ? upgrade_points
            : Array(upgrade_points).fill(0).map(() => `<i class="fa-light fa-circle-up"></i>`).join(" ")}
            <button class="heading-button" data-action="add-upgrade-point">+</button>
        </h4>`

export default ({document: {uuid, img, itemTypes, name, system: {description, facets = [], modules = [], upgrade_points}}}) => `
    <div class="flexrow">
        <img src="${img}" class="profile actor-thumbnail" data-action="edit-portrait">
        <input type=text value="${name}" data-edit="name">
    </div>
    <div class=upgrade-points>${upgrade_points_template(upgrade_points)}</div>
    <hr/>
    <section class=tabbed-content data-tab-group="character-tabs">
        <menu class="tabs character-tabs">
            <button class="active" data-action="change-tab" data-tab="description">description</button>
            <button data-action="change-tab" data-tab="skills">skills</button>
            <button data-action="change-tab" data-tab="facets">facets</button>
            <button data-action="change-tab" data-tab="modules">modules</button>
            <button data-action="change-tab" data-tab="inventory">inventory</button>
        </menu>
        <section class="tab-content active" data-tab="description">
        <prose-mirror data-edit="system.description" data-document-uuid="${uuid}" class="actor-description">${description}</prose-mirror>
        </section>
        <section class=tab-content data-tab="facets">
                <h3 class="section-h">facets<button class="heading-button" data-action="add-facet">+</button></h3>
                <section class="facets-container">
                ${facets.map(facet).join("")}
                </section>
        </section>
        <section class="tab-content" data-tab="skills">
            <h3 class="section-h">skills<button class="heading-button" data-action="add-skill">+</button></h3>
        </section>
        <section class=tab-content data-tab=modules>
                <h3 class="section-h">modules<button class="heading-button" data-action="add-module">+</button></h3>
                <section class="modules-container">
                ${modules.map((v) => `<div data-uuid=${v.uuid}>${v.name}</div>`).join("")}
                </section>
        </section>
        <section class=tab-content data-tab=inventory>
                <h3 class="section-h">inventory<button class="heading-button data-action="add-item">+</button></h3>
                <section class="inventory-container">
                ${inventory_template(itemTypes)}
                </section>
        </section>
    </section>`
