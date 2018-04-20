import React from 'react';
import { StyledFooter, Container, FooterText, Version } from './Styled';

function Footer() {
  return (
    <StyledFooter>
      <Container>
        <FooterText>&copy;2018 Metromedia Technologies</FooterText>
        <Version>Version: 1.0.1</Version>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
