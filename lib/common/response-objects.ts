import { HttpStatus } from "@nestjs/common";
import { CustomException } from "./utility-functions";

export const customErrorResponse = (message: string | Error, status: number = HttpStatus.SERVICE_UNAVAILABLE, err: string = "") => {
    throw new CustomException({ success: false, ...(typeof message === 'string' ? { message } : { message: message.message, ...message }) }, status, err);
}