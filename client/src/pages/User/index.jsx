import { useContext } from "react";
import { MyContext } from "../../App";

const User = () => {
  const { currUser } = useContext(MyContext);
  console.log("Current user in User component:", currUser);
  return (
    <div>
      <h1>User</h1>
      <p>This is the user page.</p>
      <p>{currUser || "username"}</p>
    </div>
  );
};

export default User;
