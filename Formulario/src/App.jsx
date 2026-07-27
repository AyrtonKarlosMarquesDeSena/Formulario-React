import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.css";
import { Controller, useForm } from "react-hook-form";

const schema = yup.object({
  nomeCurso: yup
    .string()
    .required("O nome do curso é obrigatório")
    .min(3, "No minimo 3 letras")
    .max(50, "O nome pode ter no maximo 50 letras"),
  data: yup
    .date("Data inválida")
    .required("A data de inicio é obrigatória")
    .typeError("Insira uma data valido"),
  categoria: yup
    .string()
    .required("Escolha uma categoria")
    .oneOf(
      ["programacao", "desing", "marketing", "outros"],
      "Categoria Inválida",
    ),
  descricao: yup.string().required("A descrição é obrigatoria").min(10, "No minimo 10 caracteris").max(70, "A descrição deve ter no máximo 7o caracteris")  
});

export function App() {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nomeCurso: "",
      data: "",
      categoria: "",
      descricao: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    reset();
  };

  return (
    <div className="container">
      <h1>Cadastro de Curso </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nome do curso"
          {...register("nomeCurso")}
        />

        {errors.nomeCurso && (
          <span className="error">{errors.nomeCurso.message}</span>
        )}

        <Controller
          control={control}
          name="data"
          render={({ field }) => <input type="date" lang="pt-BR" {...field} />}
        />

        {errors.data && <span className="error">{errors.data.message}</span>}

        <Controller
          control={control}
          name="categoria"
          render={({ field }) => (
            <select {...field}>
              <option value="" disabled>
                Escolha a categoria ...
              </option>
              <option value="programacao">Programação</option>
              <option value="desing">Desing</option>
              <option value="marketing">Marketing</option>
              <option value="outros">Outros</option>
            </select>
          )}
        />
        {errors.categoria && <span className="error" >{errors.categoria.message}</ span>}

        <Controller
          control={control}
          name="descricao"
          render={({ field }) => (
            <textarea placeholder="Descrição do curso" rows={4} {...field} />
          )}
        />

        {errors.descricao && <span className="error">{errors.descricao.message}</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando os dados" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
