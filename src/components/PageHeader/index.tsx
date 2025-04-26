import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, To, useNavigate } from "react-router-dom";
import HeadingEffect from "../TransitionEffects/Heading";
import "./page-header.scss";

interface Props {
  backLink?: string | number;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  useBackArrow?: boolean;
}

const PageHeader = ({
  backLink,
  useBackArrow,
  subtitle,
  title,
  children,
}: Props) => {
  const navigate = useNavigate();
  return (
    <header>
      <HeadingEffect>
        <h1>
          {useBackArrow && (
            <Link
              to="#"
              onClick={() => navigate(backLink as To)}
              style={{ marginRight: "8px" }}
            >
              <BsArrowLeft />
            </Link>
          )}
          {title}
        </h1>
        {subtitle && <p>{subtitle}</p>}
      </HeadingEffect>
      {children && <div className="actions">{children}</div>}
    </header>
  );
};

export default PageHeader;
