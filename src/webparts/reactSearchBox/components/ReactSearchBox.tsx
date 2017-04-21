import * as React from 'react';
import { IReactSearchBoxProps } from './IReactSearchBoxProps';
import { IReactSearchBoxState } from './IReactSearchBoxState';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

declare const window: any;

export default class ReactSearchBox extends React.Component<IReactSearchBoxProps, IReactSearchBoxState> {

  /**
   * The search results page uri with the search query included.
   */
  public ResultsPageUri: string;

  constructor(props: IReactSearchBoxProps) {
    super(props);

    this.state = {
      searchQuery: ""
    } as IReactSearchBoxState;
  }

  public render(): React.ReactElement<IReactSearchBoxProps> {
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm10">
            <SearchBox
              className="react-search-box"
              onChange={this._handleInputChange.bind(this)}
              onSearch={this._handleSearch.bind(this)}>
            </SearchBox>
          </div>
          <div className="ms-Grid-col ms-u-sm2">
            <Button id="SearchButton" onClick={this._handleSearch.bind(this)}>
              {this.props.strings.SearchLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Search button event handler.
   * @param event 
   */
  private _handleSearch(event: any): void {

    // if a page is specified in the search page results url property 
    // then use it instead of the enterprise search url.
    if (this.props.searchResultsPageUrl) {

      this.ResultsPageUri = this.props.searchResultsPageUrl;

    } else {

      // defaults to the enterprise search site collection.
      this.ResultsPageUri = `${this.props.tenantUrl}/search/Pages/results.aspx`;
    }

    // append the query string to the url.
    this.ResultsPageUri += `?k=${this.state.searchQuery}`;
    this._redirect();
  }

  /**
   * Redirects to the results page. 
   * windows.location wrapper so can be better unit tested / faked upon testing.
   */
  private _redirect(): void {

    window.location = this.ResultsPageUri;
  }

  /**
   * Search input handler.
   * @param searchQuery
   */
  private _handleInputChange(searchQuery: string): void {

    this.setState((prevState: IReactSearchBoxState, props: IReactSearchBoxProps): IReactSearchBoxState => {
      prevState.searchQuery = searchQuery;
      return prevState;
    });
  }
}
