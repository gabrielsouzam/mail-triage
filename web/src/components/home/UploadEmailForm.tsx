import { FileInput } from "./FileInput";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  analyzeEmailContent,
  analyzeEmailFile,
} from "../../services/EmailService";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

interface UploadEmailForm {
  handleSetEmailAnalysis: (emailAnalysis: EmailAnalysisResponse | null) => void;
}

export function UploadEmailForm({ handleSetEmailAnalysis }: UploadEmailForm) {
  const uploadEmailSchema = z
    .object({
      emailContent: z.string().optional(),
      file: z.instanceof(File).optional(),
    })
    .refine(
      (data) => {
        const hasContent =
          data.emailContent && data.emailContent.trim().length > 0;
        const hasFile = data.file instanceof File;
        return hasContent || hasFile;
      },
      {
        message: "Por favor, envie um arquivo ou digite o conteúdo do e-mail",
        path: ["emailContent"],
      }
    )
    .refine(
      (data) => {
        const hasContent =
          data.emailContent && data.emailContent.trim().length > 0;
        const hasFile = data.file instanceof File;
        return hasContent || hasFile;
      },
      {
        message: "Por favor, envie um arquivo ou digite o conteúdo do e-mail",
        path: ["file"],
      }
    )
    .refine(
      (data) => {
        const hasFile = data.file instanceof File;

        if (hasFile) return true;

        if (data.emailContent) {
          return data.emailContent.trim().length >= 10;
        }

        return true;
      },
      {
        message: "E-mail deve ter no mínino 10 caracteres.",
        path: ["emailContent"],
      }
    );

  type UploadEmailType = z.infer<typeof uploadEmailSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<UploadEmailType>({
    resolver: zodResolver(uploadEmailSchema),
  });

  const selectedFile = watch("file");
  const typedText = watch("emailContent");

  async function handleSendEmailContent(formData: UploadEmailType) {
    try {
      if (formData.file) {
        const response = await analyzeEmailFile(formData.file);

        if (response.data) {
          handleSetEmailAnalysis(response.data);
          toast.success("Análise do e-mail efetuada com sucesso!");
        } else if (response.type === "error") {
          handleSetEmailAnalysis(null);
          toast.error("Erro ao analisar arquivo!");
        }
      } else if (formData.emailContent && formData.emailContent.trim()) {
        const response = await analyzeEmailContent(formData.emailContent);

        if (response.data) {
          handleSetEmailAnalysis(response.data);
          toast.success("Análise do e-mail efetuada com sucesso!");
        } else if (response.type === "error") {
          handleSetEmailAnalysis(null);
          toast.error("Erro ao analisar texto!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erro ao analisar e-mail!");
    } finally {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSendEmailContent)}
      className="flex flex-col"
    >
      <div className="mb-12 max-w-5xl w-full mx-auto">
        <h2 className="text-4xl font-bold text-[#1a3943] mb-3 tracking-tight">
          Analise seus emails
        </h2>
        <p className="text-lg text-gray-600">
          Classifique automaticamente e receba sugestões de resposta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        <Card variant="gradient" hover={false}>
          <h3 className="text-[#2C5F6F] text-xl font-semibold mb-4">
            Upload de arquivo
          </h3>
          <Controller
            name="file"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <FileInput
                {...field}
                selectedFile={value}
                onFileSelect={(file) => {
                  if (file) {
                    setValue("emailContent", "");
                  }
                  onChange(file);
                }}
                maxSize={5}
                disabled={!!typedText}
              />
            )}
          />
        </Card>

        <Card variant="gradient" hover={false}>
          <h3 className="text-[#2C5F6F] text-xl font-semibold mb-4">
            Ou cole o texto do e-mail
          </h3>

          <textarea
            className="
              bg-white p-4 text-sm border-2 border-[#d4c4a8] rounded-xl resize-none w-full
              focus:outline-none focus:ring-2 focus:ring-[#D4745E] focus:border-transparent
              disabled:cursor-not-allowed disabled:bg-[#f3ede3]
              transition-all duration-200
            "
            rows={8}
            placeholder="Cole o conteúdo do seu e-mail aqui..."
            {...register("emailContent")}
            disabled={!!selectedFile}
          />

          {errors.emailContent &&
            !errors.file &&
            typedText &&
            typedText.trim().length > 0 && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mt-4">
                <p className="text-red-600 text-sm text-center">
                  {errors.emailContent.message}
                </p>
              </div>
            )}
        </Card>
      </div>

      {errors.file &&
        errors.emailContent &&
        errors.file.message === errors.emailContent.message && (
          <div className="w-full max-w-5xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl mt-6">
            <p className="text-red-600 text-sm text-center font-medium">
              {errors.file.message}
            </p>
          </div>
        )}

      <div className="w-full max-w-5xl mx-auto flex justify-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="mt-8"
        >
          Classificar e-mail
        </Button>
      </div>
    </form>
  );
}
