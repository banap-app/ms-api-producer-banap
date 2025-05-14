import { UseCase } from "src/core/shared/application/IUseCase";
import { DeleteProducerCommand } from "./DeleteProducerCommand";
import { ProducerRepository } from "src/core/producer/domain/ProducerRepository";
import { ProducerId } from "src/core/producer/domain/Producer";

export class DeleteProducerUseCase implements UseCase<DeleteProducerCommand, DeleteProducerOutput> {
    private producerRepository: ProducerRepository;
    constructor(producerRepository:ProducerRepository) {
        this.producerRepository = producerRepository
    }
    async execute(aCommand: DeleteProducerCommand): Promise<DeleteProducerOutput> {
        const producerId = new ProducerId(aCommand.producerId)
        await this.producerRepository.delete(producerId)
    }   
}

export type DeleteProducerOutput = void