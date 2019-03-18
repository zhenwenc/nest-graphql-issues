import { printSchema } from 'graphql';
import { stripIndent } from 'common-tags';
import { buildSchema } from 'type-graphql';

/**
 * Using decorators in `type-graphql` here to demostrate
 * the use case.
 */
import { Resolver, Query, Arg } from 'type-graphql';

/**
 * Expecting `@nestjs/graphql` to have similar behaviour.
 */
// import { Resolver, Query, Args } from '@nestjs/graphql';

import 'reflect-metadata';

it('should support argument options', async () => {
  @Resolver()
  class SampleResolver {
    @Query()
    sampleQuery(
      @Arg('nullableField', { nullable: true })
      _nullableField: string | null
    ): boolean {
      return true;
    }
  }

  const schema = await buildSchema({ resolvers: [SampleResolver] });

  expect(printSchema(schema)).toEqual(
    stripIndent`
     type Query {
       sampleQuery(nullableField: String): Boolean!
     }` + '\n'
  );
});
