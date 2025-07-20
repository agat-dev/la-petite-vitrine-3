import styled from 'styled-components';

import { ReactNode } from 'react';

interface ButtonUIProps {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const ButtonUI = ({ children, bgColor, textColor }: ButtonUIProps) => {
  return (
    <StyledWrapper $bgColor='#D15382' $textColor='#FFF'>
      <button>
        <span>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height={34} width={34}>
          <circle strokeWidth={3} stroke="#FFF" r="35.5" cy={37} cx={37} />
          <path fill="#FFF" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $bgColor?: string; $textColor?: string }>`
  button {
    cursor: pointer;
    color: ${(props) => props.$textColor || 'black'};
    font-weight: 700;
    transition: all 0.2s;
    padding: 10px 20px;
    border-radius: 100px;
    background: ${(props) => props.$bgColor || '#FCD34D'};
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    font-size: 15px;
  }

  button:hover {
    background: ${(props) => props.$bgColor || 'rgba(251, 191, 36, 0.8)'};
  }

  button > svg {
    width: 34px;
    margin-left: 10px;
    transition: transform 0.3s ease-in-out;
  }

  button:hover svg {
    transform: translateX(5px);
  }

  button:active {
    transform: scale(0.95);
  }`;

export default ButtonUI;
