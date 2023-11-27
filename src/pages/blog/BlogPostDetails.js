import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import Header from '../../Components/landingPage/Header';
import { Footer } from '../../Components/landingPage/Footer';
import SecondaryContact from '../../Components/landingPage/newhome/SecondaryContact';
import gtm from '../../lib/gtm';
import MD from './HELP_REDUCE_CARBON_FOOTPRINT.md';

const MarkdownWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  '& h2': {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: theme.typography.h2.lineHeight,
    marginBottom: theme.spacing(3),
  },
  '& h3': {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: theme.typography.h3.lineHeight,
    marginBottom: theme.spacing(3),
  },
  '& p': {
    fontSize: theme.typography.body1.fontSize,
    textAlign: 'justify',
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(2),
  },
  '& li': {
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(1),
  },
  '& img': {
    float: 'right',
    margin: theme.spacing(1, 0, 0, 1),
    width: '100%',
  },
}));

const BlogPostDetails = () => {
  const [data, setData] = useState('');

  const targetRef = useRef(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    fetch(MD)
      .then((response) => response.text())
      .then((text) => {
        setData(text);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog: Effective fleet management.</title>
        <meta
          name="description"
          property="description"
          content="Managing the fleet vehicles effectively using the best fleet tracking softwares."
        />
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          minHeight: '100%',
        }}
      >
        <Header targetRef={targetRef} />
        <Divider />
        <Box sx={{ py: 3 }}>
          <Container maxWidth="md">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Chip
                sx={{ mr: 1 }}
                label="Fleet Management"
                variant="outlined"
              />
              <Chip
                sx={{ mr: 1 }}
                label="Carbon Footprint"
                variant="outlined"
              />
              <Chip sx={{ mr: 1 }} label="Tracking" variant="outlined" />
            </Box>
            <Typography
              align="center"
              color="textPrimary"
              sx={{
                fontWeight: 'fontWeightBold',
                mt: 3,
              }}
              variant="h2"
            >
              How Effective Fleet Management Helps to reduce CARBON FOOTPRINTS
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              sx={{ mt: 3 }}
              variant="subtitle1"
            >
              Lately, environmental change and global warming have become
              critical issues. Therefore, many companies are attempting to
              reduce their carbon footprint and adopt sustainable practices.
              Fleet management is one area where companies can have a
              significant impact on the environment. Efficient fleet management
              can help to reduce carbon footprints and contribute to a cleaner
              environment.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Laiba Sarwar
                </Typography>
                <Typography
                  color="textSecondary"
                  align="center"
                  variant="caption"
                >
                  01 May · 10 min read
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                backgroundImage: `url(/images/blog/p0.webp)`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '20px',
                height: 600,
              }}
            />
          </Container>
        </Box>
        <Box sx={{ py: 3 }}>
          <Container maxWidth="md">
            <MarkdownWrapper>
              <ReactMarkdown>{data}</ReactMarkdown>
            </MarkdownWrapper>
          </Container>
        </Box>
      </Box>
      <SecondaryContact />
      <Footer targetRef={targetRef} />
    </>
  );
};

export default BlogPostDetails;
