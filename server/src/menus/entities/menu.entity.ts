export class Menu {
  id: number;
  label: string;
  depth: number;
  parentId: number;
  parent: Menu;
  childs: Menu[];
}
