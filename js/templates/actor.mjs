export const inventory_template = (itemTypes) => Object.entries(itemTypes)
.filter(([k]) => k !== "base" && k !== "module" && k !== "skill" && k !== "occupation")
.map(([k, v]) => `
    <h4 class=section-h>${k}</h4>
    <section>
        ${v.map((v) => `<div data-uuid="${v.uuid}">${v.name}</div>`).join("")}
        <div class="placeholder section-h">No entries</div>
    </section>
`).join("")

export default () => "uhhh mongus"