import { UseCase } from "infrastructure/web-server/use-case.handler";


type UpdateCommonLandInputDTO = {}

type UpdateCommonLandOutputDTO = {}

export class UpdateCommonLandUseCase implements UseCase<UpdateCommonLandInputDTO, UpdateCommonLandOutputDTO> {
    async execute(input: UpdateCommonLandInputDTO): Promise<UpdateCommonLandOutputDTO> {
        throw new Error("Method not implemented.");
    }
}