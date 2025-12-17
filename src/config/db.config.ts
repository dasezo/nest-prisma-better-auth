import { Configuration, Value } from '@itgorillaz/configify';
import { IsDefined } from 'class-validator';
import { parseString } from 'src/utils/parsers.util';

@Configuration()
export class DBConfig {
  @Value('DATABASE_URL', {
    parse: parseString,
  })
  @IsDefined({ message: 'ENV: DATABASE_URL must be defined!' })
  DATABASE_URL!: string;
}
