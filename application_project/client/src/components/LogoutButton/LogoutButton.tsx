import { Button } from "../Button";
import "./LogoutButton.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { logout } from "../../api/User";

interface LogoutButtonProps {
  onLogoutSuccess: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess }) => {
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess() {
      queryClient.clear();
      onLogoutSuccess();
    },
    onError(error) {
      alert('Не удалось выйти: ' + (error as Error).message);
    }
  });

  return (
    <div className="logout-button">
      <Button
        kind="secondary"
        onClick={() => logoutMutation.mutate()}
        isDisabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? 'Выход...' : 'Выйти'}
      </Button>
    </div>
  );
};
