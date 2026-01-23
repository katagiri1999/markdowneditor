import MenuIcon from '@mui/icons-material/Menu';
import { Container, Drawer, IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import userStore from '../../store/user_store';

import Explorer from './explorer';
import TreeUpdate from './tree_update';

function Sidebar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const url_node_id = searchParams.get('id') || "";

  const { node_tree } = userStore();
  const [drawewrOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <IconButton
        color="inherit"
        size='large'
        edge="start"
        onClick={() => {
          setDrawerOpen((prevState) => !prevState);
        }}
      >
        <Tooltip title="Menu">
          <MenuIcon
            sx={{ fontSize: 30 }}
          />
        </Tooltip>
      </IconButton>

      <Drawer
        open={drawewrOpen}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            setDrawerOpen(false);
          }
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
        }}
      >

        <Container sx={{ textAlign: 'left' }}>

          <Typography variant="h5" sx={{ mt: 2 }}>
            Explorer
          </Typography>

          <TreeUpdate node_id={url_node_id} node_tree={node_tree} />
          <Explorer node_id={url_node_id} node_tree={node_tree} />

        </Container>
      </Drawer >
    </>
  );
}

export default Sidebar;