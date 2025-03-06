import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../apiConfig"

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      console.log("Session ID received:", sessionId);
      axios.get(`${base_url}/checkout/session/${sessionId}`)
        .then((res) => {
          console.log("Stripe session response:", res.data);
          if (res.data.status === "paid") {
            alert("Payment successful!");
          }
        })
        .catch((err) => console.error("Error fetching session:", err));
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Payment Success!</h1>
      <p>Thank you for your purchase.</p>
    </div>
  );
};

export default SuccessPage;