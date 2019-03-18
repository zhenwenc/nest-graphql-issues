import { Resolver, Query } from '@nestjs/graphql';
import { buildSchema } from 'type-graphql';

/*
  Test output:
  ============

  TypeError: Cannot read property 'prototype' of undefined

    2 | import { Resolver, Query } from '@nestjs/graphql';
    3 | import { buildSchema } from 'type-graphql';
  > 4 |
      | ^
    5 | describe('Issue #1', () => {
    6 |

    at isConstructor (node_modules/@nestjs/graphql/dist/decorators/resolvers.decorators.js:100:19)
    at getClassName (node_modules/@nestjs/graphql/dist/decorators/resolvers.decorators.js:93:12)
    at Resolver (node_modules/@nestjs/graphql/dist/decorators/resolvers.decorators.js:80:22)
    at DecorateConstructor (node_modules/reflect-metadata/Reflect.js:541:33)
    at Object.decorate (node_modules/reflect-metadata/Reflect.js:130:24)
    at Object.<anonymous>.__decorate (test/resolver-without-type-name.spec.ts:4:92)
    at Object.<anonymous> (test/resolver-without-type-name.spec.ts:11:25)
    at test/resolver-without-type-name.spec.ts:13:71
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
