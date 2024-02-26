import React from 'react';

import {useTheme, useData} from '../hooks';
import {Block, Alert_each, LinkBox} from '../components';


const Home = () => {
  const {sizes} = useTheme();
  const {alerts} = useData();

  return (
    <Block white>
      <Block flex={1} padding={sizes.padding} scroll>
        {alerts.map((each, key) => (
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
