import React, { useState } from 'react';
import { ReactComponent as AddIcon } from '../../assets/plus-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/trash-icon.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down-icon.svg';
import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-up-icon.svg';
import TreeList from '../TreeList/TreeList';
import classes from './TreeNode.module.css';

const TreeNode = ({ node, changeNodeText, addNode, deleteNode }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleAddNodeClick = () => {
    addNode(node.id);
    setExpanded(true);
  };

  const renderArrow = () => {
    return (
      <div className={classes.icon} onClick={handleExpandClick}>
        {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
    );
  };

  return (
    <li>
      <div className={classes.container}>
        {node?.children?.length > 0 ? (
          renderArrow()
        ) : (
          <div className={classes.placeholder} />
        )}
        <div className={classes.node}>
          <input
            type="text"
            value={node.text}
            onChange={(e) => changeNodeText(e.target.value, node.id)}
            placeholder="Edit item text"
          />
          <div className={classes.icon} onClick={handleAddNodeClick}>
            <AddIcon />
          </div>
          <div className={classes.icon} onClick={() => deleteNode(node.id)}>
            <DeleteIcon />
          </div>
        </div>
      </div>

      {node?.children?.length > 0 && expanded && (
        <TreeList
          treeData={node.children}
          changeNodeText={changeNodeText}
          addNode={addNode}
          deleteNode={deleteNode}
        />
      )}
    </li>
  );
};

export default TreeNode;
