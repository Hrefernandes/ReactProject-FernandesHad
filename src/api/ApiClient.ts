const API_BASE_URL = "http://localhost:3001";

export const ApiClient = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`Erreur réseau : ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("GET error:", error);
      throw error;
    }
  },

  post: async (endpoint: string, data: unknown) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Erreur réseau : ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("POST error:", error);
      throw error;
    }
  },

  put: async (endpoint: string, data: unknown) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Erreur réseau : ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("PUT error:", error);
      throw error;
    }
  },

  delete: async (endpoint: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erreur réseau : ${response.status}`);
      }
    } catch (error) {
      console.error("DELETE error:", error);
      throw error;
    }
  },
};
