import { ProducerId } from "src/core/producer/domain/Producer";
import { ProducerRepository } from "src/core/producer/domain/ProducerRepository";
import { UseCase } from "src/core/shared/application/IUseCase";
import { ProducerOutput, ProducerOutputMapper } from "../../commons/ProducerOutputMapper";
import { EntityValidationError } from "src/core/shared/domain/validators/ValidationErrors";

export class GetProducerUseCase implements UseCase<GetProducerCommand, GetProducerOutput> {
    private producerRepository:ProducerRepository;
    
    constructor(producerRepository: ProducerRepository) {
        this.producerRepository = producerRepository
    }

    async execute(aCommand: GetProducerCommand): Promise<GetProducerOutput> {
        const producer = await this.producerRepository.findById(new ProducerId(aCommand.producerId))
        if(!producer) {
            throw new Error("Not found a Producer")
        }
        
        producer.validate()

        if(!producer.getIsActive()) {
            throw new Error("Not found a Producer")
        }
        if(producer.notification.hasErrors()) {
            throw new EntityValidationError(producer.notification.toJSON())
        }

        return ProducerOutputMapper.toOutput(producer)
    }
    
}

export type GetProducerCommand = {producerId: string}

export type GetProducerOutput = ProducerOutput