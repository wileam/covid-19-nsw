import React from 'react';
import { Modal, List, Header, Divider } from 'semantic-ui-react';

export const AuthorModal = () => (
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
        <Header>Help wanted!</Header>
        <Modal.Description>
          <p>
            Now as there is no api provided, all the data are manually updated.
          </p>
          <p>
            We need more people to keep the data updated!! Please join telegram{' '}
            {''}
            <a href='https://t.me/covid-19-au'>@covid-19-au</a> if you wanna
            help, what we need is simply: when you saw data updated, notify in
            the group with the source link, thank you!
          </p>
        </Modal.Description>
        <Header>Team member</Header>
        <List bulleted>
          <List.Item>
            <a href='https://wileam.com/'>Joanna Wu</a>: design and develop the
            website, update the data.
          </List.Item>
          <List.Item>
            <a href='https://ngot.me/'>Henry Zhuang</a>: devops and update the
            data
          </List.Item>
        </List>

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
