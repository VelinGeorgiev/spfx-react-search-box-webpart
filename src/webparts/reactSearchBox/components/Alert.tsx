import * as React from 'react';
import { IAlertProps } from './IAlertProps';

declare const window: any;

/**
 * Simple react component that shows h1 element with text.
 */
export default class Alert extends React.Component<IAlertProps> {
  public render(): React.ReactElement<IAlertProps> {
    return (
      <h1>{this.props.message}</h1>
    );
  }
}
