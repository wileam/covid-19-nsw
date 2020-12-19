import React from 'react';
import { List } from 'semantic-ui-react';

const SOURCE_BY_STATE = {
  NSW:
    'https://www.health.nsw.gov.au/Infectious/diseases/Pages/covid-19-latest.aspx',
  VIC: 'https://www.dhhs.vic.gov.au/media-hub-coronavirus-disease-covid-19',
  QLD: 'https://www.health.qld.gov.au/news-events/doh-media-releases',
  WA:
    'https://ww2.health.wa.gov.au/Articles/A_E/Coronavirus/COVID19-statistics',
  SA:
    'https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/about+us/news+and+media/all+media+releases/all+media+releases',
  NT: 'https://securent.nt.gov.au/alerts/coronavirus-covid-19-updates',
  TAS: 'https://www.dhhs.tas.gov.au/news/2020',
  ACT: 'https://www.covid19.act.gov.au/home'
};

const CONTACT_BY_STATE = {
  NSW: {
    title: 'NSW - Known flights with confirmed cases',
    url:
      'https://www.health.nsw.gov.au/Infectious/diseases/Pages/coronavirus-flights.aspx'
  },
  NT: {
    url: 'https://coronavirus.nt.gov.au/home/homepage-news/contact-tracing'
  },
  QLD: {
    url:
      'https://www.qld.gov.au/health/conditions/health-alerts/coronavirus-covid-19/current-status/current-status-and-contact-tracing-alerts'
  },
  WA: {
    url:
      'https://www.healthywa.wa.gov.au/Articles/A_E/Coronavirus/Locations-visited-by-confirmed-cases'
  },
  SA: {
    title: 'SA - Known flights with confirmed cases',
    url:
      'http://emergencydepartments.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/health+topics/health+topics+a+-+z/covid+2019/latest+updates/known+flights+with+confirmed+cases+of+covid-19'
  },
  ACT: {
    title: 'ACT - Known flights with confirmed cases',
    url:
      'https://www.health.act.gov.au/about-our-health-system/novel-coronavirus-covid-19/known-flights-act-confirmed-cases-covid-19'
  }
};

const CHART_BY_STATE = {
  NSW:
    'https://www.health.nsw.gov.au/Infectious/diseases/Pages/covid-19-latest.aspx',
  VIC:
    'https://app.powerbi.com/view?r=eyJrIjoiODBmMmE3NWQtZWNlNC00OWRkLTk1NjYtMjM2YTY1MjI2NzdjIiwidCI6ImMwZTA2MDFmLTBmYWMtNDQ5Yy05Yzg4LWExMDRjNGViOWYyOCJ9'
};

export const Links = ({ pageId }) => (
  <List bulleted>
    <List.Item>
      Data source:{' '}
      <a
        href={SOURCE_BY_STATE[pageId]}
        target='_blank'
        rel='noopener noreferrer'
      >
        {pageId} Health
      </a>
      ,{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.abc.net.au/news/story-streams/coronavirus/'
      >
        ABC news
      </a>
    </List.Item>
    {CONTACT_BY_STATE[pageId] && (
      <List.Item>
        <a
          href={CONTACT_BY_STATE[pageId].url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {CONTACT_BY_STATE[pageId].title || <>{pageId} - Contact tracing</>}
        </a>
      </List.Item>
    )}
    {CHART_BY_STATE[pageId] && (
      <List.Item>
        <a href={CHART_BY_STATE[pageId]}>
          {pageId} - Official Chart by {pageId} Health
        </a>
      </List.Item>
    )}

    {/* {otherStateNumber.all !== 0 && (
    <List.Item>
      <strong className='ui small'>
        * {otherStateNumber.all}{' '}
        {otherStateNumber.all === 1 ? (
          <>case is other state's resident</>
        ) : (
          <>cases are other state's residents</>
        )}
        , count in their number in national data.
      </strong>
    </List.Item>
  )} */}
  </List>
);
