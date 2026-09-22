import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      children?: React.ReactNode;
      key?: React.Key;
      src?: string;
      href?: string;
      alt?: string;
      target?: string;
      rel?: string;
      type?: string;
      loading?: string;
      as?: any;
      forwardedAs?: any;
      [propName: string]: any;
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}

declare module 'react' {
  interface Attributes {
    children?: React.ReactNode;
    [propName: string]: any;
  }
}
