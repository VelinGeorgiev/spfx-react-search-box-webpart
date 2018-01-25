declare interface IReactSearchBoxStrings {
  PropertyPaneSearchOptions: string;
  BasicGroupName: string;
  DefaultSearchResultsPageUrlFieldLabel: string;
  EnableCustomSearchPlaceholderLabel: string;
  CustomSearchLabel: string;
  SearchLabel: string;
  CustomSearchPlaceholderModeOnAlert: string;
}

declare module 'reactSearchBoxStrings' {
  const strings: IReactSearchBoxStrings;
  export = strings;
}
