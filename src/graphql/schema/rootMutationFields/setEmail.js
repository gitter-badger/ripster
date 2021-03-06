import {GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';
import setEmail from '../../queries/user/setEmail';
import {wrapField, OP_UPDATE} from '../../acl';

export default refs => wrapField(assertAccess => mutationWithClientMutationId({
  name: 'SetEmail',
  inputFields: {
    uuid: {type: GraphQLString},
    email: {type: GraphQLString},
  },
  outputFields: {
    user: wrapField({
      type: refs.user,
      resolve: user => user,
    }),
  },
  mutateAndGetPayload: async ({uuid, email}, {rootValue}) => {
    const user = await rootValue.loaders.User.load(uuid);

    if (!user) {
      return null;
    }

    await assertAccess(user, OP_UPDATE);

    return await setEmail(user, email);
  },
}));
