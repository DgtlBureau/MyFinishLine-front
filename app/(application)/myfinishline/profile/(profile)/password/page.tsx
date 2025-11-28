import { Input } from "@/app/components/ui/input";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <h3>Password</h3>
      <Input className="mt-2" type="password" placeholder="Password" />
    </div>
  );
};

export default page;
