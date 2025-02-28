import { SoftlightAppTemplateMixin, SoftlightSheetMixin } from "../mixins/@.mjs";

export default class SoftlightItemSheet extends SoftlightSheetMixin(SoftlightAppTemplateMixin(foundry.applications.sheets.ItemSheetV2, "item")) {}