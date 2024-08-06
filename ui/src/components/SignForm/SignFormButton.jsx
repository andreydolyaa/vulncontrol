import React from "react";
import { RiLoader4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../redux/userSlice";

export const SignFormButton = ({ buttonText, isLoading }) => {
  const dispatch = useDispatch();
  
  return (
    <button
      onClick={() => dispatch(clearMessage())}
      disabled={isLoading()}
      className={`h-16 font-bold bg-purpleBg border-none text-white ${
        isLoading() ? "" : "hover:bg-opacity-80"
      }`}
    >
      {isLoading() ? (
        <div className="flex justify-center">
          <RiLoader4Line className="animate-spin w-8 h-8 border-none text-center" />
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};
