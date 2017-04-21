import * as React from 'react';
//import styles from './ReactSearchBox.module.scss';
import { IReactSearchBoxProps } from './IReactSearchBoxProps';
import { IReactSearchBoxState } from './IReactSearchBoxState';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

declare const window: any;

export default class ReactSearchBox extends React.Component<IReactSearchBoxProps, IReactSearchBoxState> {
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

        // create redirect url to the default enterprise search results page.
        let uri: string = `${this.props.tenantUrl}/search/Pages/results.aspx`;

        // if a page is specified in the search page results url property 
        // then use it instead of the enterprise search url.
        if(this.props.searchResultsPageUrl) {
            uri = this.props.searchResultsPageUrl;
        }

        // redirect to the results page.
        window.location = `${uri}?k=${this.state.searchQuery}`;
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
