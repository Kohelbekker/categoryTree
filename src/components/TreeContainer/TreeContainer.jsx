import React, { useEffect, useState } from 'react';
import { ReactComponent as LoadingSpin } from '../../assets/tail-spin.svg';
import ErrorCard from '../ErrorCard/ErrorCard';
import Card from '../Card/Card';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import TreeList from '../TreeList/TreeList';
import classes from './TreeContainer.module.css';
import {
  findPath,
  updateValueByPath,
  addValueByPath,
  deleteNodeByPath,
} from '../../helpers/objectActions';
import { defaultTreeData } from './treeData';

const TreeContainer = () => {
  const [tree, setTree] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reqError, setReqError] = useState(null);
  const [reloadToogle, setReloadToogle] = useState(false);

  useEffect(() => {
    const fetchTree = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://category-tree-8859b-default-rtdb.europe-west1.firebasedatabase.app/tree.json'
      );

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }

      const treeObj = await response.json();

      setTree(treeObj);
      setIsLoading(false);
    };

    fetchTree().catch((error) => {
      setIsLoading(false);
      setTree(defaultTreeData);
      setReqError(
        `Cannot fetch data, request failed. Tree will be built from default data.\nError message: ${error.message}`
      );
    });
  }, [reloadToogle]);

  const handleChangeNodeText = (value, id) => {
    const path = findPath(tree, 'id', id);

    if (path) updateValueByPath(path, value, tree, setTree);
  };

  const handleAddNewNode = (id) => {
    const path = findPath(tree, 'id', id);
    if (path) addValueByPath(path, tree, setTree);
  };

  const handleDeleteNode = (id) => {
    const path = findPath(tree, 'id', id);

    if (path) deleteNodeByPath(path, tree, setTree, id);
  };

  const handleTreeSave = async () => {
    await fetch(
      'https://category-tree-8859b-default-rtdb.europe-west1.firebasedatabase.app/tree.json',
      {
        method: 'PUT',
        body: JSON.stringify(tree),
      }
    );
  };

  return (
    <>
      {!isLoading && reqError && <ErrorCard errMessage={reqError} />}
      <section className={classes.tree}>
        <Card>
          {isLoading && (
            <div className={classes.loader}>
              <LoadingSpin />
            </div>
          )}
          {!isLoading && (
            <TreeList
              treeData={tree}
              changeNodeText={handleChangeNodeText}
              addNode={handleAddNewNode}
              deleteNode={handleDeleteNode}
            />
          )}
        </Card>
        <ButtonContainer
          setReload={setReloadToogle}
          onTreeSave={handleTreeSave}
        />
      </section>
    </>
  );
};

export default TreeContainer;
