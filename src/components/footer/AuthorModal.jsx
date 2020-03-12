import React from 'react';
import { Modal, List, Header } from 'semantic-ui-react';

export const AuthorModal = () => (
  <Modal
    trigger={
      // eslint-disable-next-line
      <a href='#' onClick={e => e.preventDefault()}>
        Joanna and her friends (Disclaimer)
      </a>
    }
  >
    <Modal.Header>Team, Thanks and Disclaimer</Modal.Header>
    <Modal.Content>
      <Modal.Description>
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
          <List.Item>
            <a href='https://ivanfan.net/'>Ivan(Yifan) Fan</a>: developer, add regression prediction functionality
          </List.Item>
          <List.Item>
            <a href='https://www.sydneytoday.com/'>Sydney Today</a>: media,
            provide updated data from NSW Health
          </List.Item>
          <List.Item>Nan Zhang, update and analysis the data.</List.Item>
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
        <Header>Disclaimer</Header>
        <List bulleted>
          <List.Item>
          The views and options expressed in this blog are those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer or company
          </List.Item>
          <List.Item>
          Authors are not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information
          </List.Item>
          <List.Item>
            We do not make any warranties about the completeness, reliability and accuracy of these information.
            None of the authors, contributors, adminstrators or anyone else connected with this website, in anyway whatsoever, can be responsible for your use of the information contained in or linked from these web pages.
            Any action you take upon the information on this website is strictly at your own risk. and we will not be liable for any losses and damages in connection with the use of our website.
          </List.Item>
        </List>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
