import React from 'react';
import {View, Text} from 'react-native';
import {useQuery, gql} from '@apollo/client';

const ALL_COUNTRY = gql`
  {
    country {
      capital
      name
    }
  }
`;

function GraphqlTest() {
  const {loading, error, data} = useQuery(ALL_COUNTRY);
  console.log(error);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  console.log(data);
  <Text>Test</Text>;
}

export default GraphqlTest;
