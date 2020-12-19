import React from 'react';
import { Modal } from 'semantic-ui-react';

export const ShareModal = ({ id }) => (
  <Modal
    closeIcon
    trigger={
      // eslint-disable-next-line
      <a
        className='ui button primary'
        href='#'
        onClick={e => e.preventDefault()}
      >
        Share
      </a>
    }
  >
    <Modal.Content>
      <p>Save image and share it at anywhere. #StaySafe</p>
      <img
        src={`./screenshot/${id}.png`}
        alt='covid 19 aus summary'
        width='100%'
      ></img>
    </Modal.Content>
  </Modal>
);
