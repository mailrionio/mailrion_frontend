import Button from "@/components/Button";
import InputField from "@/components/InputField";
import PageHeader from "@/components/PageHeader";
import ToastMessage from "@/components/Toast";
import ToolTip from "@/components/ToolTip";
import { useState } from "react";
import ConfigureABTest from "./ConfigureABTest";
import "./createABtest.scss";
const CreateABTest = () => {
  const [subjectLines, setSubjectLines] = useState<{ subject: string }[]>([
    {
      subject: "",
    },
  ]);
  const [modal, setModal] = useState(false);
  const [testName, setTestName] = useState("");
  const [email, setEmail] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [from, setFrom] = useState("");
  const handleSubjectLineChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSubjectLines = [...subjectLines];
    newSubjectLines[index].subject = e.target.value;
    setSubjectLines(newSubjectLines);
  };
  return (
    <div className="create-ab-test">
      {modal && <ConfigureABTest setModal={setModal} />}
      <PageHeader title="Create A/B Test (Subject Line & Content)" />
      <div className="test-fields">
        <InputField
          handleChange={(e) => setTestName(e.target.value)}
          name={"test-name"}
          classes={""}
          value={testName}
          placeholder={""}
          label={"Test name"}
          required={true}
        />{" "}
        <div className="two-fields">
          <InputField
            handleChange={(e) => setFrom(e.target.value)}
            name={"email"}
            classes={"field"}
            value={email}
            placeholder={""}
            label={"From: Email address "}
            required={true}
          />{" "}
          <InputField
            handleChange={(e) => setReplyTo(e.target.value)}
            name={"reply-to"}
            classes={"field"}
            value={replyTo}
            placeholder={""}
            label={"Reply-to"}
            required={true}
          />
        </div>
      </div>
      <div className="subject-line">
        <h3>
          Subject line <span className="required">*</span>
        </h3>
        <p>
          Test up to 5 subject line to check which one get you the most opens.
          For example, you can try personalizing your subject line, adding
          emojis, or including an offer.{" "}
        </p>
        <div className="subjects">
          {subjectLines.map((subjectLine, index) => {
            return (
              <div key={index} className="subject">
                <ToolTip content="remove" position="right">
                  <Button
                    text={` ${index + 1}`}
                    className="subject-remove"
                    onClick={() => {
                      if (subjectLines.length > 1) {
                        setSubjectLines(
                          subjectLines.filter((_, i) => i !== index)
                        );
                      } else {
                        ToastMessage({
                          type: "error",
                          message: "You must have at least one subject line",
                        });
                      }
                    }}
                  />
                </ToolTip>
                <InputField
                  handleChange={(e) => handleSubjectLineChange(e, index)}
                  key={index}
                  name={"subject-line"}
                  classes={""}
                  value={subjectLine.subject}
                  placeholder={""}
                  label={`Subject line ${index + 1}`}
                  required={true}
                />
              </div>
            );
          })}
          {subjectLines.length < 5 && (
            <Button
              text="Add"
              onClick={() => {
                setSubjectLines([...subjectLines, { subject: "" }]);
              }}
            />
          )}
          ({subjectLines.length}/5) total
        </div>
        <div className="color-hr"></div>
      </div>
      <div className="recipients">
        <div className="recipient">
          <h3>Recipients</h3>
          <p>Who do you want to reach with this message?</p>
        </div>
        <Button text="Add recipients" />
      </div>
      {/* <div className="templates">
          <h3>Design & content</h3>
          <p>
            Start with a template or reuse content from your existing message.
            Adjust your text and off you go! You can also use the HTML editor or
            start with a blank layout
          </p>
        </div> */}
      <div className="ab-settings">
        <div className="color-hr"></div>

        <h3>A/B Test Settings</h3>
        <div className="ab-settings-content">
          <p>How do you want to run the A/B test?</p>
          <Button
            text="Configure A/B test"
            className="outline"
            onClick={() => setModal(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateABTest;
