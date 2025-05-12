import { UseCase } from '../../../../shared/application/IUseCase';
import { ProducerRepository } from '../../../domain/ProducerRepository';
import { CreateProducerCommand } from './CreateProducerCommand';
export class CreateProducerUseCase implements UseCase<CreateProducerCommand, CreateProducerOutput> {
    private producerRepository: ProducerRepository;
    constructor(producerRepository: ProducerRepository) {
        this.producerRepository = producerRepository;
    }
    execute(aCommand: CreateProducerCommand): Promise<CreateProducerOutput> {
        throw new Error('Method not implemented.');
    }
    
}