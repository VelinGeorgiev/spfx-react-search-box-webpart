import { IBranding } from './IBranding';

declare const window: any;

export class Branding implements IBranding {
    private readonly _searchPlaceHolderId: string = "custom-react-react-search-box";
    private readonly _searchPlaceHolderClass: string = "custom-react-react-search-box";
    private readonly _searchPlaceHolderStyle: string = "padding-top:10px;";

    public hideDefaultSearchBox(): void {
        let attempts: number = 0;
        let timeout: number = 40;
        let count: number = 0;

        let hideDefaultSearchBox: any = () => {
            this._hideSearchBar();
            this._fixNavigation();
            count += this._hideSearchBoxes();

            // should hide 2 search boxes
            if (count < 2 && attempts < timeout) {
                // re-schedule the hide action.
                attempts += 1;
                window.setTimeout(hideDefaultSearchBox, 50);
            }
        };
        hideDefaultSearchBox();
    }

    public getSearchPlaceHolder(): HTMLElement {

        let placeholder: HTMLDivElement = window.document.getElementById(this._searchPlaceHolderId) as HTMLDivElement;

        if (placeholder) {
            return placeholder;
        } else {
            return this._createSearchPlaceHolder();
        }
    }

    public removeSearchPlaceholder(): void {
        let element: Element = window.document.getElementById(this._searchPlaceHolderId);
        if (element) {
            element.parentElement.removeChild(element);
        }
    }

    /**
     * Creates new div html element below the ms-banner (custom actions) section.
     * The react search box web part will be positioned within the placeholder.
     */
    private _createSearchPlaceHolder(): HTMLElement {

        let headers: HTMLCollectionOf<Element> = window.document.getElementsByClassName("ms-banner");
        if (headers.length === 0) {
            console.log("ms-banner class not found. Cannot append the search webpart below the custom actions section.");
            return null;
        }

        let firstHeader: HTMLElement = headers[0] as HTMLElement;
        let searchPlaceHolder: HTMLElement = window.document.createElement("div");
        searchPlaceHolder.setAttribute("id", this._searchPlaceHolderId);
        searchPlaceHolder.setAttribute("class", this._searchPlaceHolderClass);
        searchPlaceHolder.setAttribute("style", this._searchPlaceHolderStyle);
        firstHeader.appendChild(searchPlaceHolder);

        return searchPlaceHolder;
    }

    /**
     * Hides default search boxes and provides the parent function with count.
     */
    private _hideSearchBoxes(): number {

        let items: Array<HTMLElement> = window.document.getElementsByTagName("form");
        let count: number = 0;
        for (let i: number = 0; i < items.length; i++) {
            if (items[i].getAttribute("role").indexOf("search") !== -1) {
                // items[i].style.display = "none";
                items[i].parentElement.removeChild(items[i]);

                count += 1;
                if (count >= 2) {
                    break;
                }
            }
        }
        return count;
    }

    /**
     * Aligns the navigation since the search box is removed.
     */
    private _fixNavigation(): void {
        let items: Array<HTMLElement> = window.document.getElementsByTagName("nav");
        if(items.length) {
            items[0].style.top = "0px";
        }
    }

    /**
     * Hides the search bar since the search box is removed.
     */
    private _hideSearchBar(): void {

        let items: Array<HTMLElement> = window.document.getElementsByTagName("div");
        for (let i: number = 0; i < items.length; i++) {
            if (items[i].className.indexOf("searchBar_") !== -1) {
                items[i].style.display = "none";
                // items[i].parentElement.removeChild(items[i]);
                break;
            }
        }
    }
}