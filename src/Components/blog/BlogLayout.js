import { Outlet } from 'react-router-dom';
import { styled } from '@mui/styles';
import BlogNavbar from './BlogNavbar';
import Footer from '../Footer';

const BlogLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  paddingTop: 64,
}));

const BlogLayout = () => (
  <BlogLayoutRoot>
    <BlogNavbar />
    <Outlet />
    <Footer />
  </BlogLayoutRoot>
);

export default BlogLayout;
