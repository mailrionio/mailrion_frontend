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
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <GeneralModal
      title="Add A New white label member"
      subTitle="The new user will have access to login into your app"
      width="650px"
      height="550px"
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
        handleChange={(e) => setCountry(e.target.value)}
        name={"country"}
        value={country}
        label={"Country"}
        required={true}
        options={["Nigeria"]}
      />
      <p>
        Set a default password for your user, advice them to change their
        password once they verify their email address
      </p>
      <div className="btn flex-items mt-2">
        <Button className="outline" onClick={handleClose} text="Cancel" />
        <Button className="btn__save" text="Save" />
      </div>
    </GeneralModal>
  );
};

export default AddMember;
