import { CoreEntity } from '../../common/entities/core.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { ShopSocials } from '../../settings/entities/setting.entity';

export class Author extends CoreEntity {
  bio?: string;
  born?: any;
  cover_image?: any;
  death?: any;
  image?: any;
  is_approved?: boolean | number;
  languages?: string;
  name: string;
  products_count?: number;
  quote?: string;
  slug?: string;
  socials?: any;
  language?: string;
  translated_languages?: string[];
}
