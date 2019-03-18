import { buildSchema } from 'type-graphql';

import { Resolver, Query } from '@nestjs/graphql';

/**
 * Switch to this import so that you can see the expected output.
 */
// import { Resolver, Query } from 'type-graphql';

import 'reflect-metadata';

/*
  Test output:
  ============

  Generating schema error

  at Function.<anonymous> (node_modules/type-graphql/dist/schema/schema-generator.js:19:23)
  at fulfilled (node_modules/tslib/tslib.js:104:62)

*/
it('should support @Resolver without specifying type name', async () => {
  @Resolver(/* No Type Name or Type Class */)
  class SampleResolver {
    @Query()
    sampleQuery(): string {
      return 'foo';
    }
  }

  const schema = await buildSchema({ resolvers: [SampleResolver] });
  expect(schema).toBeDefined();
});
