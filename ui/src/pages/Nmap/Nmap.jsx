import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, getLastScan, startScan } from "../../redux/nmapSlice";
import { useWebSocket } from "../../hooks/useWebSocket";

export const Nmap = () => {
  const dispatch = useDispatch();
  const websocket = useWebSocket("ws://localhost:3000");
  const { messages } = useSelector((state) => state.nmap);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    target: "",
  });

  useEffect(() => {
    dispatch(getLastScan());
  }, []);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const start = (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    dispatch(startScan({ data: formData, userId: user.id }));
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
      {/* temp */}
      <pre>
        {messages.map((message, index) => (
          <pre key={index}>{message || "\u00a0"}</pre>
        ))}
      </pre>
    </Container>
  );
};
