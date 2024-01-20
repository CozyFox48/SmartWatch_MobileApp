import React, {useCallback, useState} from 'react';
import {useData, useTheme, useTranslation} from '../hooks';
import Block from './Block';
import Text from './Text';
import Button from './Button';

const Article = ({routes, scenes}) => {
  const [tab, setTab] = useState<string>(routes[0].id);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  return (
    <Block>
      {/* toggle products list */}
      <Block
        row
        flex={0}
        gray
        paddingTop={sizes.s}
        justify="center"
        align="center">
        <Block scrollHorizontal>
          {routes.length !== 0 &&
            routes.map((each, key) => (
              <Block
                key={key}
                color={tab === each.id ? colors.white : ''}
                marginHorizontal={sizes.xs}
                style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <Button
                  onPress={() => setTab(each.id)}
                  paddingHorizontal={sizes.m}>
                  <Block row align="center">
                    <Text h5 bold color={tab === each.id ? colors.primary : ''}>
                      {each.title}
                    </Text>
                  </Block>
                </Button>
              </Block>
            ))}
        </Block>
      </Block>

      {/* products list */}
      {scenes[tab]}
    </Block>
  );
};

export default Article;
