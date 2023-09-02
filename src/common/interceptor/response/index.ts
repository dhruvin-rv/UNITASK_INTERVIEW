import { HttpStatus } from '@nestjs/common';
import { PAYLOAD_RES_STATUS } from 'src/common/enums/global.enum';

export const ResponseBody = {
  ok: (): { PayloadStatus: number; HttpStatus: number } => ({
    PayloadStatus: PAYLOAD_RES_STATUS.RESPONSE_PAYLOAD_STATUS_SUCCESS,
    HttpStatus: HttpStatus.OK,
  }),
  fail: (): { PayloadStatus: number; HttpStatus: number } => ({
    PayloadStatus: PAYLOAD_RES_STATUS.RESPONSE_PAYLOAD_STATUS_ERROR,
    HttpStatus: HttpStatus.OK,
  }),
  auth_fail: (): { PayloadStatus: number; HttpStatus: number } => ({
    PayloadStatus: PAYLOAD_RES_STATUS.RESPONSE_PAYLOAD_STATUS_NOT_VERIFIED,
    HttpStatus: HttpStatus.UNAUTHORIZED,
  }),
};
