import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/authcontext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleClose();
  };

  const navLinks = (
    <>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit', margin: '0 15px' }}>
        Home
      </Link>
      <Link to="/news" style={{ textDecoration: 'none', color: 'inherit', margin: '0 15px' }}>
        Latest News
      </Link>
    </>
  );

  const mobileDrawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/news">
            <ListItemText primary="Latest News" />
          </ListItem>
          {!user && (
            <>
              <ListItem button component={Link} to="/signin">
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem button component={Link} to="/signup">
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
        </List>
        {user && (
          <>
            <Divider />
            <List>
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            Blog App
          </Typography>

          {!isMobile && <Box sx={{ display: 'flex', alignItems: 'center' }}>{navLinks}</Box>}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={handleMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/signin">
                  Sign In
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {mobileDrawer}
    </>
  );
};

export default Header;










// import React, { useContext } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../Context/authcontext';
// import { signOut } from 'firebase/auth';
// import { auth } from '../services/firebase';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// const Header = () => {
//   const { user } = useContext(AuthContext);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//           Blog App
//         </Typography>
//         <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
//           {/* <Link to="/articles" style={{ textDecoration: 'none', color: 'inherit', margin: '0 15px' }}>
//             Articles
//           </Link> */}
//           <Link to="/news" style={{ textDecoration: 'none', color: 'inherit', margin: '0 15px' }}>
//             Latest News
//           </Link>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <IconButton color="inherit">
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <SearchIcon />
//           </IconButton>
//           {user ? (
//             <div>
//               <IconButton
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </div>
//           ) : (
//             <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '15px' }}>
//               Sign In
//             </Link>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };
// export default Header;
