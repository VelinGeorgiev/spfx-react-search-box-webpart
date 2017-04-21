export interface IReactSearchBoxProps {
  /**
   * Search results page url.
   * Full url should be specified e.g. https://<your_tenant>.sharepoint.com/search/Pages/results.aspx.
   */
  searchResultsPageUrl: string;
  /**
   * The react search box strings.
   */
  strings: IReactSearchBoxStrings;
  /**
   * The current tenant url.
   */
  tenantUrl: string;
}
