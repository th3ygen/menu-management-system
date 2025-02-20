import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.prisma.menu.create({
      data: {
        label: createMenuDto.label,
        depth: createMenuDto.depth,

        parent: {
          connect: {
            id: createMenuDto.parentId,
          },
        },
      },
    });
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

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
  }

  async remove(id: string): Promise<Menu> {
    return this.prisma.menu.delete({
      where: {
        id,
      },
    });
  }
}
