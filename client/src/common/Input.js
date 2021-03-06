import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

const Input = ({ error, inline, useRef, title, putTitleAfter, ...rest }) => {
  const { type } = rest;
  const isTitleAfter =
    typeof putTitleAfter !== 'undefined'
      ? putTitleAfter
      : ['radio', 'checkbox'].includes(type);
  return (
    <InputWrapper
      isInline={inline}
      className={classNames({
        'has-error': !!error,
      })}
    >
      {!!title && !isTitleAfter && <InputTitle block>{title}</InputTitle>}
      <input {...rest} {...(useRef ? { ref: useRef } : {})} />
      {/* Hack for the checkbox */}
      {type === 'checkbox' && (
        <FontAwesomeIcon style={{ display: 'none' }} icon={faCheck} />
      )}
      {type === 'radio' && (
        <FontAwesomeIcon style={{ display: 'none' }} icon={faCircle} />
      )}
      {!!title && isTitleAfter && <InputTitle>{title}</InputTitle>}
      {error && <ErrorText>{error.message}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.label`
  display: ${props => (props.isInline ? 'inline-block' : 'block')};
  margin-right: ${props => (props.isInline ? '15px' : '0')};
  position: relative;
  margin-bottom: 24px;
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    width: 100%;
    max-width: 400px;
    border-radius: 4px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 6px 12px;
    background-color: ${props => props.theme.colors.white};
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.53px;

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px ${props => props.theme.colors.violet};
      caret-color: ${props => props.theme.colors.violet};
      outline: none !important;
    }

    &:disabled {
      border: solid 1px rgba(25, 25, 39, 0.2);
      background-color: #f2f2f2;
      cursor: not-allowed;
    }
  }

  input[type='checkbox'],
  input[type='radio'] {
    margin: 0 7px 0 0;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.theme.colors.white};
    display: inline-block;
    vertical-align: middle;
    outline: none !important;
    margin-top: -1px;
    &:checked {
      & + svg {
        display: inline !important;
        position: absolute;
        left: 0;
        path {
          fill: #fff;
        }
      }
      background-color: ${props => props.theme.colors.violet};
    }
  }

  input[type='checkbox'] {
    border-radius: 4px;
    &:checked {
      & + svg {
        margin-top: 3px;
        margin-left: 2px;
        width: 13px;
      }
    }
  }

  input[type='radio'] {
    border-radius: 50%;
    &:checked {
      & + svg {
        margin-top: 3.5px;
        margin-left: 4px;
        width: 10px;
      }
      background-color: ${props => props.theme.colors.violet};
    }
  }

  &.has-error {
    input {
      border-color: ${props => props.theme.colors.red} !important;
      box-shadow: none !important;
    }
  }
`;

const InputTitle = styled.span`
  font-size: 1rem;
  line-height: 1.31;
  letter-spacing: 0.61px;
  margin-bottom: 11px;

  ${props => (props.block ? 'display: block;' : '')}
`;

export const ErrorText = styled.div`
  color: ${props => props.theme.colors.red};
  margin-top: 8px;
  font-size: 0.75rem;
`;

Input.propTypes = {
  error: PropTypes.object,
  useRef: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  inline: PropTypes.bool,
  putTitleAfter: PropTypes.bool,
};
