import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { Branch } from 'src/entities/branches.entity';
import { BranchDto } from 'src/dtos/branches.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}

  findAll() {
    return this.branchRepo.find();
  }

  async findOne(id: number) {
    const branch = await this.branchRepo.findOne({
      where: { id },
      relations: ['productStocks', 'productStocks.product'],
    });
    if (!branch) {
      throw new NotFoundException(`Branch ${id} not found`);
    }
    return branch;
  }

  async create(payload: BranchDto) {
    const newBranch = this.branchRepo.create(payload);
    return await this.branchRepo.save(newBranch).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, payload: BranchDto) {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException(`Branch ${id} not found`);
    }
    this.branchRepo.merge(branch, payload);
    return await this.branchRepo.save(branch).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async remove(id: number) {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException(`Branch ${id} not found`);
    }
    return this.branchRepo.delete({ id });
  }
}
