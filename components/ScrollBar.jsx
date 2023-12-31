import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const CustomScrollbar = ({ scrollHeight, children }) => {
  return (
    <Scrollbars
      style={{ width: "100%", height: `${scrollHeight}px` }}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: "#000000",
            borderRadius: "3px",
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;
