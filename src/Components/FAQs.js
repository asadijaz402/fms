import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FAQs = () => {
  const [expanded, setExpanded] = React.useState(false);
  const data = [
    {
      title: 'Is there a trial?',
      dec: 'You do not need a trial to get started. Use FleetVantage for free, with no time limit. No credit card is required to start a subscription. You will have access to all features and can ask us any questions along the way. Free onboarding tools and training videos and wikis are available to help you get up and running quickly. ',
    },
    {
      title: 'Can we manage from anywhere?',
      dec: 'Handle any fleet-related task or surface critical data anytime, anywhere with intuitive web and smartphone friendly designed interface for busy, distributed fleets.',
    },
    {
      title: 'Custom Dashboards',
      dec: 'Create custom Dashboards to visualize data. Generate reports on demand. Export or Import data.',
    },
    {
      title: 'Is Fleetvantage able  to support a fleet size bigger than 500?',
      dec: 'Yes, Fleetvantage is configured to manage an unlimited fleetsize. Please get in touch with us to discuss further.',
    },
    {
      title:
        'I already use a fleet management software, why should I consider using Fleetvantage?',
      dec: 'With a real practical understanding of the fleet management process, Fleetvantage is a modern, cloud-based platform developed from the outset to improve efficiencies.',
    },
    {
      title:
        'Is Fleetvantage team able to support me to transisiton from my current fleet management software to Fleetvantage?',
      dec: 'We already have experience helping companies transition to Fleetvantage. Our approach involves running both legacy and Fleetvantage in parallel until the client is comfortable with Fleetvantage, at which point we make the switch.',
    },
    {
      title: 'Can Fleetvantage be used outside the UK?',
      dec: 'Fleetvantage is fully configured to be used in any country. Timezones, dates etc are updated accordingly.',
    },
    {
      title: 'Is Fleetvantage linked with a specific tracker?',
      dec: 'No, Fleetvantage is able to fully interface with more than 1000 different types of trackers. Feel free to send in your specfic tracker details to ensure it can be covered.',
    },
    {
      title:
        'Does Fleetvantage have an alternative option to the use of trackers?',
      dec: 'Yes, Fleetvantage is also fully configured to make use of the users mobile phone to track the vehicle and its key performance metrics.',
    },
    {
      title: 'Is Fleetvanatge able to connect with other software packages?',
      dec: "Yes, Fleetvanatge is designed with the use of other software packages in mind. To maximise its connectiveity to exisiting software, it is configured to use external API's for example from accounting software to minimise need to re-enter data etc.",
    },
    {
      title: 'Is Fleetvantage limited to a fleet of cars?',
      dec: 'No, fleetvantage treats each vhiecle as an asset so a whole range of vehicles can be managed including trucks, diggers etc.',
    },
    {
      title:
        'Is it possible to change a package plan after it has been activitated? ',
      dec: 'Fleetvantage is a true SAAS platform, you can change the payment plan as your fleet expands or is reduced.',
    },
    {
      title: 'Do you have flexible dashboard options? ',
      dec: 'Fleetvantge is based around the use of a single dashboard as a single source of truth for your fleet. Although, Fleetvantage does have example dashboard templates it also offers a fully configurable dashboard environment to ensure you are getting the information you need to make decsions.',
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ borderRadius: '0px', backgroundColor: '#F4F5F7' }} pt={4} pb={4}>
      <Container>
        <Box align="center">
          <Typography
            variant="h3"
            style={{ color: '#01ab56', fontWeight: '700' }}
          >
            Frequently Asked Questions
          </Typography>
          <Box pt={2}>
            <Typography variant="body1" color="GrayText">
              Got a question? Get your answer.
            </Typography>
          </Box>{' '}
        </Box>
        <Paper sx={{ mt: 2 }} variant="outlined" elevation={0}>
          {data.map((item, index) => (
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" color="primary">
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="CaptionText">
                  {item.dec}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};
