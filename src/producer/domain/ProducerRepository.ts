import { IRepository } from "../../shared/domain/repository/IRepository";
import { Producer, ProducerId } from "./Producer";

export interface ProducerRepository extends IRepository<Producer, ProducerId> {}