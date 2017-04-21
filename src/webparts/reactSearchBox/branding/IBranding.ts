/**
 * This interface has methods related to SharePoint Site page DOM manipulation.
 * Modifing Site Page DOM is not recommended, but no other options provided by the Office 365 teams atm.
 */
export interface IBranding {
    /**
     * Hides the OOTB search box from modern SharePoint Site Page.
     */
    hideDefaultSearchBox(): void;
    /**
     * Gets html search placeholder so it can append the webpart.
     */
    getSearchPlaceHolder(): HTMLElement;
    /**
     * Removes custom search placeholder.
     */
    removeSearchPlaceholder(): void;
}