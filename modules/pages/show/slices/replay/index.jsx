import React from 'react';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import Topbar from '@/modules/pages/show/components/top-bar';
import ReplayItem from './replay-item';

const ReplayList = ({ heading, topBarIcon, replays }) => {
  return (
    <Box pt={20} bg="black">
      <Topbar heading={heading} icon={topBarIcon} />
      <VStack
        py={8}
        spacing={8}
        bg="black"
        align="space-between"
        divider={<Divider opacity="10%" />}
      >
        {replays.length > 0 ? (
          replays.map((replay, index) => (
            <ReplayItem key={`${replay.number}-${index}`} replay={replay} />
          ))
        ) : (
          <Box>
            <Text fontSize="xl" color="white">
              No replay event
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ReplayList;
