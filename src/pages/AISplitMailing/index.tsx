import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import SelectField from "@/components/SelectField";
import usePageMetadata from "@/components/UsePageMetadata";
import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import "./ai-split-mailing.scss";

const AIsplitMailing = () => {
  usePageMetadata({
    title: "AI Split Mailing",
    description: "AI Split Mailin that provides A/B testing",
  });
  const { id } = useParams<string>();
  const data = [
    {
      name: "First test",
      subject: "5 variant",
      status: "Running",
      sent: "2021-08-12 12:00",
      id: 1,
      delivered: 0,
      openRate: 34.5,
      clickRate: 12.5,
    },
    {
      name: "Second test",
      subject: "5 variant",
      status: "Draft",
      sent: "2021-08-12 12:00",
      id: 2,
      delivered: 0,
      openRate: 34.5,
      clickRate: 80.5,
    },
    {
      name: "Third test",
      subject: "3 variant",
      status: "Delivered",
      sent: "2021-08-12 12:00",
      id: 3,
      delivered: 5.6,
      openRate: 34.5,
      clickRate: 99.9,
    },
  ];
  return (
    <div className="AIsplit-mailing">
      <PageHeader title="AI Split Mailing">
        <Button
          text="Create A/B test"
          to={`/organization/${id}/ai-spliter/create-ab-test`}
        />
      </PageHeader>
      <div className="select-fields">
        <div className="fields">
          <SelectField
            handleChange={function (e: ChangeEvent<HTMLSelectElement>): void {
              throw new Error("Function not implemented.");
            }}
            name={""}
            value={""}
            label={""}
            required={false}
            options={["All status"]}
          />
          <SelectField
            handleChange={function (e: ChangeEvent<HTMLSelectElement>): void {
              throw new Error("Function not implemented.");
            }}
            name={""}
            value={""}
            label={""}
            required={false}
            options={["All list"]}
          />
        </div>
        <div></div>
      </div>
      <div className="border-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Sent on</th>
              <th>Delivered on</th>
              <th>Overal open rate</th>
              <th>Overall click rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "even" : "odd"}>
                <td>
                  <p>{item.name}</p>
                  subject test: <span>{item.subject}</span>
                </td>
                <td>{item.status}</td>
                <td>{item.sent}</td>
                <td>{item.delivered}</td>
                <td>{item.openRate}%</td>
                <td>{item.clickRate}%</td>
                <td>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 4C14 4.82843 13.3284 5.5 12.5 5.5C11.6716 5.5 11 4.82843 11 4C11 3.17157 11.6716 2.5 12.5 2.5C13.3284 2.5 14 3.17157 14 4Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M14 12C14 12.8284 13.3284 13.5 12.5 13.5C11.6716 13.5 11 12.8284 11 12C11 11.1716 11.6716 10.5 12.5 10.5C13.3284 10.5 14 11.1716 14 12Z"
                      fill="var(--secondary-color)"
                    />
                    <path
                      d="M12.5 21.5C13.3284 21.5 14 20.8284 14 20C14 19.1716 13.3284 18.5 12.5 18.5C11.6716 18.5 11 19.1716 11 20C11 20.8284 11.6716 21.5 12.5 21.5Z"
                      fill="var(--secondary-color)"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AIsplitMailing;
