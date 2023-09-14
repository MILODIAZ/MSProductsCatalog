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

import { BranchesService } from 'src/services/branches.service';
import { BranchDto } from 'src/dtos/branches.dto';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @Get()
  get() {
    //@Query('offset', new DefaultValuePipe(0)) offset: number, //@Query('limit', new DefaultValuePipe(100)) limit: number,
    return this.branchesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.findOne(id);
  }

  @Post()
  create(@Body() payload: BranchDto) {
    return this.branchesService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: BranchDto) {
    return this.branchesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.remove(id);
  }
}
