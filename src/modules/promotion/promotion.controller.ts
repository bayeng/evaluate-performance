import { Controller, Get, HttpStatus } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { ResponseHelper } from '../../helper/response.helper';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Promotion')
@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get('all-kredit-user-by-jabatan')
  async findTotalKreditUserByJabatan(query: { detailUserId: string }) {
    try {
      const totalKredit =
        await this.promotionService.findTotalKreditUserByJabatan(query);
      return ResponseHelper.success(
        HttpStatus.OK,
        'Success get total kredit user by jabatan',
        totalKredit,
      );
    } catch (e) {
      console.log(e);
      return ResponseHelper.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed get total kredit user by jabatan',
      );
    }
  }
}
