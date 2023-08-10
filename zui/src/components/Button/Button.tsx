import React, { useRef } from 'react';
import type { AriaButtonProps } from 'react-aria'
import { useButton } from 'react-aria';
import { useScreenBreakpoint } from '../../hooks';

interface BtnProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary' | 'text' | 'success' | 'danger';
}

interface BtnSizeStyle {
  fontSize: string;
  padding: string;
}

interface BtnVariant {
  color: string;
  bgColor: string;
}

function findBtnSizeStyle(breakpoint: string): BtnSizeStyle {
  switch (breakpoint) {
    case 'xl':
      return {
        fontSize: '18px',
        padding: '10px 20px',
      };
    case 'lg':
      return {
        fontSize: '16px',
        padding: '8px 18px'
      };
    case 'md':
      return {
        fontSize: '14px',
        padding: '6px 16px'
      }
    case 'sm':
      return {
        fontSize: '13px',
        padding: '5px 12px'
      };
    case 'xs':
      return {
        fontSize: '12px',
        padding: '5px 12px'
      };
    default:
      return {
        fontSize: '12px',
        padding: '6px 14px'
      }
  }
}

function getVariantColor(variantName: string): BtnVariant {
  switch (variantName) {
    case 'primary':
      return {
        color: 'rgba(255, 255, 255, 1)',
        bgColor: 'rgba(0, 115, 255, 1)',
      };
    case 'secondary':
      return {
        color: 'rgba(0, 0, 0, 0.85)',
        bgColor: 'rgba(255, 255, 255, 1)'
      };
    case 'text':
      return {
        color: 'rgba(0, 122, 255, 1)',
        bgColor: 'rgba(255, 255, 255, 1)'
      };
    case 'success':
      return {
        color: 'rgba(30, 195, 55, 1)',
        bgColor: 'rgba(255, 255, 255, 1)'
      }
    case 'danger':
      return {
        color: 'rgba(255, 59, 48, 1)',
        bgColor: 'rgba(255, 255, 255, 1)'
      }
    default:
      return {
        color: 'rgba(255, 255, 255, 1)',
        bgColor: 'rgba(0, 115, 255, 1)'
      };
  }
}


function Button({ variant = 'primary', isDisabled = false, ...props }: BtnProps) {
  const ref = useRef<null | HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  const sizeStyle = findBtnSizeStyle(useScreenBreakpoint())
  const { color, bgColor } = getVariantColor(variant);

  return (
    <button
      {...buttonProps}
      ref={ref}
      style={{
        minHeight: '25px',
        minWidth: '40px',
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        letterSpacing: '0.0426rem',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '12px',
        background: isDisabled ? 'rgba(255, 255, 255, 0.5)'
          : `linear-gradient(180deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.00) 100%), ${bgColor}`,
        boxShadow: isDisabled ? '0px 0px 0px 0.5px rgba(0, 0, 0, 0.03), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.15)'
          : `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
        color: isDisabled ? 'rgba(0, 0, 0, 0.25)' : color,
        fontFamily: 'SF Pro',
        fontStyle: 'normal',
        fontWeight: 'lighter',
        lineHeight: '16px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;