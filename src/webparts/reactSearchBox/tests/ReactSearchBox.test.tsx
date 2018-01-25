/// <reference types="mocha" />
/// <reference types="sinon" />

declare const sinon: any;

import * as React from 'react';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';

import ReactSearchBox from '../components/ReactSearchBox';
import Alert from '../components/Alert';
import Utils from '../Utils';

describe("ReactSearchBox component tests:", () => {
  let searchBoxComponent: any;
  let componentSearchInputHandlerSpy: any;
  let componentSearchButtonHandlerSpy: any;
  let tenantUrl: string = "https://contoso.sharepoint.com";

  // define fake webpart strings.
  const fakeStrings: { SearchLabel: string } = { SearchLabel: "fakeSearchLabel" };

  // const strings stub
  const stringsStub: any = sinon.stub(fakeStrings);
  const searchLabel: any = "fakeSearchLabel";


  before(() => {
    // stub the _redirect (windows.location) method and do not redirect when running tests.
    sinon.stub(ReactSearchBox.prototype, "_redirect").returns(_ => { return; });

    // method spies
    componentSearchButtonHandlerSpy = sinon.spy(ReactSearchBox.prototype, "_handleSearch");
    componentSearchInputHandlerSpy = sinon.spy(ReactSearchBox.prototype, "_handleInputChange");

    // mount the component.
    searchBoxComponent = mount(<ReactSearchBox customSearchLabel={searchLabel} tenantUrl={tenantUrl} searchResultsPageUrl="" />);
  });

  it("Should have one input", () => {
    expect(searchBoxComponent.find("input").length).to.be.equals(1);
  });

  it("Should have one button", () => {
    expect(searchBoxComponent.find("button").length).to.be.equals(1);
  });

  it("Should have correct button text.", () => {

    expect(searchBoxComponent.find("button").text()).to.be.equals(fakeStrings.SearchLabel);
  });

  it("Should have correct initial properties", () => {

    expect(searchBoxComponent.props().strings).to.be.equals(stringsStub);
    expect(searchBoxComponent.props().tenantUrl).to.be.equals(tenantUrl);
    expect(searchBoxComponent.props().searchResultsPageUrl).to.be.equals("");
  });

  it("Should have correct initial state", () => {

    expect(searchBoxComponent.state().searchQuery).to.be.equals("");
  });

  it("Should call the button click handler", () => {

    searchBoxComponent.find("#SearchButton").simulate("click");

    assert(componentSearchButtonHandlerSpy.calledOnce === true);
  });

  it("Should call the input change handler", () => {

    searchBoxComponent.find("input").simulate("change");

    assert(componentSearchInputHandlerSpy.called === true);
  });

  it("Should call the correct results page uri when no searchResultsPageUrl value", () => {

    // change the state.
    const searchQuery: string = "test";
    searchBoxComponent.setState({ searchQuery });

    searchBoxComponent.find("#SearchButton").simulate("click");

    let expectedUri: string = `https://contoso.sharepoint.com/search/Pages/results.aspx?k=${searchQuery}`;
    expect(searchBoxComponent.instance().ResultsPageUri).to.be.equals(expectedUri);
  });

  it("Should call the correct results page uri when has searchResultsPageUrl value", () => {

    let searchResultsPageUrl: string = "https://contoso.sharepoint.com/sites/sitecollection/search/Pages/results.aspx";

    // mount with different properties.
    let searchBoxComponent2: any =
      mount(<ReactSearchBox customSearchLabel={searchLabel} tenantUrl={tenantUrl} searchResultsPageUrl={searchResultsPageUrl} />);

    const searchQuery: string = "test";
    searchBoxComponent2.setState({ searchQuery });

    searchBoxComponent2.find("#SearchButton").simulate("click");

    let expectedUri: string = `https://contoso.sharepoint.com/sites/sitecollection/search/Pages/results.aspx?k=${searchQuery}`;
    expect(searchBoxComponent2.instance().ResultsPageUri).to.be.equals(expectedUri);
  });

  it("Should call uri with KQL query string", () => {

    let searchResultsPageUrl: string = "";

    // mount with different properties.
    let searchBoxComponent3: any =
      mount(<ReactSearchBox customSearchLabel={searchLabel} tenantUrl={tenantUrl} searchResultsPageUrl={searchResultsPageUrl} />);

    const searchQuery: string = "contenttype:Site Page AND path:https://contoso.sharepoint.com";
    searchBoxComponent3.setState({ searchQuery });

    searchBoxComponent3.find("#SearchButton").simulate("click");

    let expectedUri: string = `https://contoso.sharepoint.com/search/Pages/results.aspx?k=${searchQuery}`;
    expect(searchBoxComponent3.instance().ResultsPageUri).to.be.equals(expectedUri);
  });
});

describe("Alert react component tests:", () => {

  let alertComponent: any;
  let testMessage: string = "Test alert message.";

  before(() => {
    // mount the component.
    alertComponent = mount(<Alert message={testMessage} />);
  });

  it("Should have h1 elem", () => {
    expect(alertComponent.find("h1").length).to.be.equals(1);
  });

  it("Should return correct alert message", () => {
    expect(alertComponent.find("h1").text()).to.be.equals(testMessage);
  });
});


describe("Utils tests:", () => {
  it("Should return correct url if absoluteUrl is the tenant root", () => {

    let url: string =
      Utils.getTenantUrl("https://contoso.sharepoint.com", "/");

    expect(url).to.be.equal("https://contoso.sharepoint.com");
  });

  it("Should return correct url if absoluteUrl is a site in /sites", () => {

    let url: string =
      Utils.getTenantUrl("https://contoso.sharepoint.com/sites/sitecollection", "/sites/sitecollection");

    expect(url).to.be.equal("https://contoso.sharepoint.com");
  });
});

