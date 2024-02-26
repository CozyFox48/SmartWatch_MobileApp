import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks';
import Block from './Block';
import Text from './Text';
import Button from './Button';
import No_device from "./No_device";

const Article = ({ routes, scenes }) => {
  const [tab, setTab] = useState<string>(routes[0]?.id);
  const { colors, sizes } = useTheme();
  useEffect(() => {
    if (routes.length > 0 && !tab) {
      setTab(routes[0]?.id);
    }
  }, [routes]);

  return (
    <Block>
      <Block
        row
        flex={0}
        gray
        paddingTop={sizes.s}
        justify="center"
        align="center">
        <Block scrollHorizontal>
          {routes.length !== 0 ? (
            routes.map((each, key) => (
              <Block
                key={key}
                color={tab === each.id ? colors.white : ''}
                marginHorizontal={sizes.xs}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
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
            ))
          ) : (
            <Block
              color={colors.white}
              marginHorizontal={sizes.xs}
              width={sizes.xxl + sizes.xxl}
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
              <Button paddingHorizontal={sizes.m}>
                <Block row align="center">
                  <Text h5 bold color={colors.primary}>
                    {''}
                  </Text>
                </Block>
              </Button>
            </Block>
          )}
        </Block>
      </Block>
      {routes.length !== 0 ? (
        scenes[tab]
      ) : (
        <No_device />
    )}
    </Block>
  );
};

export default Article;
