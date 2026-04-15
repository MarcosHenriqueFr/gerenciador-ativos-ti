const BASE_URL = "http://localhost:3001";

export const api = {
  getEquipamentos: async (page = 1, limit = 10, tipo = "", status = "") => {
    const params = new URLSearchParams({ page, limit });
    if (tipo) params.append("tipo", tipo);
    if (status) params.append("status", status);

    const response = await fetch(
      `${BASE_URL}/equipamentos?${params.toString()}`,
    );
    if (!response.ok) throw new Error("Erro ao buscar equipamentos");

    return await response.json();
  },

  getEquipamentoById: async (id) => {
    const response = await fetch(`${BASE_URL}/equipamentos/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar equipamento");
    return await response.json();
  },

  createEquipamento: async (equipamento) => {
    const response = await fetch(`${BASE_URL}/equipamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipamento),
    });
    if (!response.ok) throw new Error("Erro ao criar equipamento");
    return await response.json();
  },

  updateEquipamento: async (id, equipamento) => {
    const response = await fetch(`${BASE_URL}/equipamentos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipamento),
    });
    if (!response.ok) throw new Error("Erro ao atualizar equipamento");
    return await response.json();
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${BASE_URL}/equipamentos/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar status");
    return await response.json();
  },

  deleteEquipamento: async (id) => {
    const response = await fetch(`${BASE_URL}/equipamentos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar equipamento");
    return;
  },
};
