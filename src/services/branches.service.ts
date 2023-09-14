import { Injectable, NotFoundException } from '@nestjs/common';
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
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException(`Branch ${name} not found`);
    }
    return branch;
  }

  create(payload: BranchDto) {
    const newBranch = this.branchRepo.create(payload);
    return this.branchRepo.save(newBranch);
  }

  async update(id: number, payload: BranchDto) {
    const branch = await this.branchRepo.findOneBy({ id });
    this.branchRepo.merge(branch, payload);
    return this.branchRepo.save(branch);
  }

  remove(id: number) {
    return this.branchRepo.delete(id);
  }
}
