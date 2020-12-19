import React from 'react';
import { Modal, Grid, Divider, Tab, Icon } from 'semantic-ui-react';
// import Iframe from 'react-iframe';

export const BuyCoffeeModal = () => {
  const panes = [
    {
      menuItem: 'Wechat',
      render: () => (
        <Tab.Pane attached={false}>
          <div className='tab-content'>
            <img src='./wechat.jpeg' alt='wechat' width='100px' />
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Beem it',
      render: () => (
        <Tab.Pane attached={false}>
          <div className='tab-content'>
            <img src='./beem.svg' alt='beemit logo' width='100px' />
            <img src='./beemit.jpeg' alt='beemit' width='100px' />
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Alipay',
      render: () => (
        <Tab.Pane attached={false}>
          <div className='tab-content'>
            <img src='./alipay.jpeg' alt='alipay' width='100px' />
          </div>
        </Tab.Pane>
      )
    }
    // {
    //   menuItem: 'Paypal or card',
    //   render: () => (
    //     <Tab.Pane attached={false}>
    //       <Iframe
    //         url='https://www.buymeacoffee.com/widget/page/6bpOFt7'
    //         frameborder='0'
    //         onmousewheel=''
    //         width='100%'
    //         height='500'
    //       />
    //     </Tab.Pane>
    //   )
    // }
  ];
  return (
    <Modal
      className='buy-coffee-modal'
      closeIcon
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
              <Tab
                menu={{ secondary: true, pointing: true }}
                panes={panes}
                width={'100%'}
              />
            </Grid.Row>

            <Grid.Row>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.buymeacoffee.com/6bpOFt7'
              >
                <Icon name='external'></Icon>Paypal or card
              </a>
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <p>
                {/* so far we got {sponsor.AUD} AUD and{' '}
                {sponsor.CNY} CNY, details */}
                Thank you for your support, sponsor list see:{' '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://airtable.com/shrZ0h28K3ENwWfvc'
                >
                  sponsor list
                </a>
              </p>
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
