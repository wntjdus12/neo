const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.static(path.resolve(__dirname, "../public")));

app.use(cors());
const PORT = 80;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("서버 켜짐!");
});

// 환율
app.get("/rexchange_rate", async (req, res) => {
  const { country } = req.query;
  try {
    const response = await axios.get(
      `http://192.168.1.19:3000/exchange_rate?country=${country}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("요청 오류 발생:", error);
    res.status(500).json({ error: "FastAPI 서버 오류" });
  }
});

app.get("/rcurrent_exchange_rate", async (req, res) => {
  const { country } = req.query;
  try {
    const response = await axios.get(
      `http://192.168.1.19:3000/current_exchange_rate?country=${country}`
    );
    res.json(response.data);
  } catch (error) {
    console.error();
  }
});

app.get("/api/all_exchange", async (req, res) => {
  try {
    const response = await axios.get(
      "http://192.168.1.19:3000/current_exchange_all"
    );
    res.json(response.data); // 이거 하나만 있으면 충분!
  } catch (error) {
    console.error("FastAPI 요청 실패:", error.message);
    res
      .status(500)
      .json({ error: "FastAPI로부터 데이터를 가져오는 데 실패했습니다." });
  }
});

//축제
app.get("/api/parties", async (req, res) => {
  const {
    country,
    start_date,
    end_date,
    category = "festivals",
    limit = 10,
  } = req.query;
  if (!country || !start_date || !end_date) {
    return res
      .status(400)
      .json({ resultCode: false, message: "필수 파라미터가 누락되었습니다." });
  }
  try {
    const response = await axios.get("http://192.168.1.15:3000/api/parties", {
      params: { country, start_date, end_date, category, limit },
    });
    res.json(response.data);
  } catch (error) {
    console.error("FastAPI 요청 오류:", error.response?.data || error.message);
    res.status(500).json(
      error.response?.data || {
        resultCode: false,
        message: "FastAPI 서버 오류",
      }
    );
  }
});

//비행기

app.get("/api/flight_analysis", async (req, res) => {
  const {
    origin = "ICN",
    destination,
    departureDate,
    currency = "KRW",
  } = req.query;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({
      Result: false,
      message: "필수 파라미터가 누락되었습니다.",
    });
  }

  try {
    const response = await axios.get(
      "http://192.168.1.50:3000/api/noise/flight_Prices",
      {
        params: { origin, destination, departureDate, currency },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("FastAPI 요청 오류:", error.response?.data || error.message);
    res.status(500).json({
      Result: false,
      message: "FastAPI 서버 요청 중 오류 발생",
      error: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.1.15:${PORT}`);
});
