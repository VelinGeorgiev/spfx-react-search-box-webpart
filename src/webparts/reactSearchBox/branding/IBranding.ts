/**
 * Please note: This interface is created to have methods related to
 * SharePoint Site page DOM manipulation. 
 * It is not recommended, but no other options provided by the Office 365 teams atm.
 * This may break the webpart if the Office 365 changes the Site Page DOM.
 */
export interface IBranding {
    /**
     * Hides the default search box from modern SharePoint Site Page.
     */
    hideDefaultSearchBox(): void;
    /**
     * Gets the html element placeholder where the webpart will be positioned on the site page.
     */
    getSearchPlaceHolder(): HTMLElement;
    /**
     * Removes custom search div element placeholder.
     */
    removeSearchPlaceholder(): void;
}