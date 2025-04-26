import { handleCopy } from "@/helpers";
import { useState } from "react";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import { Link } from "react-router-dom";
import warningIcon from "../../../assets//warning.svg";
import verifiedicon from "../../../assets/bigVerified.svg";
import Button from "../../../components/Button";
import ButtonSpinner from "../../../components/ButtonSpiner";
import GeneralModal from "../../../components/GeneralModal";
import Toast from "../../../components/Toast";
import { VerifyDomain } from "../../../redux/features/OrganizationSlice/services";
import "./verify-organization.scss";
interface props {
  handleclose: () => void;
  orgID: string;
  domain: string;
}
const VerifyOrganization = ({ handleclose, orgID, domain }: props) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const Verifying = () => {
    return (
      <div className="verifying-wrap">
        <div className="verifying-body">
          <div className="element">
            <ButtonSpinner />
            <p className="main-text">Verifying...</p>
            <p>Please wait while we verify your domain</p>
          </div>
        </div>
      </div>
    );
  };
  const Verified = () => {
    return (
      <div className="verifying-wrap">
        <div className="verifying-body">
          <div className="element">
            <div className="verified-img">
              <img src={verifiedicon} alt="" />
            </div>
            <p className="main-text">Verified</p>
            <p>Nice, your organizations domain has been verified</p>
            <div className="verified-btn">
              <Link to={`/organization/${orgID}/dashboard`}>
                Go to organization dashboard{" "}
                <FaArrowRight className="fa-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleVerifyDomain = async () => {
    setIsVerifying(true);
    const data = {
      domain: domain,
    };
    const res = await VerifyDomain(data);
    if (res) {
      if (res.status === 200 && res.data?.message !== "not verified") {
        setIsVerifying(false);
        setVerified(true);
        Toast({ type: "success", message: res.data?.message });
      } else if (res.data?.message === "not verified") {
        setIsVerifying(false);
        Toast({
          type: "error",
          message: `${domain} not verified, please review your configuration`,
        });
        handleclose();
      }
    } else {
      setIsVerifying(false);
      Toast({ type: "error", message: "Error verifying domain" });
      handleclose();
    }
  };

  return (
    <GeneralModal
      title="Verify organization domain"
      width="1000px"
      height="600px"
      handleClose={handleclose}
    >
      <div className="verify-org">
        {isVerifying && <Verifying />}
        {verified && <Verified />}
        <div className="subtitle">
          <img src={warningIcon} />
          <p>
            To verify your organizations domain, kindly fill the MX Record with
            this details at your domain registrar service provider
          </p>
        </div>
        <form className="inputs">
          <div className="box">
            <h3>Mail Exchanger (MX) Records</h3>
            <p>
              Please add the below MX Record in your DNS manager to receive
              emails in MailRion
            </p>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Record type</th>
                    <th>Host</th>
                    <th>Priority</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>MX</td>
                    <td>@</td>
                    <td>10</td>
                    <td>
                      box.mailrion.com
                      <span onClick={() => handleCopy("box.mailrion.com")}>
                        <FaCopy />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="box">
            <h3>Sender Policy Framework (SPF)</h3>
            <p>
              SPF is an authentication mechanism that helps in identifying the
              IP address permitted to send emails using the domain name
            </p>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Record type</th>
                    <th>Host</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TXT</td>
                    <td>@</td>
                    <td className="domainkey">
                      v=spf1 a mx include:box.mailrion.com -all
                      <span
                        onClick={() =>
                          handleCopy(
                            "v=spf1 a mx include:box.mailrion.com -all"
                          )
                        }
                      >
                        <FaCopy />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="box">
            <h3>DomainKeys Identified Mail (DKIM)</h3>
            <p>
              DKIM is an authentication mechanism that helps in identifying the
              IP address permitted to send emails using the domain name
            </p>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Record type</th>
                    <th>Host/Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TXT</td>
                    <td>
                      mail._domainkey.{domain}
                      <span
                        onClick={() => handleCopy(`mail._domainkey.${domain}`)}
                      >
                        <FaCopy />
                      </span>
                    </td>
                    <td className="domainkey">
                      v=DKIM1; h=sha256; k=rsa; s=email;
                      p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuYxRyJUe3bmCHrXq27hH4HBralbkFGh0gJf5025GHgQ+0g8JSXf/24Ly7KB+K21bucVSsARfJNm/znzXDXq+MKoheeZG0OWYwc/EXrM0DnEZV8wMljfbw2lZTSil8lfGZX0wOMvzEdRmnKuFiwCYNOLxOL3ML3QbGWselP8uEFUZxTlPOurNJICLJUgOMOnUKNr42+8QvH11T/6qZgsf3qV1+V8oNInh+aVX/ZWKLL34/ulCbzdTV4ipyDhgq0Kh9DAdU1xq+sOKXkrK5CIak0TtjhZRf/OmKp2yenyRrPiQq1Grk+GROjYO5Lw5mtrpdhlP1PGJzfpFJInEmIyqjwIDAQAB
                      <span
                        onClick={() =>
                          handleCopy(
                            "v=DKIM1; h=sha256; k=rsa; s=email; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuYxRyJUe3bmCHrXq27hH4HBralbkFGh0gJf5025GHgQ+0g8JSXf/24Ly7KB+K21bucVSsARfJNm/znzXDXq+MKoheeZG0OWYwc/EXrM0DnEZV8wMljfbw2lZTSil8lfGZX0wOMvzEdRmnKuFiwCYNOLxOL3ML3QbGWselP8uEFUZxTlPOurNJICLJUgOMOnUKNr42+8QvH11T/6qZgsf3qV1+V8oNInh+aVX/ZWKLL34/ulCbzdTV4ipyDhgq0Kh9DAdU1xq+sOKXkrK5CIak0TtjhZRf/OmKp2yenyRrPiQq1Grk+GROjYO5Lw5mtrpdhlP1PGJzfpFJInEmIyqjwIDAQAB"
                          )
                        }
                      >
                        <FaCopy />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="verify-btns">
            <div />
            <div className="btns">
              <Button text="Cancel" onClick={handleclose} className="outline" />
              {isVerifying ? (
                <ButtonSpinner />
              ) : (
                <Button
                  text="Verify"
                  type="submit"
                  onClick={handleVerifyDomain}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </GeneralModal>
  );
};

export default VerifyOrganization;
