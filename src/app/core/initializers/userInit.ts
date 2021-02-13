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

export function UserInitializer(us: UserService) {
  return () => {
    return new Promise<void>((resolve) => {
      if (!us.token) resolve();

      let user: Token = jwt_decode(us.token);
      us.getUserInfo(Number(user.user_id)).subscribe(data => {
        us.currentUser = new User(data.id, data.email, data.watchlist);
        console.log("Current User: ", us.currentUser);
        resolve();
      })
    });
  };
}
