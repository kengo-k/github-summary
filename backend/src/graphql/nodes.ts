import { callGraphQL } from "../services/github";

export const NodesQuery = (since: string, until: string) => `
  query nodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Repository {
        name
        defaultBranchRef {
          target {
            ... on Commit {
              history(since: "${since}", until: "${until}") {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;

export interface NodesQueryVariableType {
  ids: string[];
}

export const callNodesQuery = (
  since: string,
  until: string,
  variables: NodesQueryVariableType
) => {
  return callGraphQL<typeof variables>(NodesQuery(since, until), variables);
};
