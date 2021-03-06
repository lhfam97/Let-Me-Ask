import { ref, remove, update } from "firebase/database";
import logoImg from "../assets/images/logo.svg";

import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useHistory, useParams } from "react-router-dom";

import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import "../styles/room.scss";

import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();

  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    const roomRef = ref(database, `rooms/${roomId}`);
    update(roomRef, {
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem  certeza que você deseja excluir esta pergunta?")) {
      const roomRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
      remove(roomRef);
    }
  }
  async function handleCheckQuestionAsAnswered(questionId: string) {
    const roomRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
    update(roomRef, {
      isAnswered: true,
    });
  }

  async function handleHighlightQuestionAnswered(questionId: string) {
    const roomRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
    update(roomRef, {
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestionAnswered(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque a pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
