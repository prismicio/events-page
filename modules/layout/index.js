import { Fragment } from 'react';
import Header from './header';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}
