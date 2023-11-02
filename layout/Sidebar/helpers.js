//
// Credits: https://github.com/ShankyTiwari/ng-material-multilevel-menu
//
let foundLinkObject;
export const addRandomId = (nodes) => {
  nodes.forEach((node) => {
    node.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    if (node.children !== undefined) {
      addRandomId(node.children);
    }
  });
  return nodes;
};
export const recursiveCheckId = (node, nodeId) => {
  if (node.id === nodeId) {
    return true;
  } else {
    if (node.children !== undefined) {
      return node.children.some((nestedNode) => {
        return recursiveCheckId(nestedNode, nodeId);
      });
    }
  }
};
export const recursiveCheckLink = (nodes, link) => {
  for (const node of nodes) {
    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        if (encodeURI(node.path) === link) {
          foundLinkObject = node;
        } else {
          if (node.children !== undefined) {
            recursiveCheckLink(node.children, link);
          }
        }
      }
    }
  }
};
export const getMatchedObjectByUrl = (node, link) => {
  recursiveCheckLink(node, link);
  return foundLinkObject;
};
