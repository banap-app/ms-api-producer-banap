import * as bcrypt from 'bcrypt';
import { ICrypt } from '../../../shared/application/ICrypt';

export class BcryptService implements ICrypt {
  async verify(rawData: string, hashData: string): Promise<boolean> {
    return bcrypt.compareSync(rawData, hashData);
  }
  async encode(value: string, saltOrRounds: number): Promise<string> {
    return await bcrypt.hash(value, saltOrRounds);
  }
}
