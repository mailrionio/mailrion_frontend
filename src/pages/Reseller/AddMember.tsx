import Button from "@/components/Button";
import GeneralModal from "@/components/GeneralModal";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { useState } from "react";
interface Props {
  handleClose: () => void;
}
const AddMember = ({ handleClose }: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <GeneralModal
      title="Add A New Reseller Member"
      subTitle="Grant and manage multiple membership access"
      width="650px"
      height="500px"
      handleClose={handleClose}
    >
      <InputField
        label="Member fullname"
        placeholder="Enter name"
        handleChange={(e) => setName(e.target.value)}
        name={"member_fullname"}
        classes={""}
        value={name}
        required={true}
      />
      <InputField
        label="Member email"
        placeholder="Enter emsil"
        handleChange={(e) => setEmail(e.target.value)}
        name={"member_email"}
        classes={""}
        value={email}
        required={true}
      />
      <InputField
        label="Member access password"
        placeholder="Enter name"
        handleChange={(e) => setPassword(e.target.value)}
        name={"password"}
        classes={""}
        type={showPassword ? "text" : "password"}
        value={password}
        togglePassword={() => setShowPassword(!showPassword)}
        required={true}
      />
      <SelectField
        handleChange={(e) => setAccess(e.target.value)}
        name={"member_access"}
        value={access}
        label={"Member Access"}
        required={true}
        options={["Personal", "Commercial", "Enterprise", "Unlimited"]}
      />
      <div className="btn flex-items mt-2">
        <Button className="outline" onClick={handleClose} text="Cancel" />
        <Button className="btn__save" text="Save" />
      </div>
    </GeneralModal>
  );
};

export default AddMember;
