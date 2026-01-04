const BASE_URL = "http://localhost:5000/api";

// IMPACT
export const getImpact = async () => {
  const res = await fetch(`${BASE_URL}/impact`);
  return res.json();
};

// WASTE
export const getWasteList = async () => {
  const res = await fetch(`${BASE_URL}/waste`);
  return res.json();
};

export const addWaste = async (data) => {
  const res = await fetch(`${BASE_URL}/waste`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// REQUEST
export const requestMaterial = async (data) => {
  const res = await fetch(`${BASE_URL}/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};