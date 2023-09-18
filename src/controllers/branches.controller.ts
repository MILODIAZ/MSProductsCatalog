import {
  Body,
  Controller,
  //DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Put,
  //Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BranchesService } from 'src/services/branches.service';
import { BranchDto } from 'src/dtos/branches.dto';
import { BranchMSG } from 'src/common/constants';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) { }

  //FIND ALL BRANCHES
  @Get()
  get() {
    return this.branchesService.findAll();
  }

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

  //FIND ONE BRANCH
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.findOne(id);
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

  //CREATE BRANCH
  @Post()
  create(@Body() payload: BranchDto) {
    return this.branchesService.create(payload);
  }

  @MessagePattern(BranchMSG.CREATE)
  async createProduct(@Payload() payload: BranchDto) {
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

  //UPDATE BRANCH
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: BranchDto) {
    return this.branchesService.update(id, payload);
  }

  @MessagePattern(BranchMSG.UPDATE)
  async updateProduct(
    @Payload() message: { id: number; payload: BranchDto },
  ) {
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

  //DELETE BRANCH
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.remove(id);
  }

  @MessagePattern(BranchMSG.DELETE)
  async deleteProduct(@Payload() id: number) {
    try {
      const deletedBranch = await this.branchesService.remove(id);
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
}
