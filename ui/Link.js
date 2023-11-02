import NextLink from "next/link";
import React from 'react'
import { format } from "url";

export const Link = ({ children, ...props }) =>
  props.href.includes("https://", "http://") ? (
    React.cloneElement(children, { ...props })
  ) : (
    <NextLink {...props}>{children}</NextLink>
  );
