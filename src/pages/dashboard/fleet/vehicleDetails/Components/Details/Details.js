import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, Divider } from '@mui/material';
import VehicleDetails from './VehicleDetails';
import useSettings from '../../../../../../hooks/useSettings';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import useTimeline from '../../../../../../hooks/useTimeline';
import { getData } from '../../../../../../slices/CustomSlices/actions/apiActions';
import Progress from '../../../../../../Components/Progress';

const showFields = [
  {
    type: 'Rental Records',
    fields: [
      {
        name: 'Dispatched by',
        tag: "['dispatched_by']['first_name']",
        contentType: 'text',
      },
      {
        name: 'Booking #',
        tag: '["bookingGroup"]',
        contentType: 'text',
      },
      {
        name: 'Customer',
        tag: '["customer"]["name"]',
        contentType: 'text',
      },
      {
        name: 'Start Date',
        tag: '["start_date"]',
        contentType: 'date',
      },
      {
        name: 'End Date',
        tag: '["end_date"]',
        contentType: 'date',
      },
      {
        name: 'Status',
        tag: '["status"]',
        contentType: 'text',
      },
    ],
  },
  {
    type: 'Prechecks Due',
    fields: [
      {
        name: 'Filled By',
        tag: "['filled_by']['first_name']",
        contentType: 'text',
      },
      {
        name: 'Expiry Date',
        tag: "['due_date']",
        contentType: 'date',
      },
    ],
  },
  {
    type: 'Vehicle Assigned',
    fields: [
      { name: 'Assigned to', tag: "['driver']['name']", contentType: 'text' },
    ],
  },
  {
    type: 'VOR History',
    fields: [
      { name: 'Garage Name', tag: "['vortype']['name']", contentType: 'text' },
      { name: 'Address', tag: "['vortype']['address']", contentType: 'text' },
      { name: 'City', tag: "['vortype']['city']", contentType: 'text' },
    ],
  },
];

const ListElement = ({ heading, content, contentType }) => {
  return (
    <Box display="flex" alignItems={'center'}>
      <Box flexGrow={1} pr={2}>
        <Typography gutterBottom variant="body2" color="primary">
          <b>{heading} </b>
        </Typography>
      </Box>
      <Box>
        <Typography gutterBottom variant="body2" align="right">
          {contentType === 'date' && moment(content).format('DD-MM-YYYY')}
          {contentType === 'text' && content}
        </Typography>
      </Box>
    </Box>
  );
};

export default function Details({ details }) {
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let id_token = localStorage.getItem('accessToken');
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    dispatch(getData(details.id, 'vehicle/timeline', id_token)).then((res) =>
      setData(res.data)
    );
    setLoading(false);
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid
        item
        lg={settings.compact ? 6 : 4}
        md={6}
        xl={settings.compact ? 6 : 3}
        xs={12}
      >
        <VehicleDetails details={details} />
      </Grid>
      <Grid
        item
        lg={settings.compact ? 6 : 6}
        md={6}
        xl={settings.compact ? 6 : 6}
        xs={12}
      >
        <Timeline>
          {loading && <Progress />}
          {useTimeline(data)
            .sort((a, b) => b.uniqueDate - a.uniqueDate)
            .map((item) => (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  {moment(item.uniqueDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item.color} variant={item.dotVariant}>
                    {item.icon}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={0} variant="outlined">
                    <Box sx={{ width: '100%', p: 1 }}>
                      <Typography variant="h6" color="primary">
                        {item?.type}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', p: 1 }}>
                      {showFields.filter((n) => n.type === item?.type)
                        .length !== 0 &&
                        showFields
                          .filter((n) => n.type === item?.type)[0]
                          .fields?.map((row) => {
                            return (
                              <ListElement
                                heading={row.name + ' '}
                                content={eval(`item${row.tag}`)}
                                contentType={row.contentType}
                              />
                            );
                          })}
                    </Box>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </Grid>
    </Grid>
  );
}
