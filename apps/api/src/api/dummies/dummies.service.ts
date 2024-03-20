import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/api-data-access-db';
import { DeleteDummyInput } from './dto//input/delete-dummy-input.dto';
import { GetDummyArgs } from './dto/args/get-dummy-args.dto';
import { CreateDummyInput } from './dto/input/create-dummy-input.dto';
import { UpdateDummyInput } from './dto/input/update-dummy-input.dto';

@Injectable()
export class DummiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getDummies() {
    return await this.prisma.dummy.findMany();
  }

  async getDummy(getDummyArgs: GetDummyArgs) {
    return await this.prisma.dummy.findUnique({ where: getDummyArgs.where });
  }

  async createDummy(createDummyData: CreateDummyInput) {
    return await this.prisma.dummy.create({ data: createDummyData.data });
  }

  async updateDummy(updateDummyData: UpdateDummyInput) {
    return await this.prisma.dummy.update({
      where: updateDummyData.where,
      data: updateDummyData.data,
    });
  }

  async deleteDummy(deleteDummyData: DeleteDummyInput) {
    return await this.prisma.dummy.delete({
      where: deleteDummyData.where,
    });
  }
}
