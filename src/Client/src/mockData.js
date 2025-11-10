export const MOCK_DATA = {
  // --- Grupo 1 ---
  "1": {
    name: "Grupo Alpha",
    totalScore: 570,
    totalMoney: 850,
    totalFood: 400,
    recentDonations: [
      { id: 1, donorName: "João", donationType: "Alimento", amount: "50 kg", date: "2025-10-24" },
      { id: 2, donorName: "Maria", donationType: "Dinheiro", amount: "R$100", date: "2025-10-22" },
    ]
  },
  // --- Grupo 2 ---
  "2": {
    name: "Grupo Beta",
    totalScore: 980,
    totalMoney: 1200,
    totalFood: 600,
    recentDonations: [
      { id: 1, donorName: "Pedro", donationType: "Dinheiro", amount: "R$250", date: "2025-10-25" },
      { id: 2, donorName: "Antonio", donationType: "Alimento", amount: "100 kg", date: "2025-10-23" },
      { id: 3, donorName: "Angela", donationType: "Dinheiro", amount: "R$50", date: "2025-10-21" },
    ]
  },
  // --- Grupo 3 ---
  "3": {
    name: "Grupo Gamma",
    totalScore: 90,
    totalMoney: 150,
    totalFood: 50,
    recentDonations: [
      { id: 1, donorName: "Francisco", donationType: "Dinheiro", amount: "R$150", date: "2025-10-25" },
    ]
  }
};

// fallback
export const FALLBACK_GROUP = {
  name: "Grupo Desconhecido",
  totalScore: 0,
  totalMoney: 0,
  totalFood: 0,
  recentDonations: [],
};