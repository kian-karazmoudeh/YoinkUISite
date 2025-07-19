export function removeCommentsFromDOM(root : Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null);

  const comments = [];
  while (walker.nextNode()) {
    comments.push(walker.currentNode);
  }

  comments.forEach(comment => comment.parentNode?.removeChild(comment));
}