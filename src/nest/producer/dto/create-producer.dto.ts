export class CreateProducerDto {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  profilePicture?: {
    raw_name: string;
    mime_type: string;
    size: number;
  };
}
