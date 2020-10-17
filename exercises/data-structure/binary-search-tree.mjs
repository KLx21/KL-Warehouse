export const TREE_DIRECTION = {
  BREADTH: 0,
  DEPTH: 1
};

export const DEPTH_FIRST_ORDER = {
  IN_ORDER: 0,
  POST_ORDER: 1,
  PRE_ORDER: 2
}

export class TreeNode {
  constructor(value, left, right) {
    this.value = value;
    this.left = left || null;
    this.right = right || null;
  }
}

export class BinarySearchTree {
  constructor(root) {
    this.root = root || null;
  }

  /**
   * Create a binary search tree from the given array.
   *
   * @param {Array<number|string>} array An breadth first array of tree node values. Empty node is represented by '#'.
   * @return {BinarySearchTree} A binary search tree.
   */
  deserializeBreadthFirst(array) {
    if (!this.root && array.length > 0 && array[0] !== '#') {
      if (array.length === 1) {

        this.root = new TreeNode(array.pop());
      } else {
        const nodes = array.map(element => element === '#' ? '#' : new TreeNode(parseInt(element, 10)));
        const tree = [[]];
        let level = 0;

        while (nodes.length > 0) {
          const currentNode = nodes.shift();
          const levelIndex = tree[level].length;

          if (level > 0 && currentNode !== '#') {
            const parentLevel = level - 1;
            const parentIndex = Math.floor(levelIndex / 2);
            const parentNode = tree[parentLevel][parentIndex];

            if (parentNode === '#') {
              throw 'Parent node is empty. The array may be wrong.';
            }

            const childKey = levelIndex % 2 === 0 ? 'left' : 'right';
            parentNode[childKey] = currentNode;
          }

          tree[level].push(currentNode);

          if (levelIndex === Math.pow(2, level) - 1) {
            tree[++level] = [];
          }
        }

        this.root = tree[0][0];
      }
    }

    return this;
  }

  insertInOrder(value, allowDuplicate) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.addSideInOrder(this.root, newNode, allowDuplicate);
    }

    return this;
  }

  isSymmetric() {
    if (!this.root) {
      return true;
    } else {
      return this.checkNodesSymmetry(this.root.left, this.root.right);
    }
  }

  searchBreadthFirst(target) {
    const queue = [this.root];
    let current;

    while (queue.length) {
      current = queue.shift();
      if (target === current.value) {
        return current;
      } else {
        if (current.left) {
          queue.push(current.left);
        }
        if (current.right) {
          queue.push(current.right);
        }
      }
    }

    return null;
  }

  searchDepthFirst(target, depthFirstOrder) {
    return this.traverseFor(target, this.root, depthFirstOrder || DEPTH_FIRST_ORDER.IN_ORDER) || null;
  }

  serializeWithHashes() {
    const visited = [];
    const queue = [this.root];
    let level = 0;

    do {
      const current = queue.shift();
      visited.push(current === '#' ? '#' : current.value);
      if (current.left) {
        queue.push(current.left);
      } else {
        queue.push('#');
      }
      if (current.right) {
        queue.push(current.right);
      } else {
        queue.push('#');
      }
      if (visited.length === this.getGeometricSum(level)) {
        if (this.allHashes(queue)) {
          return visited
            .join(';')
            .replace(/(;#)+$/, '')
            .split(';');
        }
        level++;
      }
    } while (queue.length > 0);
  }

  serializeToArray(treeDirection, depthFirstOrder) {
    switch (treeDirection) {
      case TREE_DIRECTION.BREADTH:
        return this.serializeBreadth();
      case TREE_DIRECTION.DEPTH:
        return this.serializeDepth(depthFirstOrder || DEPTH_FIRST_ORDER.IN_ORDER);
      default:
        return [];
    }
  }

  /**
   * @private
   * @param currentNode
   * @param newNode
   * @param allowDuplicate
   * @returns {BinarySearchTree}
   */
  addSideInOrder(currentNode, newNode, allowDuplicate) {
    if (allowDuplicate || currentNode.value !== newNode.value) {
      const side = newNode.value <= currentNode.value ? 'left' : 'right';
      if (!currentNode[side]) {
        currentNode[side] = newNode;
        return this;
      } else {
        return this.addSideInOrder(currentNode[side], newNode);
      }
    } else {
      return this;
    }
  }

  allHashes(visited) {
    if (visited.length === 0) {
      return false;
    } else {
      return visited
        .join('')
        .replace(/#/g, '')
        .length === 0;
    }
  }

  checkNodesSymmetry(node1, node2) {
    if (node1 === null && node2 === null) {
      return true;
    }
    if (node1 === null || node2 === null) {
      return false;
    }
    if (node1.val !== node2.val) {
      return false;
    }

    return check(node1.left, node2.right) && check(node1.right, node2.left);
  }

  getGeometricSum(level) {
    return Math.pow(2, level + 1) - 1;
  }

  isArraySymmetric(array) {
    const firstHalf = array.slice(0, array.length / 2);
    const secondHalf = array.slice(array.length / 2);
    return firstHalf.join('') === secondHalf.reverse().join('');
  }

  /**
   * @private
   * @returns {Array}
   */
  serializeBreadth() {
    const queue = [this.root];
    const visited = [];
    let current;

    do {
      current = queue.shift();
      visited.push(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    } while (queue.length);

    return visited;
  }

  /**
   * @private
   * @returns {Array}
   */
  serializeDepth(depthFirstOrder) {
    const visited = [];
    this.traverse(visited, this.root, depthFirstOrder);
    return visited;
  }

  /**
   * @private
   */
  traverse(visited, node, depthFirstOrder) {
    if (depthFirstOrder === DEPTH_FIRST_ORDER.PRE_ORDER) {
      visited.push(node.value);
    }
    if (node.left) {
      this.traverse(visited, node.left, depthFirstOrder);
    }
    if (depthFirstOrder === DEPTH_FIRST_ORDER.IN_ORDER) {
      visited.push(node.value);
    }
    if (node.right) {
      this.traverse(visited, node.right, depthFirstOrder);
    }
    if (depthFirstOrder === DEPTH_FIRST_ORDER.POST_ORDER) {
      visited.push(node.value);
    }
  }

  /**
   * @private
   * @param target
   * @param node
   * @param depthFirstOrder
   * @returns {TreeNode|undefined}
   */
  traverseFor(target, node, depthFirstOrder) {
    const currentResult = target === node.value && node;
    const leftResult = node.left && this.traverseFor(target, node.left, depthFirstOrder);
    const rightResult = node.right && this.traverseFor(target, node.right, depthFirstOrder);
    let results = [];

    switch (depthFirstOrder) {
      case DEPTH_FIRST_ORDER.PRE_ORDER:
        results = [
          currentResult,
          leftResult,
          rightResult
        ];
        break;
      case DEPTH_FIRST_ORDER.IN_ORDER:
        results = [
          leftResult,
          currentResult,
          rightResult
        ];
        break;
      case DEPTH_FIRST_ORDER.POST_ORDER:
        results = [
          leftResult,
          rightResult,
          currentResult
        ];
        break;
    }

    return results.filter(value => value)[0];
  }
}
