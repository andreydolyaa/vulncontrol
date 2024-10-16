import React from "react";

export const SignFormWrapper = ({ children, onFormSubmit }) => {
  return (
    <div className="login-layout h-full full-page-centered">
      <div className="login-container w-[450px] flex justify-center">
        <form
          onSubmit={onFormSubmit}
          className="bg-white children-margin p-10 w-full flex flex-col rounded-xl shadow animate-appear"
        >
          {children}
        </form>
      </div>
    </div>
  );
};