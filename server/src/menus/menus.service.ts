import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<
    Prisma.MenuGetPayload<{
      include: {
        childs: true;
      };
    }>[]
  > {
    let root = await this.prisma.menu.findUnique({
      where: {
        id: createMenuDto.parentId,
      },
      include: {
        childs: true,
      },
    });

    root = root!;

    const count = root.childs ? root.childs.length : 0;

    await this.prisma.menu.create({
      data: {
        label: 'New Menu',
        depth: root.depth + 1,
        order: count,
        parent: {
          connect: {
            id: createMenuDto.parentId,
          },
        },
      },
    });

    // return getRoots();
    return this.getRoots();
  }

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findOne(id: string): Promise<Menu | null> {
    return this.prisma.menu.findUnique({
      where: {
        id,
      },
    });
  }

  async getRoots(): Promise<
    Prisma.MenuGetPayload<{
      include: {
        childs: true;
      };
    }>[]
  > {
    async function getNestedMenus(
      parentId: string | null = null,
      prisma: PrismaService,
    ): Promise<any[]> {
      const whereClause = parentId ? { parentId } : { parentId: null }; // Handle root level menus

      const menus = await prisma.menu.findMany({
        where: whereClause,
        include: {
          childs: true, // Include child menus
        },
        orderBy: {
          order: 'asc', // Or any other suitable ordering
        },
      });

      const nestedMenus: any = [];

      for (const menu of menus) {
        const children = await getNestedMenus(menu.id, prisma); // Recursive call for children

        nestedMenus.push({
          ...menu, // Include all existing properties
          childs: children, // Assign the recursively fetched children
        });
      }

      return nestedMenus;
    }

    return getNestedMenus(null, this.prisma);
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
  }

  async remove(id: string): Promise<
    Prisma.MenuGetPayload<{
      include: {
        childs: true;
      };
    }>[]
  > {
    // recursive delete
    const cascadeDelete = async (id: string, prisma: PrismaService) => {
      const menu = await this.prisma.menu.findUnique({
        where: {
          id,
        },
        include: {
          childs: true,
        },
      });

      if (menu) {
        for (const child of menu.childs) {
          await cascadeDelete(child.id, prisma);
        }

        await this.prisma.menu.delete({
          where: {
            id,
          },
        });
      }
    };

    await cascadeDelete(id, this.prisma);

    return this.getRoots();
  }
}
