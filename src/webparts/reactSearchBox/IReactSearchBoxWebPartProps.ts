export interface IReactSearchBoxWebPartProps {
  /**
   * Search results page url. 
   * Full url should be specified e.g. https://<your_tenant>.sharepoint.com/search/Pages/results.aspx.
   */
  searchResultsPageUrl: string;
  /**
   * Positions the webpart below the custom actions on modern site page.
   */
  enableCustomPlaceHolder: boolean;
}
