import * as bcrypt from 'bcrypt';
import { ICrypt } from '../../../shared/application/ICrypt';

export class BcryptService implements ICrypt {
  async verify(rawData: string, hashData: string): Promise<boolean> {
<<<<<<< HEAD
    
      return bcrypt.compareSync(rawData, hashData)  
=======
    return bcrypt.compareSync(rawData, hashData);
>>>>>>> f03c679ba8cddfa4f52e02419ff1c9ce85e3bcdc
  }
  async encode(value: string, saltOrRounds: number): Promise<string> {
    return await bcrypt.hash(value, saltOrRounds);
  }
}
