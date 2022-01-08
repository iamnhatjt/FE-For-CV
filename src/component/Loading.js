import React from "react";

export default function Loading({ status }) {
  return <div className={"loading " + status}></div>;
}
