export const fetchTree = async (setIsLoading, setTree) => {
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
