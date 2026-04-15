import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import Layout from "../components/Layout/Layout";
import styles from "./CreateEquipment.module.css";

export default function CreateEquipment() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nome: "",
      tipo: "",
      dataAquisicao: "",
      status: "Ativo",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchEquipamento = async () => {
        try {
          const data = await api.getEquipamentoById(id);
          setValue("nome", data.nome);
          setValue("tipo", data.tipo);
          setValue("dataAquisicao", data.dataAquisicao);
          setValue("status", data.status || "Ativo");
        } catch (e) {
          setApiError("Erro ao carregar os dados para edição.");
        }
      };
      fetchEquipamento();
    }
  }, [id, setValue, isEditMode]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await api.updateEquipamento(id, data);
      } else {
        await api.createEquipamento(data);
      }
      navigate("/dashboard");
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <Layout>
      <div className={styles.formContainer}>
        <h2>{isEditMode ? "Editar Equipamento" : "Cadastrar Equipamento"}</h2>

        {apiError && <div className={styles.errorMessage}>{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Nome do Equipamento *</label>
            <input
              type="text"
              className={`${styles.input} ${errors.nome ? styles.inputError : ""}`}
              {...register("nome", {
                required: "O nome é obrigatório.",
                maxLength: {
                  value: 150,
                  message: "Máximo de 150 caracteres permitidos.",
                },
              })}
            />
            {errors.nome && (
              <span className={styles.errorText}>{errors.nome.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Tipo *</label>
              <select
                className={`${styles.select} ${errors.tipo ? styles.inputError : ""}`}
                {...register("tipo", {
                  required: "Selecione o tipo do equipamento.",
                })}
              >
                <option value="">Selecione...</option>
                <option value="Monitor">Monitor</option>
                <option value="CPU">CPU</option>
                <option value="Teclado">Teclado</option>
              </select>
              {errors.tipo && (
                <span className={styles.errorText}>{errors.tipo.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Data de Aquisição *</label>
              <input
                type="date"
                className={`${styles.input} ${errors.dataAquisicao ? styles.inputError : ""}`}
                {...register("dataAquisicao", {
                  required: "A data é obrigatória.",
                })}
              />
              {errors.dataAquisicao && (
                <span className={styles.errorText}>
                  {errors.dataAquisicao.message}
                </span>
              )}
            </div>
          </div>

          {isEditMode && (
            <div className={styles.formGroup}>
              <label>Status</label>
              <select className={styles.select} {...register("status")}>
                <option value="Ativo">Ativo</option>
                <option value="Manutencao">Manutenção</option>
              </select>
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={() => navigate("/dashboard")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={!isValid}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
