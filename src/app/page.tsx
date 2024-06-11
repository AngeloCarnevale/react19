import { registerUser } from "./actions";
import RegisterForm from "./components/register-form/register-form";

export default function Home() {
  return (
    <div className="font-sans">
      <RegisterForm/>
    </div>
  );
}
