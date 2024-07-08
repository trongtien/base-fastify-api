import { UseCase } from './../../../infrastructure/web-server/use-case.handler';

export type UploadImageInputDTO = {}
export type UploadImageOutputDTO = {}


export default class UploadUseCase implements UseCase<UploadImageInputDTO, UploadImageOutputDTO> {
    execute(input: UploadImageInputDTO): Promise<UploadImageOutputDTO> {
        throw new Error('Method not implemented.');
    }
}