import { PhotoEntity } from '../../src/modules/photo/photo.entity';

export class GeneratePhoto extends PhotoEntity {
  src: string = 'https://picsum.photos/1980?random=1';
}

export class GenerateBadPhoto {
  src: any = 111111;
}
