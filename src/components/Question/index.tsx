import "./styles.scss";
import { ReactNode } from "react";
import cx from "classnames";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };

  //ReactNode eh qualquer servico jsx
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "question",
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}

      // className={`question ${isAnswered ? "answered" : ""}  ${
      //   isHighlighted ? "highlighted" : ""
      // }`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}