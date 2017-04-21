export interface IReactSearchBoxWebPartProps {
  /**
   * The search results page url. 
   * Full url should be to be specified e.g.
   * https://<your_tenant>.sharepoint.com/search.
   */
  searchResultsPageUrl: string;
  /**
   * Positions the webpart below the custom actions on modern site page.
   */
  enableCustomPlaceHolder: boolean;
}
