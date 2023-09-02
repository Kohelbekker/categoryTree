import React from 'react';
import TreeNode from '../TreeNode/TreeNode';

const TreeList = ({ treeData, changeNodeText, addNode, deleteNode }) => {
  const buildTree = (data) => {
    return data.map((item) => {
      return (
        <TreeNode
          key={item.id}
          node={item}
          changeNodeText={changeNodeText}
          addNode={addNode}
          deleteNode={deleteNode}
        />
      );
    });
  };

  const list = buildTree(treeData);

  return <ul>{list}</ul>;
};

export default TreeList;
