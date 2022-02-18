import React from 'react';
import styled from 'styled-components';
export default function Footer(params) {
    return(
        <FooterWrapper>
            <p>Copyright &copy; 2020</p>

            <p>All rights reserved</p>
            
        </FooterWrapper>
    )
};

const FooterWrapper = styled.footer`
    background-color: #333;
    color: white;
    text-align: center;
    bottom: 0;
    position:fixed;
    width: 100%;
    display:flex;
    height:3rem;
    justify-content: space-around;
`;
