import React from 'react';
import { Modal, Grid, Divider } from 'semantic-ui-react';

export const BuyCoffeeModal = ({sponsor}) => (
  <Modal className='buy-coffee-modal' closeIcon
    trigger={
      // eslint-disable-next-line
      <a className='bmc-button' href='#' onClick={e => e.preventDefault()}>
        <img
          src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
          alt='Buy me a coffee'
        />
        <span style={{ marginLeft: '7px', fontSize: '14px' }}>
          Buy me a coffee
        </span>
      </a>
    }
  >
    <Modal.Header>Buy me a coffee</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Grid textAlign='center' columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                <img src='./beem.svg' alt='beemit logo' width='80px' />
                <img
                  src='./beemit.jpg'
                  alt='beemit'
                  width='80px'
                  height='80px'
                />
              </div>
            </Grid.Column>
            <Grid.Column>
              <img src='./alipay.jpeg' alt='alipay' width='100px' />
            </Grid.Column>
            <Grid.Column>
              <img src='./wechat.jpeg' alt='wechat' width='100px' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.buymeacoffee.com/6bpOFt7'
            >
              Paypal or card
            </a>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <p>Thank you for your support, so far we got {sponsor.AUD} AUD and {sponsor.CNY} CNY, details see: <a target="_blank" rel="noopener noreferrer" href="https://airtable.com/shrZ0h28K3ENwWfvc">sponsor list</a></p>
          </Grid.Row>
        </Grid>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
