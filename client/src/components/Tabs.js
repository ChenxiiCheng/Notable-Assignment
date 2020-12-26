import React, { useState, useEffect } from 'react';
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { axios } from '../utils/axios';
import { endpoint } from '../utils/config';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    marginTop: 100,
    marginLeft: 250,
    height: 400,
    width: '1000px',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const VerticalTabs = ({ data }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(`${endpoint}user/${value}`)
      .then(res => {
        if (res.status === 200) {
          setAppointments(res?.data?.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${endpoint}user/${value}`)
      .then(res => {
        if (res.status === 200) {
          setAppointments(res?.data?.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // axios
    //   .get(`${endpoint}user/${newValue}`)
    //   .then(res => {
    //     if (res.status === 200) {
    //       setAppointments(res?.data?.data);
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  };

  return (
    <>
      <h3 style={{ marginTop: '10' }}>PHYSICIANS</h3>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {data.length &&
            data.map((item, index) => (
              <Tab label={item.name} {...a11yProps(index)} />
            ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          <Table variant="simple">
            <TableCaption>TODO</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Time</Th>
                <Th>Kind</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments &&
                appointments.map((item, index) => (
                  <Tr>
                    <Td>{item.name}</Td>
                    <Td>{dayjs(item.time).format('MM/DD/YYYY HH:mm')}</Td>
                    <Td>{item.kind}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Table variant="simple">
            <TableCaption>TODO</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Time</Th>
                <Th>Kind</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments &&
                appointments.map((item, index) => (
                  <Tr>
                    <Td>{item.name}</Td>
                    <Td>{dayjs(item.time).format('MM/DD/YYYY HH:mm')}</Td>
                    <Td>{item.kind}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Table variant="simple">
            <TableCaption>TODO</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Time</Th>
                <Th>Kind</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments &&
                appointments.map((item, index) => (
                  <Tr>
                    <Td>{item.name}</Td>
                    <Td>{dayjs(item.time).format('MM/DD/YYYY HH:mm')}</Td>
                    <Td>{item.kind}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TabPanel>
      </div>
    </>
  );
};
