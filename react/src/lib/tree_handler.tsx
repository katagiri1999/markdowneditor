import type { NodeTree } from './types';

class TreeHandler {
  private nodeTree: NodeTree;

  constructor(nodeTree: NodeTree) {
    this.nodeTree = nodeTree;
  }

  getNode(nodeId: string): NodeTree | null {
    const recursive = (node: NodeTree): NodeTree | null => {
      if (node.id === nodeId) {
        return node;
      }
      for (const child of node.children) {
        const result = recursive(child);
        if (result !== null) {
          return result;
        }
      }
      return null;
    };

    return recursive(this.nodeTree);
  }

  getParentNode(nodeId: string): NodeTree | null {
    const findParent = (node: NodeTree): NodeTree | null => {
      for (const child of node.children) {
        if (child.id === nodeId) {
          return node;
        }
        const result = findParent(child);
        if (result !== null) {
          return result;
        }
      }
      return null;
    };

    return findParent(this.nodeTree);
  }

  getParentNodeIds(nodeId: string): string[] {
    const result: string[] = [];
    let currentId = nodeId;

    if (this.nodeTree.id === currentId) {
      return result;
    }

    while (true) {
      const parent = this.getParentNode(currentId);
      if (parent) {
        result.push(parent.id);
        currentId = parent.id;
        if (parent.id === this.nodeTree.id) {
          break;
        }
      } else {
        break;
      }
    }

    return result.reverse();
  }

  getChildrenIds(nodeId: string): string[] {
    const target = this.getNode(nodeId);
    const result: string[] = [];
    if (!target) {
      return result;
    }

    const collect = (node: NodeTree) => {
      for (const child of node.children) {
        result.push(child.id);
        collect(child);
      }
    };

    collect(target);
    return result;
  }
}

export default TreeHandler;