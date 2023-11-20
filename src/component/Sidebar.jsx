import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, CssBaseline, Divider} from '@mui/material';

const Sidebar = ({ title, items }) => {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={true}
        PaperProps={{ style: { width: '240px', position: 'fixed', height: '100%' } }}
      >
        <Toolbar />
        <Divider />
        <List>
          {items.map((item, index) => (
            <ListItem ListItemButton key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div style={{ marginLeft: '240px', width: '100%', position: 'fixed', top: 0 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">{title}</Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Sidebar;
