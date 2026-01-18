import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

export function GoogleLoginButton() {
  const { login } = useAuth();

  async function handleSuccess(credentialResponse: any) {
    if (!credentialResponse.credential) {
      toast.error("Erro ao fazer login com Google");
      return;
    }

    try {
      await login(credentialResponse.credential);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer login");
    }
  }

  function handleError() {
    toast.error("Erro ao fazer login com Google");
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
  );
}
