import React from 'react';
import { Modal, List, Header } from 'semantic-ui-react';

export const AuthorModal = () => (
  <Modal
    closeIcon
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
            Frontend Developer:{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://wileam.com/'
            >
              Joanna Wu
            </a>
          </List.Item>
          <List.Item>
            Backend developer:{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://ngot.me/'
            >
              Henry Zhuang
            </a>
          </List.Item>
          <List.Item>
            Prediction model:{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://ivanfan.net/'
            >
              Ivan(Yifan) Fan
            </a>
            ,{' '}
            <a href='https://scholar.google.com/citations?user=VJhnzGkAAAAJ&hl=en'>
              Chen Chen
            </a>
          </List.Item>
          <List.Item>
            Data updating: Joanna Wu, Henry Zhuang, Nan Zhang,{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/dhx2261'
            >
              Hashel(Haixiao) Dai
            </a>
            ,{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/yiying-mao/'
            >
              Mel Mao
            </a>
            ,{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/mwlite/in/mia-wu-828390167'
            >
              Mia Wu
            </a>
          </List.Item>
          <List.Item>
            Collaborators:{' '}
            <a href='https://twitter.com/COVID_Australia'>
              Jessica Urquhart @Covid_Australia
            </a>
            ,{' '}
            <a href='https://www.covidlive.com.au/'>
              Anthony Macali @Covidlive
            </a>
            ,{' '}
            <a href='https://www.covid19data.com.au/'>
              Juliette O’Brien @covid19data
            </a>
          </List.Item>
        </List>

        <Header>Thanks to</Header>
        <List bulleted>
          <List.Item>
            <a href='https://reactjs.org/'>react.js</a>
          </List.Item>
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
            Email: <a href='mailto: joanna_wu@live.com'>joanna_wu@live.com</a>
          </List.Item>
          <List.Item>
            Twitter: <a href='https://twitter.com/wileam'>@wileam</a>
          </List.Item>
          <List.Item>
            Join telegram group{' '}
            <a href='https://t.me/covid_19_au'>@covid_19_au</a>
          </List.Item>
        </List>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
