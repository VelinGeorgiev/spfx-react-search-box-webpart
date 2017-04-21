export interface IReactSearchBoxProps {
  /**
   * The search results page url. 
   * Full url should be to be specified e.g.
   * https://<your_tenant>.sharepoint.com/search.
   */
  searchResultsPageUrl: string;
  /**
   * The localized webpart strings.
   */
  strings: IReactSearchBoxStrings;
  /**
   * The current tenant url.
   */
  tenantUrl: string;
}
