import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BranchesService } from 'src/services/branches.service';
import { BranchDto } from 'src/dtos/branches.dto';
import { BranchMSG } from 'src/common/constants';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @MessagePattern(BranchMSG.FIND_ALL)
  async findAll() {
    try {
      const foundBranches = await this.branchesService.findAll();
      return {
        success: true,
        message: 'Branches found',
        data: foundBranches,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found branches',
        error: error.message,
      };
    }
  }

  @MessagePattern(BranchMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    try {
      const foundBranch = await this.branchesService.findOne(id);
      return {
        success: true,
        message: 'Branch found',
        data: foundBranch,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Branch not found',
        error: error.message,
      };
    }
  }

  @MessagePattern(BranchMSG.CREATE)
  async create(@Payload() payload: BranchDto) {
    try {
      const createdBranch = await this.branchesService.create(payload);
      return {
        success: true,
        message: 'Branch created succesfully',
        data: createdBranch,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Branch to create product',
        error: error.message,
      };
    }
  }

  @MessagePattern(BranchMSG.UPDATE)
  async update(@Payload() message: { id: number; payload: BranchDto }) {
    try {
      const updateBranch = await this.branchesService.update(
        message.id,
        message.payload,
      );
      return {
        success: true,
        message: 'Branch updated succesfully',
        data: updateBranch,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update branch',
        error: error.message,
      };
    }
  }

  @MessagePattern(BranchMSG.DELETE)
  async delete(@Payload() id: number) {
    try {
      const deletedBranch = await this.branchesService.delete(id);
      return {
        success: true,
        message: 'Branch deleted succesfully',
        data: deletedBranch,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete category',
        error: error.message,
      };
    }
  }

  @MessagePattern(BranchMSG.GET_STOCK_ITEMS)
  async getStockItems(@Payload() id: number) {
    try {
      const stockItems = await this.branchesService.getStockItems(id);
      return {
        success: true,
        message: 'Stock items found succesfully',
        data: stockItems,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get stock items',
        error: error.message,
      };
    }
  }
}
