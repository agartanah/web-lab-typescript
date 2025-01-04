import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, MouseEvent } from "react";
import { setCurrOperation } from "../redux/tasksSlice";
import selector from "../redux/selectors/selector";

export default function ShareModal() {
  const { currTask, currOperation } = useSelector(selector);
  const dispatch = useDispatch();

  const shareModal = useRef<HTMLDialogElement>(null);
  const shareModalContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currOperation === "share" && shareModal.current) {
      shareModal.current.showModal();
    }
  }, [currOperation]);

  function onClickBackdrop(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target !== shareModalContent.current && shareModal.current) {
      shareModal.current.close();
      dispatch(setCurrOperation(""));
    }
  }

  function onClickCopy(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (currTask && currTask.title && currTask.description) {
      navigator.clipboard.writeText(
        `Title: ${currTask.title}
        Description: ${currTask.description}`
      );

      if (shareModal.current) {
        shareModal.current.close();
      }
      dispatch(setCurrOperation(""));
    }
  }

  function onClickVk(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    // Код для поделиться в ВКонтакте

    if (shareModal.current) {
      shareModal.current.close();
    }
    dispatch(setCurrOperation(""));
  }

  function onClickTelegram(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    // Код для поделиться в Телеграм

    if (shareModal.current) {
      shareModal.current.close();
    }
    dispatch(setCurrOperation(""));
  }

  function onClickWhatsApp(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    // Код для поделиться в WhatsApp

    if (shareModal.current) {
      shareModal.current.close();
    }
    dispatch(setCurrOperation(""));
  }

  function onClickFacebook(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    // Код для поделиться в Facebook

    if (shareModal.current) {
      shareModal.current.close();
    }
    dispatch(setCurrOperation(""));
  }

  return (
    <dialog
      className="share-modal"
      ref={shareModal}
      onMouseDown={onClickBackdrop}
    >
      <div className="share-modal-content" ref={shareModalContent}>
        <button className="copy-button" onClick={onClickCopy}></button>
        <button className="vk-button" onClick={onClickVk}></button>
        <button className="telegram-button" onClick={onClickTelegram}></button>
        <button className="whatsup-button" onClick={onClickWhatsApp}></button>
        <button className="facebook-button" onClick={onClickFacebook}></button>
      </div>
    </dialog>
  );
}
