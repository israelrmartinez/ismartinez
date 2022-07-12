import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/articles.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Articles(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.articles, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.articles))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data
        ? (
          <div className="section-content-container">
            <Container>
              <Timeline
                lineColor={theme.timelineLineColor}
                className="timeline"
              >
                {data.map((item) => (
                  <Fade className="fade">
                    <TimelineItem className="timeline-item"
                      key={item.title + item.date}
                      dateText={item.date}
                      dateInnerStyle={{ background: theme.accentColor }}
                      style={styles.itemStyle}
                      bodyContainerStyle={{ color: theme.color }}
                    >
                      <h2 className="item-title">
                        {item.title}
                      </h2>
                      <div style={styles.subtitleContainerStyle}>
                      <a className="link" href="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjNzbu-wfL4AhXeIzQIHXlHAzoQPAgI" target="_blank" rel="noreferrer">
                        <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                        </a>
                        {item.workType && (
                        <h5 style={styles.inlineChild}>
                    &nbsp;·
                          {' '}
                          {item.workType}
                        </h5>
                        )}
                      </div>
                      <ul style={styles.ulStyle}>
                        {item.workDescription.map((point) => (
                          <div key={point}>
                            <li>
                              <ReactMarkdown
                                children={point}
                                components={{
                                  p: 'span',
                                }}
                              />
                            </li>
                            <br />
                          </div>
                        ))}
                      </ul>
                    </TimelineItem>
                  </Fade>
                ))}
              </Timeline>
              <VerticalTimeline
                lineColor={theme.timelineLineColor}
                >
                  {data.map((item) => (
                  <Fade className="fade">
                    <VerticalTimelineElement className="vertical-timeline-element"
                      style={styles.itemStyle}
                      contentStyle={{ background: theme.background }}
                      date={item.date}
                    >
                    <h2 className="item-title">
                        {item.title}
                      </h2>
                      <div style={styles.subtitleContainerStyle}>
                      <a className="link" href={item.href} target="_blank" rel="noreferrer">
                        <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                        </a>
                        {item.workType && (
                        <h5 style={styles.inlineChild}>
                    &nbsp;·
                          {' '}
                          {item.workType}
                        </h5>
                        )}
                      </div>
                      <ul style={styles.ulStyle}>
                        {item.workDescription.map((point) => (
                          <div key={point}>
                            <li>
                              <ReactMarkdown
                                children={point}
                                components={{
                                  p: 'span',
                                }}
                              />
                            </li>
                            <br />
                          </div>
                        ))}
                      </ul>
                    </VerticalTimelineElement>
                  </Fade>
                ))}
                <VerticalTimelineElement
                >

                </VerticalTimelineElement>
              </VerticalTimeline>
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
}

Articles.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Articles;
