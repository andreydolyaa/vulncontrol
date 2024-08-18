import React, { useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch } from "react-redux";
import { startScan } from "../../redux/nmapSlice";

export const Nmap = () => {
  const [formData, setFormData] = useState({
    target: "",
  });
  const dispatch = useDispatch();

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const start = (e) => {
    e.preventDefault();
    console.log(formData);
    
    dispatch(startScan(formData));
  };

  return (
    <Container>
      <form className="target w-full border border-red-400" onSubmit={start}>
        <input
          type="text"
          placeholder="Target"
          className="w-96"
          name="target"
          onChange={onFormChange}
        />
        <button>Scan</button>
      </form>
    </Container>
  );
};
