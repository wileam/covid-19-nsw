import React, { useState } from 'react';
import { Message, List } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = ({ state, setActive, href }) => {
  const path = href ? `${state}${href}` : state;
  return (
    <NavLink to={path} onClick={() => setActive(state)}>
      {state}
    </NavLink>
    // <a href={path} onClick={() => setActive(state)}>{state}</a>
    // <NavLink
    //   exact
    //   activeClassName='active'
    //   to={`${state}/${href}`}
    //   onClick={() => setActive(state)}
    //   style={{textDecoration: 'underline'}}
    // >
    //   {state}
    // </NavLink>
  );
};

export const Updates = ({ pageId, active, setActive }) => {
  const [dismiss, setDismiss] = useState(false);
  const KEY = 'DISMISS_UPDATE_2';
  const handleDismiss = () => {
    setDismiss(true);
    localStorage.setItem(KEY, true);
  };
  return (
    !dismiss &&
    localStorage.getItem(KEY) !== 'true' && (
      <Message info onDismiss={handleDismiss}>
        <Message.Header>New features:</Message.Header>
        <List bulleted>
          <List.Item>
            Data summary and cases detail by postcode/<strong>suburb</strong> on{' '}
            <Nav state='NSW' setActive={setActive} href='#location'></Nav> page{' '}
            <strong>location</strong> section.
          </List.Item>
          <List.Item>
            Death cases detail on <Nav state='AUS' setActive={setActive}></Nav>{' '}
            page <strong>death</strong> section.
          </List.Item>
        </List>
      </Message>
    )
  );
};
