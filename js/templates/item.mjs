export default ({document: {uuid, img, name, type, system: {tier, concurrency, description}}}) => `
    <div class="flexrow">
        <img src="${img}" class="profile item-thumbnail" data-action="edit-portrait">
        <input type=text value="${name}" data-edit="name">
    </div>
    <h3 class="section-h">${type}</h3>
    ${typeof tier === "undefined" ? "" : `<h5 class="section-h">tier ${tier}</h5>`}
    ${typeof concurrency === "undefined" ? "" : `<h5 class="section-h">concurrency ${concurrency}</h5>`}
    ${typeof description === "undefined" ? "" : `<prose-mirror data-edit="system.description" data-document-uuid="${uuid}" class="actor-description">${description}</prose-mirror>`}
    <div></div>`