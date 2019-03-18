import { printSchema } from 'graphql';
import { stripIndent } from 'common-tags';
import { ObjectType, Field, buildSchema } from 'type-graphql';

// import { Resolver, FieldResolver, Query } from 'type-graphql';
import { Resolver, ResolveProperty, Query } from '@nestjs/graphql';

import 'reflect-metadata';

/**
   Test Output:
   ============

   TypeError: Cannot read property 'getObjectType' of undefined

     at definitions.forEach.def (node_modules/type-graphql/dist/metadata/metadata-storage.js:126:92)
         at Array.forEach (<anonymous>)
     at MetadataStorage.buildFieldResolverMetadata (node_modules/type-graphql/dist/metadata/metadata-storage.js:122:21)
     at MetadataStorage.build (node_modules/type-graphql/dist/metadata/metadata-storage.js:77:14)
     at Function.generateFromMetadataSync (node_modules/type-graphql/dist/schema/schema-generator.js:27:51)
     at Function.<anonymous> (node_modules/type-graphql/dist/schema/schema-generator.js:16:33)
     at node_modules/tslib/tslib.js:107:75
     at Object.__awaiter (node_modules/tslib/tslib.js:103:16)

 */
it('duplicate ResolveProperty name', async () => {
  @ObjectType()
  class SampleObject {
    @Field()
    stringField: string;
  }

  @Resolver('SampleObject')
  // @Resolver(SampleObject)
  class SampleResolver {
    // @FieldResolver(() => String, { name: 'modifiedName' })
    @ResolveProperty('duplicatedNameField', () => String, {
      name: 'modifiedName',
    })
    foo(): string {
      return `What's my name?`;
    }

    @Query(() => SampleObject)
    sampleQuery(): SampleObject {
      return {} as any;
    }
  }

  const schema = await buildSchema({ resolvers: [SampleResolver] });

  expect(printSchema(schema)).toEqual(
    stripIndent`
     type Query {
       sampleQuery: SampleObject!
     }

     type SampleObject {
       stringField: String!
       modifiedName: String!
     }` + '\n'
  );
});
