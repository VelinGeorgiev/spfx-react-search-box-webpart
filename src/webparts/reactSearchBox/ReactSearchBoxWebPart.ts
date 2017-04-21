import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactSearchBoxStrings';
import ReactSearchBox from './components/ReactSearchBox';
import { IReactSearchBoxProps } from './components/IReactSearchBoxProps';
import { IReactSearchBoxWebPartProps } from './IReactSearchBoxWebPartProps';

import { IAlertProps } from './components/IAlertProps';
import Alert from './components/Alert';

import { IBranding } from './branding/IBranding';
import { Branding } from './branding/Branding';

import Utils from './Utils';

export default class ReactSearchBoxWebPart extends BaseClientSideWebPart<IReactSearchBoxWebPartProps> {
  private readonly _branding: IBranding = new Branding();

  public render(): void {

    const element: React.ReactElement<IReactSearchBoxProps> = React.createElement(
      ReactSearchBox,
      {
        searchResultsPageUrl: this.properties.searchResultsPageUrl,
        strings: strings,
        tenantUrl: Utils.getTenantUrl(this.context.pageContext.site.absoluteUrl, this.context.pageContext.site.serverRelativeUrl)
      }
    );

    this._ensureDomEnhancements();

    ReactDom.render(element, this._getDomElement());
  }

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      // hides the default search box web part from modern Site Page.
      this._branding.hideDefaultSearchBox();
      return resolve();
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneSearchOptions
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('searchResultsPageUrl', {
                  label: strings.DefaultSearchResultsPageUrlFieldLabel
                }),
                PropertyPaneToggle('enableCustomPlaceHolder', {
                  label: strings.EnableCustomSearchPlaceholderLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  /** 
   *  If enableCustomPlaceHolder property is set to true will attempt to 
   *  position the component below the actions section on the site page.
   *  Otherwise will add the webpart as normally do in the scroll page section.
   */
  private _getDomElement(): HTMLElement {

    if (this.properties.enableCustomPlaceHolder) {
      // render the search component in custom placeholder bellow the actions pane.

      // verify if search custom placeholder can be created.
      let searchPlaceHolder: HTMLElement = this._branding.getSearchPlaceHolder();

      if (searchPlaceHolder) {
        return searchPlaceHolder;
      }
    }

    return this.domElement;
  }

  /**
   * DOM enhancements, if enableCustomPlaceHolder is disabled or enabled.
   */
  private _ensureDomEnhancements(): void {

    if (this.properties.enableCustomPlaceHolder) {

      if (this.displayMode === DisplayMode.Edit) {

        // show "custom mode ON" message if in edit mode.
        this._showAlert();
      }

    } else {

      // removes custom search placeholder if added before.
      // cleanup DOM between modes.
      this._branding.removeSearchPlaceholder();
    }
  }

  /**
   * Shows a message on the webpart actual placeholder in edit mode
   * because the webpart is positoned below the site page actions.
   * Indicates for page editors that the web part is on the page.
   */
  private _showAlert(): void {
    const alert: React.ReactElement<IAlertProps> = React.createElement(
      Alert,
      {
        message: strings.CustomSearchPlaceholderModeOnAlert
      }
    );
    ReactDom.render(alert, this.domElement);
  }
}

