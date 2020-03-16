import React from 'react';
import { Modal, List } from 'semantic-ui-react';

export const DisclaimerModal = () => (
  <Modal
    trigger={
      // eslint-disable-next-line
      <a href='#' onClick={e => e.preventDefault()}>
        Disclaimer
      </a>
    }
  >
    <Modal.Header>Disclaimer</Modal.Header>
    <Modal.Content>
      <Modal.Description>
      <List bulleted>
          <List.Item>
            The views and options expressed in this blog are those of the
            authors and do not necessarily reflect the official policy or
            position of any other agency, organization, employer or company
          </List.Item>
          <List.Item>
            Authors are not responsible for any errors or omissions, or for the
            results obtained from the use of this information. All information
            in this site is provided "as is", with no guarantee of completeness,
            accuracy, timeliness or of the results obtained from the use of this
            information
          </List.Item>
          <List.Item>
            We do not make any warranties about the completeness, reliability
            and accuracy of these information. None of the authors,
            contributors, adminstrators or anyone else connected with this
            website, in anyway whatsoever, can be responsible for your use of
            the information contained in or linked from these web pages. Any
            action you take upon the information on this website is strictly at
            your own risk. and we will not be liable for any losses and damages
            in connection with the use of our website.
          </List.Item>
        </List>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
