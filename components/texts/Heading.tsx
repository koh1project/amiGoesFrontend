import { Heading } from 'native-base';
import { FC, ReactNode } from 'react';

type HeadingProps = {
  children: ReactNode;
};

export const SecondaryHeading: FC<HeadingProps> = ({ children }) => {
  return <Heading style={{ color: '#3FA8AE' }}>{children}</Heading>;
};
