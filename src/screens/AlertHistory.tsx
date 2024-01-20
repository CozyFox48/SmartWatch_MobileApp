import React from 'react';

import {useTheme} from '../hooks';
import {Block, Alert_each, LinkBox} from '../components';

const Home = () => {
  const {sizes} = useTheme();

  const alertData = [
    {
      type: 'oxygen',
      hasRead: false,
      status: 'high',
      value: '77',
      name: 'Tom',
      time: Date.now(),
    },
    {
      type: 'temperature',
      hasRead: false,
      status: 'low',
      value: '37.4',
      name: 'Jerry',
      time: Date.now(),
    },
    {
      type: 'heart_rate',
      hasRead: false,
      status: 'high',
      value: '87',
      name: 'Bruce',
      time: Date.now(),
    },
    {
      type: 'temperature',
      hasRead: true,
      status: 'high',
      value: '38.4',
      name: 'Tom',
      time: Date.now(),
    },
    {
      type: 'oxygen',
      hasRead: true,
      status: 'low',
      value: '78',
      name: 'Jerry',
      time: Date.now(),
    },
  ];

  return (
    <Block white>
      <Block flex={1} padding={sizes.padding} scroll>
        {alertData.map((each, key) => (
          <Alert_each data={each} key={key} />
        ))}
      </Block>
      <Block flex={0} marginBottom={sizes.sm}>
        <LinkBox />
      </Block>
    </Block>
  );
};

export default Home;
