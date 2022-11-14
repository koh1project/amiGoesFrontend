import { Box, Text, VStack } from 'native-base';
import React from 'react';

const ConnectionsCard = (props) => {
  const { name } = props;

  return (
    <>
      <VStack>
        <Box>
          <Text>{name}</Text>
        </Box>
      </VStack>
    </>
  );
};

export default ConnectionsCard;
