import { Either } from '../../shared/domain/Either';
import { MediaFileValidator } from '../../shared/domain/validators/MediaFileValidator';
import { ImageMedia } from '../../shared/domain/value-objects/ImageMedia';

export class ProfilePicture extends ImageMedia {
  static maxSize = 1024 * 1024 * 10; // 10 MB
  static mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  static createFromFile({
    raw_name,
    mime_type,
    size,
  }: {
    raw_name: string;
    mime_type: string;
    size: number;
  }) {
    const mediaFileValidator = new MediaFileValidator(
      ProfilePicture.maxSize,
      ProfilePicture.mimeTypes,
    );
    return Either.safe(() => {
      const { name: newName } = mediaFileValidator.validate({
        raw_name,
        mime_type,
        size,
      });

      return new ProfilePicture({
        name: newName,
        location: `profilePicturesProducer/`,
      });
    });
  }
}
