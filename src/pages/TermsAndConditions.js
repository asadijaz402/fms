import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../Components/Logo";
import { Helmet } from "react-helmet-async";
import AuthBanner from "../Components/authentication/AuthBanner";
const TermsAndConditions = () => {
  const data = [
    {
      title: "Background",
      element: [
        "[fleetmanagementsystem.co.uk, www.fleetmanagementsystem.co.uk] (‘Our Site’) is operated by Fleet Management System Ltd, trading as Fleet Management System.",
        "Fleet Management System Ltd is a registered company, company number 13746925, and its registered address is Business Hub 52, Lozells Road, Birmingham, United Kingdom, B19 2TJ (known as ‘We, Us, Our’).",
        "Please read these Terms and Conditions carefully before using Our Site.",
        "If you have any questions regarding these Terms and Conditions or would like to contact Us, please email [info@fleetmanagementsystem.co.uk].",
        "Please read these Terms and Conditions in conjunction with Our Privacy Policy and Acceptable Use Policy which can be found on Our Site.  You must comply with the terms of these policies at all times when using Our Site.",
        "We may change these Terms and Conditions from time to time by updating this page.  Please check this page from time to time to ensure that you are happy with any changes.",
      ],
    },
    {
      title: "Terms and Conditions of website use",
      element: [
        "These Terms and Conditions (together with the documents referred to in it) tells you the terms of use on which you may make use of Our Site whether as a guest or a registered user.  Use of Our Site includes accessing, browsing, or registering to use Our Site.",
        "Please read these Terms and Conditions carefully before you start to use Our Site, as these will apply to your use of Our Site.  We recommend that you store a copy of this for future reference. ",
        "By using Our Site, you confirm that you accept these Terms and Conditions and that you agree to comply with them.  If you do not agree to these Terms and Conditions, you must not use Our Site.",
      ],
    },
    {
      title: "Changes to Our Site",
      element: [
        "We may update Our Site from time to time, and may change the content at any time.  However, please note that any of the content on Our Site may be out of date at any given time, and We are under no obligation to update it.",
        "We do not guarantee that Our Site, or any content on it, will be free from errors or omissions.",
      ],
    },
    {
      title: "Accessing Our Site",
      element: [
        "Our Site is made available free of charge.",
        "We do not guarantee that Our Site, or any content on it, will always be available or be uninterrupted.  Access to Our Site is permitted on a temporary basis.  We may suspend, withdraw, discontinue or change all or any part of Our Site without notice.  We will not be liable to you if for any reason Our Site is unavailable at any time or for any period.",
        "You are responsible for making all arrangements necessary for you to have access to Our Site.",
        "You are also responsible for ensuring that all persons who access Our Site through your internet connection are aware of these Terms and Conditions and other applicable terms, and that they comply with them.",
      ],
    },
    {
      title: "Use of Information on Our Site",
      element: [
        "Our Site is available for personal, non-commercial use by you only.  Any kind of automatic capturing and/or redistribution of content from Our Site (sometimes described as screen scraping) is not permitted.  You are on notice that this can cause damage to Us, other users and Our authorised suppliers.  In addition to legal action, We may suspend or delete user accounts where We suspect they might be used for this purpose",
        "",
      ],
    },
    {
      title: "Your account and password",
      element: [
        "If you choose, or you are provided with, a user identification code, password or any other piece of information as part of Our security procedures, you must treat such information as confidential.  You must not disclose it to any third party.",
        "We have the right to disable any user identification code or password, whether chosen by you or allocated by Us, at any time, if in Our reasonable opinion you have failed to comply with any of the provisions of these Terms and Conditions.",
        "If you know or suspect that anyone other than you knows your user identification code or password, you must promptly notify Us at [info@fleetmanagementsystem.co.uk].",
      ],
    },
    {
      title: "Intellectual property rights",
      element: [
        "We are the owner or the licensee of all intellectual property rights in Our Site, and in the material published on it.  Those works are protected by copyright laws and treaties around the world.  All such rights are reserved.",
        "You may print off one copy, and may download extracts, of any page(s) from Our Site for your personal use and you may draw the attention of others within your organisation to content posted on Our Site.",
        "You must not modify the paper or digital copies of any materials you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics separately from any accompanying text.",
        "Our status (and that of any identified contributors) as the authors of content on Our Site must always be acknowledged.",
        "You must not use any part of the content on Our Site for commercial purposes without obtaining a licence to do so from Us or Our licensors.",
        "If you print off, copy or download any part of Our Site in breach of these Terms and Conditions, your right to use Our Site will cease immediately and you must, at Our option, return or destroy any copies of the materials you have made.",
      ],
    },
    {
      title: "No reliance on information",
      element: [
        "The content on Our Site is provided for general information only.  It is not intended to amount to advice on which you should rely.  You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on Our Site. ",
        "Although We make reasonable efforts to update the information on Our Site, We make no representations, warranties or guarantees, whether express or implied, that the content on Our Site is accurate, complete or up-to-date.",
      ],
    },
    {
      title: "Limitation of our liability",
      element: [
        "Nothing in these Terms and Conditions excludes or limits Our liability for death or personal injury arising from Our negligence, or Our fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by English law.",
        "To the extent permitted by law, We exclude all conditions, warranties, representations or other terms which may apply to Our Site or any content on it, whether express or implied. ",
        "We will not be liable to any user for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:",
        "use of, or inability to use, Our Site; or",
        "use of or reliance on any content displayed on Our Site. ",
        "We will not be liable for any loss or damage caused by a virus, distributed denial-of-service attack, or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of Our Site or to your downloading of any content on it, or on any website linked to it.",
        "We assume no responsibility for the content of websites linked on Our Site.  Such links should not be interpreted as endorsement by us of those linked websites.  We will not be liable for any loss or damage that may arise from your use of them.",
        "Electoral laws vary across the world.  We make no warranty or representation that the use of Our Site will not be in breach of local laws relating to elections, campaigning or voting.",
      ],
    },
    {
      title: "Uploading content to Our Site",
      element: [
        "Whenever you make use of a feature that allows you to upload content to Our Site, or to make contact with other users of Our Site, you must comply with the content standards set out in our Acceptable Use Policy [https://fleetmanagementsystem.co.uk/acceptable-use-policy/, https://www.fleetmanagementsystem.co.uk/acceptable-use-policy/].",
        " You warrant that any such contribution does comply with those standards, and you will be liable to Us and indemnify Us for any breach of that warranty.",
        "Any content you upload to Our Site will be considered non-confidential and non-proprietary.  You retain all of your ownership rights in your content, but you are required to grant Us a limited licence to use, store and copy that content and to distribute and make it available to third parties.  The rights you licence to Us are described in the next paragraph (Rights you licence).",
        "We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to Our Site is a violation of their intellectual property rights, or of their right to privacy.",
        "We will not be responsible, or liable to any third party, for the content or accuracy of any content posted by you or any other user of Our Site.",
        "We have the right to remove any posting you make on Our Site if, in Our opinion, your post does not comply with the content standards set out in Our Acceptable Use Policy [https://fleetmanagementsystem.co.uk/acceptable-use-policy/, https://fleetmanagementsystem.co.uk/acceptable-use-policy/].",
        "The views expressed by other users on Our Site do not represent Our views or values.",
      ],
    },
    {
      title: "Rights you licence",
      element: [
        "When you upload or post content to Our Site, you grant to Us the right to use this content as reasonably required by Us on Our Site.",
      ],
    },
    {
      title: "Viruses",
      element: [
        "We do not guarantee that Our Site will be secure or free from bugs or viruses.",
        "You are responsible for configuring your information technology, computer programmes and platform in order to access Our Site.  You should use your own virus protection software.",
        "You must not misuse Our Site by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to Our Site, the server on which Our Site is stored or any server, computer or database connected to Our Site.  You must not attack Our Site via a denial-of-service attack or a distributed denial-of service attack.  By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990.  We will report any such breach to the relevant law enforcement authorities and We will co-operate with those authorities by disclosing your identity to them.  In the event of such a breach, your right to use Our Site will cease immediately.",
      ],
    },
    {
      title: "Linking to Our Site",
      element: [
        "You may link to Our home page, provided you do so in a way that is fair and legal and does not damage Our reputation or take advantage of it.",
        " You must not establish a link in such a way as to suggest any form of association, approval or endorsement on Our part where none exists.",
        "You must not establish a link to Our Site in any website that is not owned by you.",
        "Our Site must not be framed on any other site, nor may you create a link to any part of Our Site other than the home page.",
        "We reserve the right to withdraw linking permission without notice.",
        "The website in which you are linking must comply in all respects with the content standards set out in Our Acceptable Use Policy [https://fleetmanagementsystem.co.uk/acceptable-use-policy/, https:/www.fleetmanagementsystem.co.uk/acceptable-use-policy/].",
        "If you wish to make any use of content on Our Site other than that set out above, please contact [info@fleetmanagementsystem.co.uk].",
      ],
    },
    {
      title: "Third party links and resources in Our Site",
      element: [
        "Where Our Site contains links to other sites and resources provided by third parties, these links are provided for your information only.",
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
            Terms and Conditions
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

export default TermsAndConditions;
