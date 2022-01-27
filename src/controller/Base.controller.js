import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace my.template.controller
 * @controller
 */
export default class Base extends Controller {

    // eslint-disable-next-line constructor-super
    constructor() {
        //console.log("Constructor Base");
    }

    /**
     * Convenience method for getting the view model by name in every controller of the application.
     * @public
     * @param {string} sName the model name
     * @returns {sap.ui.model.Model} the model instance
     */
    getModel(sName) {
        return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
    }

    /**
     * Convenience method for setting the view model in every controller of the application.
     * @public
     * @param {sap.ui.model.Model} oModel the model instance
     * @param {string} sName the model name
     * @returns {sap.ui.mvc.View} the view instance
     */
    setModel(oModel, sName) {
        return this.getView().setModel(oModel, sName);
    }

    /**
     * Convenience method for getting the resource bundle.
     * @public
     * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
     */
    getResourceBundle() {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    }

    /**
     * Method for navigation to specific view
     * @public
     * @param {string} psTarget Parameter containing the string for the target navigation
     * @param {Object.<string, string>} pmParameters? Parameters for navigation
     * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
     */
    navTo(psTarget, pmParameters, pbReplace) {
        this.getRouter().navTo(psTarget, pmParameters, pbReplace);
    }

    getRouter() {
        return UIComponent.getRouterFor(this);
    }

    onNavBack() {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.back();
        } else {
            this.getRouter().navTo("main", {}, true /*no history*/);
        }
    }
}
