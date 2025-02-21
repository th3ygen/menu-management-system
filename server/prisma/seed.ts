/* create prisma instance */
import { PrismaClient, Prisma } from '@prisma/client';

/* create prisma instance */
const prisma = new PrismaClient();

type Menu = {
  label: string;
  depth: number;
  order?: number;
  childs?: Menu[];
};
const sampleData: Menu[] = [
  {
    label: 'system management',
    depth: 0,
    childs: [
      {
        label: 'System Management',
        depth: 1,
        childs: [
          {
            label: 'Systems',
            depth: 2,
            childs: [
              {
                label: 'System Code',
                depth: 3,
                order: 0,
                childs: [
                  {
                    label: 'Code Registration',
                    depth: 4,
                  },
                ],
              },
              {
                label: 'Code Registration - 2',
                depth: 3,
                order: 1,
              },
              {
                label: 'Properties',
                depth: 3,
                order: 2,
              },
              {
                label: 'Menus',
                depth: 3,
                order: 3,
                childs: [
                  {
                    label: 'Menu Registration',
                    depth: 4,
                  },
                ],
              },
              {
                label: 'API List',
                depth: 3,
                order: 4,
                childs: [
                  {
                    label: 'API Registration',
                    depth: 4,
                  },
                  {
                    label: 'API Edit',
                    depth: 4,
                  },
                ],
              },
            ],
          },
          {
            label: 'Users & Groups',
            depth: 2,
            order: 1,
            childs: [
              {
                label: 'Users',
                depth: 3,
                childs: [
                  {
                    label: 'User Account Registration',
                    depth: 4,
                  },
                ],
              },
              {
                label: 'Groups',
                depth: 3,
                childs: [
                  {
                    label: 'User Group Registration',
                    depth: 4,
                  },
                ],
              },
            ],
          },
          {
            label: 'Competition',
            depth: 2,
            order: 3,
          },
        ],
      },
    ],
  },
];

async function main() {
  async function traverse(menu: Menu, parentId: string | null) {
    let root: any = null;

    if (parentId) {
      root = await prisma.menu.create({
        data: {
          label: menu.label,
          depth: menu.depth,
          order: menu.order,
          parentId: parentId,
        },
      });
    } else {
      root = await prisma.menu.create({
        data: {
          label: menu.label,
          depth: menu.depth,
          order: menu.order,
        },
      });
    }

    if (menu.childs) {
      for (const child of menu.childs) {
        await traverse(child, root!.id);
      }
    }
  }

  for (const menu of sampleData) {
    await traverse(menu, null);
  }
}

main();
