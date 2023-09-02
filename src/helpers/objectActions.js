import objectPath from 'object-path';
import { v4 as uuidv4 } from 'uuid';

export const addValueByPath = (path, tree, setTree) => {
  const updatedTree = Object.assign([], tree);

  const target = objectPath.get(updatedTree, path);

  if (target) {
    if (!target.children) {
      target.children = [];
    }
    target.children.push({
      id: uuidv4(),
      text: 'NewNode',
      children: [],
    });
  }

  setTree(updatedTree);
};

export const deleteNodeByPath = (path, tree, setTree, id) => {
  const updatedTree = Object.assign([], tree);

  // if there is no dot - then it's root node
  const lastDotIndex = path.lastIndexOf('.');

  if (lastDotIndex !== -1) {
    // path to the 'children' property of the parent node
    const childrenArrPath = path.substring(0, lastDotIndex);
    const elemIndx = path.substring(lastDotIndex + 1);
    const childrenArr = objectPath.get(updatedTree, childrenArrPath);

    if (childrenArr) {
      childrenArr.splice(elemIndx, 1);
    }
  } else {
    //delete root node
    const indx = updatedTree.findIndex((item) => item.id === id);
    if (indx !== -1) {
      updatedTree.splice(indx, 1);
    }
  }

  setTree(updatedTree);
};

export const updateValueByPath = (path, newValue, tree, setTree) => {
  const updatedTree = Object.assign([], tree);

  // value store in the 'text' field
  path = `${path}.text`;
  objectPath.set(updatedTree, path, newValue);
  setTree(updatedTree);
};

export const findPath = (tree, key, value) => {
  let path = null;

  function search(obj, currentPath) {
    if (objectPath.get(obj, key) === value) {
      path = currentPath;
      return;
    }

    for (const prop in obj) {
      if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object') {
        search(obj[prop], currentPath ? `${currentPath}.${prop}` : prop);
      }
    }
  }

  search(tree, '');

  return path || null;
};
