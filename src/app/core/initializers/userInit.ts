import jwt_decode from "jwt-decode";
import { User, UserService } from "../../shared/services/user.service";

export interface Token {
  aud: string;
  exp: number;
  iss: string;
  name: string;
  role: string;
  user_id: string;
}

export function UserInitializer(us: UserService)
{
  return () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (us.token)
        {
          let user: Token = jwt_decode(us.token);
          us.currentUser = new User(Number(user.user_id), user.name);
          console.log("Current User: ", us.currentUser);
        }
        resolve();
      }, 3000);
    });
  };
}
