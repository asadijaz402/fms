import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../Components/Logo";
import { Helmet } from "react-helmet-async";
import AuthBanner from "../Components/authentication/AuthBanner";
const PrivacyPage = () => {
  const data = [
    {
      title: "Background",
      element: [
        "[fleetmanagementsystem.co.uk, www.fleetmanagementsystem.co.uk] (‘Our Site’) is operated by Fleet Management System Ltd, trading as Fleet Management System.",
        " Fleet Management System Ltd is a registered company, company number 13746925, and its registered address is Business Hub 52, Lozells Road, Birmingham, United Kingdom, B19 2TJ (known as ‘We, Us, Our’)",
        "This Privacy Policy sets out how We use any personal information that you give Us when you use Our Site.",
        "We are committed to protecting your privacy.  If We ask you to provide certain information which can identify you when using Our Site We will use it in accordance with this Privacy Policy.  This includes personal data provided when you sign up to Our Site.",
        "If you have any questions regarding this Privacy Policy or would like to contact Us, please email [info@fleetmanagementsystem.co.uk].",
        "Please read this Privacy Policy in conjunction with Our Acceptable Use Policy and Website Terms and Conditions which can be found on Our Site.  You must comply with the terms of these policies at all times when using Our Site.",
        "We may change this Privacy Policy from time to time by updating this page.  Please check this page from time to time to ensure that you are happy with any changes.",
        "Our Site is not intended for minors, and We will not collect any data relating to minors knowingly.",
      ],
    },
    {
      title: "What we collect",
      element: [
        "We may collect the following information:",
        "name;",
        "email address and residential address;",
        "information on your political preferences and affiliations;",
        "format information you give to us when you report any problem with Our Site; and",
        " if you contact Us, We may keep a record of that correspondence.",
        "We my collect information about your political opinions, political affiliations, and voting history and intentions.",
        "Other than political and voting information under Clause 2.2, we will not collect Special Data (including data relating to race or ethnicity, religious of philosophical beliefs, sex life, sexual orientation, trade union membership, information about your health, and genetic or biometric data).",
        "If you do not provide the data We require, you may not be able to use Our Site.",
      ],
    },
    {
      title: "What we do with your information",
      element: [
        "We use this information to:",
        " ensure that content from Our Site is presented in the most effective manner for you and for your computer or device;",
        " carry out Our obligations, including without limitation account management, monitoring and maintaining the quality and security of Our network and services;",
        "allow you to participate in interactive features of Our Site such as forum discussions, when you choose to do so; and",
        "notify you about changes to Our Site.",
      ],
    },
    {
      title: "IP addresses and Cookies",
      element: [
        " We may collect information about your computer, including where available your IP address, operating system and browser type, for system administration and to report aggregate information to Our advertisers.  This is statistical data about Our users’ browsing actions and patterns, and does not identify any individual.",
        " Cookies are small text files that are placed on your computer by websites that you visit.  They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.",
        " For the same reason, We may obtain information about your general internet usage by using a cookie file which is stored on the hard drive of your computer or other device used to access Our Site.  Cookies contain information that is transferred to the drive of your computer or device.  They help Us to improve Our Site and to deliver a better and more personalised service.  They enable us:",
        "    to estimate Our audience size and usage pattern;",
        "to store information about your preferences, and so allow Us to customise Our Site according to your preferences;",
        "to speed up your searches; and",
        "to recognise you when you return to Our Site.",
        "These cookies are used to collect information about how visitors use Our Site.  We use the information to compile reports and to help Us improve the site.  The cookies collect information in an anonymous form, including the number of visitors to the site, where visitors have come to Our Site from and the pages they visited.",
      ],
    },
    {
      title: "How do I change my cookie settings?",
      element: [
        "Most web browsers allow some control of most cookies through the browser settings.  To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.aboutcookies.org or www.allaboutcookies.org.",
        "To opt out of being tracked by Google Analytics across all websites visit http://tools.google.com/dlpage/gaoptout.",
        "However, if you select this setting you may be unable to access certain parts of Our Site.  Unless you have adjusted your browser setting so that it will refuse cookies, Our system will issue cookies when you log on to Our Site.",
      ],
    },
    {
      title: "Security",
      element: [
        " We are committed to ensuring that your information is secure.  To prevent unauthorised access or disclosure, We have put in place physical and electronic procedures to safeguard and secure the information We collect online.  Be aware that the transmission of information via the internet is not completely secure.  Although We will do Our best to protect your personal data, We cannot guarantee the security of your data transmitted to Our Site; any transmission is at your own risk.  Once We have received your information, We will use strict procedures and security features to try to prevent unauthorised access.",
      ],
    },
    {
      title: "Controlling your personal information",
      element: [
        "We will not sell, distribute or lease your personal information to third parties unless We have your permission or are required by law to do so.",
        "Under the Data Protection Act 2018, you may request details of personal information which We hold about you.  If you would like a copy of this information, please contact Us.  We may charge a fee for this and may require that you give evidence of your identity.",
        "Under the UK GDPR your rights include the following (subject to certain restrictions as permitted by law):",
        " the right to be informed (including the right to request a copy) of any information We hold concerning you in a clear electronic format (except where disclosing such information would disclose information about another person or certain exceptions apply);",
        " the right of access;",
        "the right to rectification;",
        " the right to erasure;",
        " the right to restrict processing;",
        " the right to data portability;",
        " the right to object; and",
        "the right not to be subject to automated decision-making including profiling.",
        "If you believe that any information We are holding on you is incorrect or incomplete, please contact Us as soon as possible and We will correct the information We are holding.",
        "If you would like to make a complaint at any time, please contact Us, or contact the Information Commissioner’s Offive (‘ICO’), the UK regulator for data protection issues (www.ico.org.uk).  We would appreciate the chance to deal with your complaint before contacting the ICO.",
      ],
    },
    {
      title: "Third party links and resources in Our Site",
      element: [
        "Where Our Site contains links to other sites and resources provided by third parties, these links are provided for your information only",
        "We have no control over the contents of those sites or resources.",
      ],
    },
    {
      title: "Governing Law and Jurisdiction",
      element: [
        "These Terms are governed by English law and the parties submit to the non-exclusive jurisdiction of courts of England and Wales.",
      ],
    },
  ];
  return (
    <>
      <Helmet>
        <title>Login | Fleet Management System</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AuthBanner />
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 5,
              mt: 8,
            }}
          >
            <RouterLink to="/">
              <Logo
                sx={{
                  height: 40,
                  width: 40,
                }}
              />
            </RouterLink>
          </Box>
          <Typography
            style={{ fontSize: "45px", fontWeight: 700 }}
            align="center"
          >
            Privacy Policy
          </Typography>
          <ol>
            {data.map((item) => (
              <>
                <li style={{ fontWeight: 600, padding: 10 }}>{item.title}</li>
                <ul>
                  {item.element.map((item) => (
                    <li style={{ padding: 5 }}>{item}</li>
                  ))}
                </ul>
              </>
            ))}
          </ol>
        </Container>
      </Box>
    </>
  );
};

export default PrivacyPage;
