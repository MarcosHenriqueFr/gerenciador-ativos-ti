import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Layout from "../components/Layout/Layout";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, lastPage: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getEquipamentos(page, limit, tipo, status);
      setEquipamentos(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, tipo, status]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await api.deleteEquipamento(id);
        loadData();
      } catch (err) {
        alert("Erro ao excluir: " + err.message);
      }
    }
  };

  return (
    <Layout>
      <div className={styles.header}>
        <h1>Dashboard de Equipamentos</h1>
        <button
          className={styles.btnPrimary}
          onClick={() => navigate("/create")}
        >
          Cadastrar Equipamento
        </button>
      </div>

      <div className={styles.filtersCard}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.filterForm}
        >
          <select
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              setPage(1);
            }}
            className={styles.select}
          >
            <option value="">Todos os Tipos</option>
            <option value="Monitor">Monitor</option>
            <option value="CPU">CPU</option>
            <option value="Teclado">Teclado</option>
          </select>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className={styles.select}
          >
            <option value="">Todos os Status</option>
            <option value="Ativo">Ativo</option>
            <option value="Manutencao">Manutenção</option>
          </select>
        </form>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Data Aquisição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.length === 0 ? (
                <tr>
                  <td colSpan="5" className={styles.textCenter}>
                    Nenhum equipamento encontrado.
                  </td>
                </tr>
              ) : (
                equipamentos.map((eq) => (
                  <tr key={eq.id}>
                    <td>{eq.nome}</td>
                    <td>{eq.tipo}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${eq.status === "Ativo" ? styles.badgeActive : styles.badgeMaintenance}`}
                      >
                        {eq.status || "Ativo"}
                      </span>
                    </td>
                    <td>{eq.dataAquisicao}</td>
                    <td className={styles.actions}>
                      <button
                        onClick={() => navigate(`/edit/${eq.id}`)}
                        className={styles.btnEdit}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(eq.id)}
                        className={styles.btnDelete}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={styles.btnPage}
        >
          Anterior
        </button>

        <span>
          Página {meta.page} de {meta.lastPage || 1} ({meta.total} itens)
        </span>

        <button
          disabled={page >= meta.lastPage || meta.lastPage === 0}
          onClick={() => setPage(page + 1)}
          className={styles.btnPage}
        >
          Próxima
        </button>
      </div>
    </Layout>
  );
}
