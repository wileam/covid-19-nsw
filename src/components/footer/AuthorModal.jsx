import React from 'react';
import { Modal, List, Header } from 'semantic-ui-react';

export const AuthorModal = () => (
  <Modal
    trigger={
      // eslint-disable-next-line
      <a href='#' onClick={e => e.preventDefault()}>
        Joanna and her friends
      </a>
    }
  >
    <Modal.Header>Team, Thanks and Contact</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Team member</Header>
        <List bulleted>
          <List.Item>
            <a href='https://wileam.com/'>Joanna Wu</a>: design and develop the
            website, update the data.
          </List.Item>
          <List.Item>
            <a href='https://ngot.me/'>Henry Zhuang</a>: developer, automate the data fetching and update the
            data
          </List.Item>
          <List.Item>
            <a href='https://ivanfan.net/'>Ivan(Yifan) Fan</a>: developer, add
            regression prediction functionality
          </List.Item>
          <List.Item>Nan Zhang, update and analysis the data.</List.Item>
          <List.Item>
            <a href='https://www.sydneytoday.com/'>Sydney Today</a>: media,
            provide updated data from NSW Health
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

        <Header>Contact</Header>
        <List bulleted>
          <List.Item>
          Join telegram group{' '}
            <a href='https://t.me/covid_19_au'>@covid_19_au</a>
          </List.Item>
          <List.Item>
            Email: <a href='mailto: joanna_wu@live.com'>joanna_wu@live.com</a>
          </List.Item>
        </List>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
