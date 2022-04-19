import axios from "axios";
import React, { useEffect, useState } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";

const revenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const sendBalanceReq = async () => {
    const { data } = await axios.get(`/api/instructor/balance`);
    console.log(data);
    setBalance(data);
  };
  useEffect(() => {
    sendBalanceReq();
  }, []);

  const handlePayoutSettings = async () => {
    try {
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InstructorRoute>
      Pending Balance{" "}
      {balance.pending &&
        balance.pending.map((bp, i) => {
          return (
            <span key={i}>
              {bp.amount} {bp.currency}
            </span>
          );
        })}
      <h3 onClick={() => handlePayoutSettings()}>SETTINGS</h3>
    </InstructorRoute>
  );
};

export default revenue;
