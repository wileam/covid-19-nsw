import React from 'react';
import { Modal, List, Header, Divider } from 'semantic-ui-react';

export const ContributeModal = () => (
  <Modal
    trigger={
      // eslint-disable-next-line
      <a href='#' onClick={e => e.preventDefault()}>
        contribute?
      </a>
    }
  >
    <Modal.Header>Help needed!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>
          Now as there is no api provided, all the data are manually updated.
        </p>
        <p>
          We need more people to keep the data updated!! Please join telegram{' '}
          {''}
          <a href='https://t.me/covid-19-au'>@covid-19-au</a> if you wanna help,
          what we need is simply: when you saw data updated, notify in the group
          with the source link, thank you!
        </p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
