import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box } from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import TreeHandler from '../../lib/tree_handler';

import type { NodeTree } from '../../lib/types';

function Explorer(props: { node_id: string, node_tree: NodeTree }) {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState(["/Nodes"]);

  const tree_handler = new TreeHandler(props.node_tree);
  const parents = tree_handler.getParentNodeIds(props.node_id);
  const displayedExpanded = [
    ...new Set([...expandedItems, ...parents, props.node_tree.id]),
  ];

  return (
    <>
      <Box >
        <RichTreeView
          sx={{ backgroundColor: "rgba(245, 245, 245)" }}
          items={[props.node_tree]}
          onItemClick={(_, id) => {
            navigate(`/main?id=${id}`);
          }}
          selectedItems={props.node_id}
          expandedItems={displayedExpanded}
          onExpandedItemsChange={(_, ids) => setExpandedItems(ids)}
          slots={{
            expandIcon: FolderIcon,
            collapseIcon: FolderOpenIcon,
            endIcon: ArticleOutlinedIcon,
          }}
        />
      </Box>
    </>
  );
};

export default Explorer;