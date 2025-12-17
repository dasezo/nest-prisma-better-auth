import { Configuration, Value } from '@itgorillaz/configify';
import { IsDefined } from 'class-validator';
import { parseString } from 'src/utils/parsers.util';

@Configuration()
export class AuthConfig {
  @Value('BETTER_AUTH_URL', {
    parse: parseString,
  })
  @IsDefined({ message: 'ENV: BETTER_AUTH_URL must be defined!' })
  BETTER_AUTH_URL!: string;

  @Value('BETTER_AUTH_SECRET', {
    parse: parseString,
  })
  @IsDefined({ message: 'ENV: BETTER_AUTH_SECRET must be defined!' })
  BETTER_AUTH_SECRET!: string;
}
