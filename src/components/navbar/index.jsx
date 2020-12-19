import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

const NavMap = {
  AUS: ['summary', 'trending', 'death'],
  NSW: ['summary', 'trending', 'community', 'location', 'tests', 'age'],
  VIC: ['summary', 'trending', 'community', 'tests'],
  QLD: ['summary', 'trending', 'community', 'tests'],
  WA: ['summary', 'trending', 'community', 'tests'],
  SA: ['summary', 'trending', 'community', 'tests'],
  TAS: ['summary', 'trending', 'tests'],
  NT: ['summary', 'trending', 'community', 'tests', 'detail'],
  ACT: ['summary', 'trending', 'community', 'tests']
};

export const Navbar = ({ pageId, data }) => {
  return (
    <Container>
      <Menu borderless className='navbar ui container new'>
        {NavMap[pageId].map(hash => (
          <Menu.Item>
            <span
              className='nav-text'
              onClick={() => {
                document.querySelector(`#${hash}`).scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              {hash}
            </span>
          </Menu.Item>
        ))}
      </Menu>
    </Container>
  );
};
