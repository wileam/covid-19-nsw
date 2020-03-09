import React from 'react';
import { Modal, List, Header, Divider } from 'semantic-ui-react';

export const Footer = () => (
  <p>
    <small>
      Made by <FooterModal />, {}
    </small>
  </p>
);

export const FooterModal = () => (
  <Modal
    trigger={
      // eslint-disable-next-line
      <a href='#' onClick={e => e.preventDefault()}>
        Joanna and her friends
      </a>
    }
  >
    <Modal.Header>Team and Thanks</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Team member</Header>
        <List bulleted>
          <List.Item>
            <a href='https://wileam.com/'>Joanna Wu</a>: design and development
            of the website, updating the data.
          </List.Item>
          <List.Item>
            <a href='https://ngot.me/'>Henry Zhuang</a>: devops and updating the
            data
          </List.Item>
        </List>
      </Modal.Description>

      <Divider />

      <Modal.Description>
        <Header>Thanks to</Header>
        <List bulleted>
          <List.Item>
            <a href='https://www.echartsjs.com/'>echarts</a>
          </List.Item>
          <List.Item>
            <a href='https://airtable.com/'>airtable</a>
          </List.Item>
        </List>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
